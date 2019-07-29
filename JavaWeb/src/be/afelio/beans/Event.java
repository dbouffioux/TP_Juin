package be.afelio.beans;

import java.util.List;

public class Event {
	protected Integer id;
	protected String name;
	protected Integer person_idInteger;
	protected List<Activity> activities;
	
	public Event(Integer id, String name, Integer person_idInteger) {
		super();
		this.id = id;
		this.name = name;
		this.person_idInteger = person_idInteger;
	}
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public Integer getPerson_idInteger() {
		return person_idInteger;
	}
	public void setPerson_idInteger(Integer person_idInteger) {
		this.person_idInteger = person_idInteger;
	}
	public List<Activity> getActivities() {
		return activities;
	}
	public void setActivities(List<Activity> activities) {
		this.activities = activities;
	}
	
	
} 