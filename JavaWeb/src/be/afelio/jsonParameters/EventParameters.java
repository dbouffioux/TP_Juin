package be.afelio.jsonParameters;

import be.afelio.beans.Activity;

public class EventParameters {
	protected Integer id;
	protected String name;
	protected Integer person_id;
	protected Activity activities;
	
	
	
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public Integer getPerson_id() {
		return person_id;
	}
	public void setPerson_id(Integer person_id) {
		this.person_id = person_id;
	}
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public Activity getActivities() {
		return activities;
	}
	public void setActivities(Activity activities) {
		this.activities = activities;
	}
	
	
	
	
}
