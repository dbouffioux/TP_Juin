package be.afelio.controllers;

import java.io.IOException;
import java.util.List;

import javax.servlet.ServletConfig;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.fasterxml.jackson.databind.ObjectMapper;

import be.afelio.beans.Activity;
import be.afelio.beans.Inscription;
import be.afelio.controllers.activities.ActivitiesController;
import be.afelio.controllers.events.EventsController;
import be.afelio.controllers.inscriptions.InscriptionsController;
import be.afelio.controllers.persons.PersonController;
import be.afelio.repository.DataRepository;

/**
 * Servlet implementation class FrontController
 */
@WebServlet("/FrontController")
public class FrontController extends HttpServlet {
	private static final long serialVersionUID = 1L;
	DataRepository repository;
	
	protected ActivitiesController activitiesController;
	protected PersonController personController;
	protected EventsController eventsController;
	protected InscriptionsController inscriptionsController;
	
	protected void jsonGenerate(HttpServletResponse response, Object o) throws IOException {

		ObjectMapper mapper = new ObjectMapper();

		String json = mapper.writeValueAsString(o);

		response.setContentType("application/json");
		response.setCharacterEncoding("UTF-8");
		response.getWriter().write(json);
	}
	
	
    /**
     * Default constructor. 
     */
    public FrontController() {
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see Servlet#init(ServletConfig)
	 */
	public void init(ServletConfig config) throws ServletException {
		try {
			Class.forName("org.postgresql.Driver");
			String url= config.getInitParameter("database.url");
			String user= config.getInitParameter("database.user");
			String password= config.getInitParameter("database.password");
			repository= new DataRepository(url, user, password);
			activitiesController = new ActivitiesController(repository);
			personController = new PersonController(repository);
			eventsController = new EventsController(repository);
			inscriptionsController= new InscriptionsController(repository);
		} catch (Exception e) {
			throw new ServletException(e);
		}
	}

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		System.out.println("FrontController.doGet()");
		String pathInfoString=request.getPathInfo();
		System.out.println("FrontController.doGet()"+pathInfoString);
		switch (pathInfoString) {
		case "/activity/all":
			activitiesController.list(response);
			break;
		case "/person/all":
			personController.list(response);
			break;
		case "/events/all":
			eventsController.list(response);
			break;
		case "/inscriptions/all":
			inscriptionsController.list(response);
			break;

		default:
			System.out.println("FrontController.doGet().default");
			break;
		}
		
		
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		doGet(request, response);
	}

	/**
	 * @see HttpServlet#doPut(HttpServletRequest, HttpServletResponse)
	 */
	protected void doPut(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
	}

	/**
	 * @see HttpServlet#doDelete(HttpServletRequest, HttpServletResponse)
	 */
	protected void doDelete(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
	}

}
