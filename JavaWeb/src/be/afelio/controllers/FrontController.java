package be.afelio.controllers;

import java.io.IOException;
import javax.servlet.*;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.*;
import com.fasterxml.jackson.databind.ObjectMapper;
import be.afelio.controllers.activities.ActivitiesController;
import be.afelio.controllers.events.EventsController;
import be.afelio.controllers.inscriptions.InscriptionsController;
import be.afelio.controllers.login.LoginController;
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
	protected LoginController loginController;
	
	
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
			loginController = new LoginController(repository);
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
		setHeaders(response);
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
			if (pathInfoString.startsWith("/event/")) {
				System.out.println("FrontController.doGet()dans le if event");
				activitiesController.listForOneEventById(response, request);
			}
			
			System.out.println("FrontController.doGet().default");
			break;
		}
		
		
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		HttpSession session = request.getSession();
		Boolean auth = false;
		String pathInfoString=request.getPathInfo();
		System.out.println("FrontController.doPost()" + pathInfoString);
		setHeaders(response);
		System.out.println(request.getHeader("Authorization"));
		
		if (request.getHeader("Authorization").equals("true")) {
			auth = true;
		} else {
			auth = false;
		}
		session.setAttribute("Authorization", auth);
		if (null == session.getAttribute("Authorization") ) {
			session.setAttribute("Authorization", false);
			System.out.println("FrontController.doPost() dans la connection null " + session.getAttribute("Authorization"));
			}
		boolean authorization = (boolean) session.getAttribute("Authorization");
		
		if(!authorization && pathInfoString.startsWith("/connection")) {
			System.out.println("FrontController.doPost()dans Connection");
			authorization = loginController.getConnection(request, response);
			session.setAttribute("Authorization", authorization);
			System.out.println("FrontController.doPost() fin de connection " + authorization);
			if (authorization) {
				response.setHeader("Authorization", "true");
			}
		}
		if(authorization) {
			switch (pathInfoString) {
			case "/person/add":
				personController.add(request, response);
				System.out.println("FrontController.doPost() person add authorization:"+ authorization);
				break;
			case "/event/add":
				eventsController.add(request, response);
				break;
			case "/activity/add":
				activitiesController.add(request, response);
				break;
			case "/inscription/add":
				inscriptionsController.add(request, response);
				break;
	
			default:
				System.out.println("FrontController.doPost()/Default");
				break;
			}
		}else {
			System.out.println("pas d'autorisation  " + authorization);
		}
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
	
	@Override
	protected void doOptions(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		super.doOptions(request, response);
		setHeaders(response);
	}
	
	private void setHeaders( HttpServletResponse response ) {
		response.addHeader("Access-Control-Allow-Origin", "*");
		response.addHeader("Access-Control-Allow-Methods", "*");
		response.addHeader("Access-Control-Allow-Headers", "*");
	}
}
