package be.afelio.controllers.events;

import java.io.IOException;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.fasterxml.jackson.databind.ObjectMapper;

import be.afelio.beans.Event;
import be.afelio.controllers.jsonGenerator;
import be.afelio.jsonParameters.EventParameters;
import be.afelio.repository.DataRepositoryEvent;

public class EventsController extends jsonGenerator{

	protected DataRepositoryEvent repositoryEvent;

	public EventsController(DataRepositoryEvent repository) {
		super();
		this.repositoryEvent = repository;
	}

	public void list(HttpServletResponse response) throws IOException {
		List<Event> listEvents = repositoryEvent.findAllEvents();
		jsonGenerate(response, listEvents);
	}

	public void listEventsByPersonId(HttpServletRequest request, HttpServletResponse response) {
		ObjectMapper mapper = new ObjectMapper();
		EventParameters eventParameters;
		try {
			eventParameters = mapper.readValue(request.getInputStream(), EventParameters.class);
			List<Event> listEvents = repositoryEvent.findAllEventsByPersonId(eventParameters.getPersonId());
			jsonGenerate(response, listEvents);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	public void add(HttpServletRequest request, HttpServletResponse response) throws IOException {
		ObjectMapper mapper = new ObjectMapper();
		EventParameters eventParameters= mapper.readValue(request.getInputStream(), EventParameters.class );
		if ( eventParameters.getName()!= null
				&& !eventParameters.getName().isBlank() 
				&& eventParameters.getPersonId() != null
				&& eventParameters.getBegin()!= null
				&& eventParameters.getFinish()!= null) {
			Event event = new Event(null,
									eventParameters.getName(),
									eventParameters.getPersonId(),
									eventParameters.getBegin(),
									eventParameters.getFinish());
			repositoryEvent.addEvent(event);
		}
		list(response);
	}

	public void deleteEvent(HttpServletRequest request) {
		int index = request.getPathInfo().lastIndexOf("/");
		String idEv = request.getPathInfo().substring(index + 1);
		repositoryEvent.deleteEventById(Integer.parseInt(idEv));
		int id = Integer.parseInt(idEv);
		repositoryEvent.deleteEventById(id);
	}
}
