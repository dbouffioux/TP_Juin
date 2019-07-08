package be.afelio.controllers.activities;

import java.io.IOException;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.fasterxml.jackson.databind.ObjectMapper;

import be.afelio.beans.Activity;
import be.afelio.beans.Event;
import be.afelio.controllers.jsonGenerator;
import be.afelio.jsonParameters.ActivityParameters;
import be.afelio.jsonParameters.PersonParameters;
import be.afelio.repository.DataRepository;


public class ActivitiesController extends jsonGenerator {

	protected DataRepository repository;

	public ActivitiesController(DataRepository repository) {
		super();
		this.repository = repository;
	}

	public void list(HttpServletResponse response) throws IOException {
		List<Activity> listActivities = repository.findAllActivities();
		jsonGenerate(response, listActivities);
	}
	public void listForOneEventById(HttpServletResponse response, HttpServletRequest request) throws IOException {
		String pathInfoString=request.getPathInfo();
		String[] parts = pathInfoString.split("/");
		int id = Integer.parseInt(parts[2]);
		Event event = repository.getOneEventWithActivities(id);
		jsonGenerate(response, event);
		
	}

	public void listActivitiesByPerson(HttpServletRequest request, HttpServletResponse response)  throws IOException {
		ObjectMapper mapper = new ObjectMapper();
		PersonParameters personParameters = mapper.readValue(request.getInputStream(), PersonParameters.class);
		System.out.println("FrontController.doPost() listActivitiesByPerson");
		if (personParameters.getId() != null
				&& personParameters.getFirstname() != null && !personParameters.getFirstname().isBlank()
				&& personParameters.getLastname() != null && !personParameters.getLastname().isBlank()
				&& personParameters.getLogin() != null && !personParameters.getLogin().isBlank()
				&& personParameters.getPassword() != null && !personParameters.getPassword().isBlank()) {
			int id = personParameters.getId();
		Event event = repository.getListActivitiesByPersonId(id);
		jsonGenerate(response, event);
		}
	}
	
	public void add(HttpServletRequest request, HttpServletResponse response) throws IOException {
		ObjectMapper mapper = new ObjectMapper();
		ActivityParameters activityParameters= mapper.readValue(request.getInputStream(), ActivityParameters.class );
		System.out.println("FrontController.doPost() add Activity");
		if ( activityParameters.getName()!= null
				&& !activityParameters.getName().isBlank() 
				&& activityParameters.getBegin() != null
				&& activityParameters.getFinish() != null
				&& activityParameters.getEvent_name() != null
				&& !activityParameters.getEvent_name().isBlank()) {
			Activity activity= new Activity(null, activityParameters.getName(),
					activityParameters.getBegin(),
					activityParameters.getFinish(),
					activityParameters.getUrl(),
					activityParameters.getDescription(),
					activityParameters.getEvent_name());
			repository.addActivity(activity);
		}
		list(response);
		
	}


	public void deleteActivity(HttpServletRequest request) {
		int index = request.getPathInfo().lastIndexOf("/");
		String idActivity = request.getPathInfo().substring(index + 1);
		int id = Integer.parseInt(idActivity);
		repository.deleteActivityById(id);
		
	}
}
