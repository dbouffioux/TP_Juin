package be.afelio.beans;

import java.time.LocalDateTime;
import java.util.List;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;

import be.afelio.utils.LocalDateDeserializer;
import be.afelio.utils.LocalDateSerializer;

public class Activity {

	protected Integer id;
	protected String name;
	@JsonDeserialize(using = LocalDateDeserializer.class)
	@JsonSerialize(using = LocalDateSerializer.class)
	protected LocalDateTime begin;
	@JsonDeserialize(using = LocalDateDeserializer.class)
	@JsonSerialize(using = LocalDateSerializer.class)
	protected LocalDateTime finish;
	protected String url;
	protected String description;
	protected String event_name;
	protected List<Inscription> inscriptions;
	
	
	public List<Inscription> getInscriptions() {
		return inscriptions;
	}
	public void setInscriptions(List<Inscription> list) {
		this.inscriptions = list;
	}
	public String getEvent_name() {
		return event_name;
	}
	public void setEvent_name(String event_name) {
		this.event_name = event_name;
	}
	public Activity(Integer id, String name, LocalDateTime begin, LocalDateTime finish, String url, String description,
			String event_name) {
		super();
		this.id = id;
		this.name = name;
		this.begin = begin;
		this.finish = finish;
		this.url = url;
		this.description = description;
		this.event_name = event_name;
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
	public String getUrl() {
		return url;
	}
	public void setUrl(String url) {
		this.url = url;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}


	

	
	
}
