package be.afelio.controllers.inscriptions;

import java.io.IOException;
import java.util.List;

import javax.servlet.http.HttpServletResponse;

import com.fasterxml.jackson.databind.ObjectMapper;
import be.afelio.beans.Inscription;
import be.afelio.repository.DataRepository;

public class InscriptionsController {
	
	protected DataRepository repository;

	public InscriptionsController(DataRepository repository) {
		super();
		this.repository = repository;
	}

	public void list(HttpServletResponse response) throws IOException {
		List<Inscription> listInscriptions = repository.findAllInscriptions();
		jsonGenerate(response, listInscriptions);
	}

	protected void jsonGenerate(HttpServletResponse response, Object o) throws IOException {

		ObjectMapper mapper = new ObjectMapper();

		String json = mapper.writeValueAsString(o);

		response.setContentType("application/json");
		response.setCharacterEncoding("UTF-8");
		response.addHeader("Access-Control-Allow-Origin", "*");
		response.getWriter().write(json);
	}
}