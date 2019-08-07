package be.afelio.controllers.activities;

import java.io.IOException;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import be.afelio.beans.Activity;
import be.afelio.beans.Event;
import be.afelio.controllers.jsonGenerator;
import be.afelio.jsonParameters.ActivityParameters;
import be.afelio.jsonParameters.PersonParameters;
import be.afelio.repository.DataRepositoryActivity;
import be.afelio.repository.DataRepositoryEvent;

public class ActivitiesController extends jsonGenerator {

	protected DataRepositoryActivity repositoryActivity;
	protected DataRepositoryEvent repositoryEvent;

	public ActivitiesController(DataRepositoryActivity repositoryActivity, DataRepositoryEvent repositoryEvent) {
		super();
		this.repositoryActivity = repositoryActivity;
		this.repositoryEvent = repositoryEvent;
	}

	public void list(HttpServletResponse response) throws IOException {
		List<Activity> listActivities = repositoryActivity.findAllActivities();
		jsonGenerate(response, listActivities);
	}

	public void getActivitiesToManage(HttpServletRequest request, HttpServletResponse response) throws IOException {
		String pathInfoString=request.getPathInfo();
		String[] parts = pathInfoString.split("/");
		int id = Integer.parseInt(parts[2]);
		List<Activity> listActivities = repositoryActivity.findActivitiesByPersonId(id);
		jsonGenerate(response, listActivities);
	}

	public void getActivityByActivityId(HttpServletRequest request, HttpServletResponse response) throws IOException {
		String pathInfoString=request.getPathInfo();
		String[] parts = pathInfoString.split("/");
		int id = Integer.parseInt(parts[2]);
		Activity activity = repositoryActivity.findOneActivitybyId(id);
		jsonGenerate(response, activity);
	}

	public void listForOneEventById(HttpServletResponse response, HttpServletRequest request) throws IOException {
		String pathInfoString=request.getPathInfo();
		String[] parts = pathInfoString.split("/");
		int id = Integer.parseInt(parts[2]);
		Event event = repositoryEvent.getOneEventWithActivities(id);
		System.out.println("ActivitiesController.listActivitiesByPerson()" + event.getActivities().isEmpty());

		jsonGenerate(response, event);
	}

	public void listActivitiesByPerson(HttpServletRequest request, HttpServletResponse response)  throws IOException {
		ObjectMapper mapper = new ObjectMapper();
		PersonParameters personParameters = mapper.readValue(request.getInputStream(), PersonParameters.class);
		if (personParameters.getId() != null
				&& personParameters.getFirstname() != null && !personParameters.getFirstname().isBlank()
				&& personParameters.getLastname() != null && !personParameters.getLastname().isBlank()
				&& personParameters.getLogin() != null && !personParameters.getLogin().isBlank()
				&& personParameters.getPassword() != null && !personParameters.getPassword().isBlank()) {
			int id = personParameters.getId();
			Event event = repositoryActivity.getListActivitiesByPersonId(id);
			jsonGenerate(response, event);
		}
	}
	
	public void add(HttpServletRequest request, HttpServletResponse response) throws IOException {
		ObjectMapper mapper = new ObjectMapper();
		System.out.println("activityController() dans le add activity avant le if" );
		ActivityParameters activityParameters= mapper.readValue(request.getInputStream(), ActivityParameters.class );
		System.out.println(activityParameters.getName() + " " + activityParameters.getBegin() + " " +
							activityParameters.getFinish() + " " + activityParameters.getEventName());
		if ( activityParameters.getName()!= null
				&& !activityParameters.getName().isBlank() 
				&& activityParameters.getBegin() != null
				&& activityParameters.getFinish() != null
				&& activityParameters.getEventName() != null
				&& !activityParameters.getEventName().isBlank()) {
			Activity activity= new Activity(null, activityParameters.getName(),
					activityParameters.getBegin(),
					activityParameters.getFinish(),
					activityParameters.getUrl(),
					activityParameters.getDescription(),
					activityParameters.getEventName());
			System.out.println("activityController() dans le add activity dans le if" );
			repositoryActivity.addActivity(activity);
		}
	}


	public void updateActivity(HttpServletRequest request, HttpServletResponse response) throws JsonParseException, JsonMappingException, IOException {
		System.out.println("ActivitiesController.updateActivity()");
		ObjectMapper mapper = new ObjectMapper();
		ActivityParameters activityParameters = mapper.readValue(request.getInputStream(), ActivityParameters.class);
		System.out.println("Activity : " + activityParameters.getName() + " - " + activityParameters.getBegin() + " - " + activityParameters.getFinish() + " - " +  activityParameters.getEventName());
		if ( activityParameters.getName()!= null
				&& !activityParameters.getName().isBlank()
				&& activityParameters.getBegin() != null
				&& activityParameters.getFinish() != null
				&& activityParameters.getEventName() != null
				&& !activityParameters.getEventName().isBlank()) {
			Activity activity = new Activity(
					activityParameters.getId(),
					activityParameters.getName(),
					activityParameters.getBegin(),
					activityParameters.getFinish(),
					activityParameters.getUrl(),
					activityParameters.getDescription(),
					activityParameters.getEventName());
			System.out.println("activityController() dans le update activity dans le if");
			repositoryActivity.updateActivity(activity);
		}
	}

	public void deleteActivity(HttpServletRequest request) {
		int index = request.getPathInfo().lastIndexOf("/");
		String idActivity = request.getPathInfo().substring(index + 1);
		int id = Integer.parseInt(idActivity);
		repositoryActivity.deleteActivityById(id);
	}
}
