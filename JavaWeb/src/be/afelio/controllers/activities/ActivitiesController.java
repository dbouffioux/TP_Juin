package be.afelio.controllers.activities;

import java.io.IOException;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.fasterxml.jackson.databind.ObjectMapper;

import be.afelio.beans.Activity;
import be.afelio.repository.DataRepository;
import jsonParameters.ActivityParameters;


public class ActivitiesController {

	protected DataRepository repository;

	public ActivitiesController(DataRepository repository) {
		super();
		this.repository = repository;
	}

	public void list(HttpServletResponse response) throws IOException {
		List<Activity> listActivities = repository.findAllActivities();
		jsonGenerate(response, listActivities);
	}
	public void add(HttpServletRequest request, HttpServletResponse response) throws IOException {
		ObjectMapper mapper = new ObjectMapper();
		ActivityParameters activityParameters= mapper.readValue(request.getInputStream(), ActivityParameters.class );
		System.out.println("FrontController.doPost() add Activity");
		if ( activityParameters.getName()!= null
				&& !activityParameters.getName().isBlank() 
				&& activityParameters.getBegin() != null
				&& !activityParameters.getBegin().isBlank() 
				&& activityParameters.getFinish() != null
				&& !activityParameters.getFinish().isBlank()
				&& activityParameters.getEvent_name() != null
				&& !activityParameters.getEvent_name().isBlank()) {
			repository.addActivity(activityParameters.getName(),
									activityParameters.getBegin(),
									activityParameters.getFinish(),
									activityParameters.getUrl(),
									activityParameters.getDescription(),
									activityParameters.getEvent_name());
		}
		list(response);
		
	}


	protected void jsonGenerate(HttpServletResponse response, Object o) throws IOException {

		ObjectMapper mapper = new ObjectMapper();

		String json = mapper.writeValueAsString(o);

		response.setContentType("application/json");
		response.setCharacterEncoding("UTF-8");
		response.getWriter().write(json);
	}
}
