package be.afelio.jsonParameters;

import java.time.LocalDateTime;
import java.util.Objects;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;

import be.afelio.beans.Inscription;
import be.afelio.utils.LocalDateDeserializer;

public class ActivityParameters {

	protected Integer id;
	protected String name;
	@JsonDeserialize(using = LocalDateDeserializer.class)
	protected LocalDateTime begin;
	@JsonDeserialize(using = LocalDateDeserializer.class)
	protected LocalDateTime finish;
	protected String url;
	protected String description;
	protected String eventName;
	protected Inscription[] inscriptions;

	public Inscription[] getInscriptions() {
		return inscriptions;
	}

	public void setInscriptions(Inscription[] inscriptions) {
		this.inscriptions = inscriptions;
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
	public String getEventName() {
		return eventName;
	}
	public void setEventName(String eventName) {
		this.eventName = eventName;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	@Override
	public boolean equals(Object o) {
		if (this == o) return true;
		if (o == null || getClass() != o.getClass()) return false;
		ActivityParameters that = (ActivityParameters) o;
		return Objects.equals(id, that.id);
	}

	@Override
	public int hashCode() {
		return Objects.hash(id);
	}
}
