package be.afelio.beans;

import java.time.LocalDateTime;
import java.util.List;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;

import be.afelio.utils.LocalDateDeserializer;
import be.afelio.utils.LocalDateSerializer;

public class Event {
	protected Integer id;
	protected String name;
	protected Integer person_id;
	@JsonDeserialize(using = LocalDateDeserializer.class)
	@JsonSerialize(using = LocalDateSerializer.class)
	protected LocalDateTime begin;
	@JsonDeserialize(using = LocalDateDeserializer.class)
	@JsonSerialize(using = LocalDateSerializer.class)
	protected LocalDateTime finish;
	protected List<Activity> activities;
	
	
	public Event(Integer id, String name, Integer person_id
				, LocalDateTime begin, LocalDateTime finish) {
		super();
		this.id = id;
		this.name = name;
		this.person_id = person_id;
		this.begin = begin;
		this.finish = finish;
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
	public Integer getPerson_id() {
		return person_id;
	}
	public void setPerson_id(Integer person_idInteger) {
		this.person_id = person_idInteger;
	}
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
	public List<Activity> getActivities() {
		return activities;
	}
	public void setActivities(List<Activity> activities) {
		this.activities = activities;
	}
} 