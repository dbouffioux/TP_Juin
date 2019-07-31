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
import be.afelio.repository.DataRepositoryActivity;
import be.afelio.repository.DataRepositoryEvent;
import be.afelio.repository.DataRepositoryInscription;
import be.afelio.repository.DataRepositoryPerson;

/**
 * Servlet implementation class FrontController
 */
@WebServlet("/FrontController")
public class FrontController extends HttpServlet {
	private static final long serialVersionUID = 1L;
	
	protected DataRepositoryInscription repositoryInscription;
	protected DataRepositoryActivity repositoryActivity;
	protected DataRepositoryPerson repositoryPerson;
	protected DataRepositoryEvent repositoryEvent;
	
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
			String url = config.getInitParameter("database.url");
			String user = config.getInitParameter("database.user");
			String password = config.getInitParameter("database.password");
			repositoryActivity = new DataRepositoryActivity(url, user, password);
			repositoryEvent = new DataRepositoryEvent(url, user, password);
			repositoryPerson = new DataRepositoryPerson(url, user, password);
			repositoryInscription= new DataRepositoryInscription(url, user, password);
			
			repositoryActivity.setDataRepositoryEvent(repositoryEvent);
			repositoryActivity.setDataRepositoryInscription(repositoryInscription);
			repositoryEvent.setDataRepositoryActivities(repositoryActivity);
			repositoryInscription.setDataRepositoryActivity(repositoryActivity);
			
			activitiesController = new ActivitiesController(repositoryActivity, repositoryEvent);
			personController = new PersonController(repositoryPerson);
			eventsController = new EventsController(repositoryEvent);
			inscriptionsController = new InscriptionsController(repositoryInscription, repositoryActivity);
			loginController = new LoginController(repositoryPerson);
		} catch (Exception e) {
			throw new ServletException(e);
		}
	}

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		System.out.println("FrontController.doGet()");
		String pathInfo = request.getPathInfo();
		System.out.println("FrontController.doGet()" + pathInfo);
		setHeaders(response);
		switch (pathInfo) {
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
		case "/logout":
			request.getSession().invalidate();
			break;

		default:
			if (pathInfo.startsWith("/event/")) {
				System.out.println("FrontController.doGet()dans le if event");
				activitiesController.listForOneEventById(response, request);
			}else if (pathInfo.startsWith("/inscriptions/")) {
				inscriptionsController.getAllInscriptionsForOnePerson(request, response);
			}

			System.out.println("FrontController.doGet().default");
			break;
		}

	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		HttpSession session = request.getSession();
		String pathInfo = request.getPathInfo();
		System.out.println("FrontController.doPost()" + pathInfo);
		setHeaders(response);
		boolean authorization = false;
		
		if (null == session.getAttribute("id")) {
			session.setAttribute("Authorization", false);
			System.out.println(
					"FrontController.doPost() dans la connection null " + session.getAttribute("id"));
		
			if (!authorization && pathInfo.startsWith("/connection")) {
				System.out.println("FrontController.doPost()dans Connection");
				authorization = loginController.getConnection(request, response);
				session.setAttribute("Authorization", authorization);
				System.out.println("FrontController.doPost() fin de connection " + authorization);
				if (authorization) {
					response.setHeader("Authorization", "true");
				}
			}else if (pathInfo.startsWith("/person/add")) {
				personController.add(request, response);
				System.out.println("FrontController.doPost() person add authorization:" + authorization);
			}
		}else { 
			authorization = (boolean) session.getAttribute("Authorization");
			
			if (authorization) {
				switch (pathInfo) {
				case "/event/add":
					eventsController.add(request, response);
					break;
				case "/activity/add":
					activitiesController.add(request, response);
					break;
				case "/inscription/add":
					inscriptionsController.add(request, response);
					break;
				case "/account/listActivities":
					activitiesController.listActivitiesByPerson(request, response);
					break;
				case "/eventsByPersonId":
					eventsController.listEventsByPersonId(request, response);
				break;
				default:
					System.out.println("FrontController.doPost()/Default");
					break;
				}
			} else {
				System.out.println("pas d'autorisation  " + authorization);
				response.setStatus(403);
			}
		}
	}


	/**
	 * @see HttpServlet#doPut(HttpServletRequest, HttpServletResponse)
	 */
	protected void doPut(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		HttpSession session = request.getSession();
		String pathInfo = request.getPathInfo();
		System.out.println("FrontController.doPut() " + pathInfo + session.getAttribute("id"));
		setHeaders(response);
		boolean authorization = false;
		
		if (null == session.getAttribute("id")) {
			session.setAttribute("Authorization", false);
			System.out.println(
					"FrontController.doPut() dans la connection null " + session.getAttribute("Authorization"));
		
			if (!authorization && pathInfo.startsWith("/connection")) {
				System.out.println("FrontController.doPut()dans Connection");
				authorization = loginController.getConnection(request, response);
				session.setAttribute("Authorization", authorization);
				System.out.println("FrontController.doPut() fin de connection " + authorization);
				if (authorization) {
					response.setHeader("Authorization", "true");
				}
			}
		}else {
			authorization = (boolean) session.getAttribute("Authorization");
			if (authorization) {
				if (pathInfo.startsWith("/person")) {
					personController.updatePerson(request, response);
				}
			}
		}
	}

	/**
	 * @see HttpServlet#doDelete(HttpServletRequest, HttpServletResponse)
	 */
	protected void doDelete(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		HttpSession session = request.getSession();
		String pathInfo = request.getPathInfo();
		System.out.println("FrontController.doDelete() " + pathInfo + session.getAttribute("id"));
		setHeaders(response);
		boolean authorization = false;
		
		if (null == session.getAttribute("id")) {
			session.setAttribute("Authorization", false);
			System.out.println(
					"FrontController.doDelete() dans la connection null " + session.getAttribute("Authorization"));
		
			if (!authorization && pathInfo.startsWith("/connection")) {
				System.out.println("FrontController.doDelete()dans Connection");
				authorization = loginController.getConnection(request, response);
				session.setAttribute("Authorization", authorization);
				System.out.println("FrontController.doDelete() fin de connection " + authorization);
				if (authorization) {
					response.setHeader("Authorization", "true");
				}
			}
		}else { 
			authorization = (boolean) session.getAttribute("Authorization");
			if (authorization) {
				if (pathInfo.startsWith("/activity")) {
					activitiesController.deleteActivity(request);
				}else if (pathInfo.startsWith("/event")) {
					eventsController.deleteEvent(request);
				}else if (pathInfo.startsWith("/person")) {
					personController.deletePerson(request);
				}else if (pathInfo.startsWith("/inscription")) {
					inscriptionsController.deleteInscription(request);
				}
			}
		}		
	}
	@Override
	protected void doOptions(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		super.doOptions(request, response);
		setHeaders(response);
	}

	private void setHeaders(HttpServletResponse response) {
		response.addHeader("Access-Control-Allow-Origin", "http://localhost:4200");
		response.addHeader("Access-Control-Allow-Methods", "GET, HEAD, POST, PUT, DELETE, OPTIONS");
		response.addHeader("Access-Control-Allow-Headers", "content-type,authorization");
		response.addHeader("Access-Control-Allow-Credentials", "true");
	}
}
