package be.afelio.jsonParameters;

import java.time.LocalDateTime;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;

import be.afelio.beans.Activity;
import be.afelio.utils.LocalDateDeserializer;

public class EventParameters {
	protected Integer id;
	protected String name;
	protected Integer personId;
	@JsonDeserialize(using = LocalDateDeserializer.class)
	protected LocalDateTime begin;
	@JsonDeserialize(using = LocalDateDeserializer.class)
	protected LocalDateTime finish;
	protected Activity[] activities;
	
	
	
	public LocalDateTime getBegin() {
		return begin;
	}
	public void setBegin(LocalDateTime begin) {
		this.begin = begin;
	}
	public LocalDateTime getFinish() {
		return finish;
	}
	public void setFinish(LocalDateTime finish) {
		this.finish = finish;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public Integer getPersonId() {
		return personId;
	}
	public void setPersonId(Integer personId) {
		this.personId = personId;
	}
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public Activity[] getActivities() {
		return activities;
	}
	public void setActivities(Activity[] activities) {
		this.activities = activities;
	}
	
	
	
	
}
