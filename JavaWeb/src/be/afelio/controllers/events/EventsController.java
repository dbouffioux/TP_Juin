package be.afelio.controllers.events;

import java.io.IOException;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import be.afelio.beans.Event;
import be.afelio.repository.DataRepository;
import jsonParameters.EventParameters;
import jsonParameters.PersonParameters;

public class EventsController {

	protected DataRepository repository;

	public EventsController(DataRepository repository) {
		super();
		this.repository = repository;
	}

	public void list(HttpServletResponse response) throws IOException {
		List<Event> listEvents = repository.findAllEvents();
		jsonGenerate(response, listEvents);
	}

	protected void jsonGenerate(HttpServletResponse response, Object o) throws IOException {

		ObjectMapper mapper = new ObjectMapper();

		String json = mapper.writeValueAsString(o);

		response.setContentType("application/json");
		response.setCharacterEncoding("UTF-8");
		response.getWriter().write(json);
	}

	public void add(HttpServletRequest request, HttpServletResponse response) throws IOException {
		ObjectMapper mapper = new ObjectMapper();
		EventParameters eventParameters= mapper.readValue(request.getInputStream(), EventParameters.class );
		System.out.println("FrontController.doPost()");
		if ( eventParameters.getName()!= null
				&& !eventParameters.getName().isBlank() 
				&& eventParameters.getPerson_id() != null ) {
			repository.addEvent(eventParameters.getName(),eventParameters.getPerson_id() );
		}
		list(response);
		
	}

}
