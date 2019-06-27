package be.afelio.controllers.activities;

import java.util.List;
import javax.servlet.http.HttpServletRequest;
import be.afelio.beans.Activity;
import be.afelio.repository.DataRepository;


public class ActivitiesController {

	protected DataRepository repository;

	public ActivitiesController(DataRepository repository) {
		super();
		this.repository = repository;
	}

	public void list(HttpServletRequest request) {
		List<Activity> list= repository.findActivities();
		request.setAttribute("activities", list);	
	}

	
}
