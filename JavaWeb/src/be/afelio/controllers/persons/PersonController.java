package be.afelio.controllers.persons;

import java.io.IOException;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import com.fasterxml.jackson.databind.ObjectMapper;

import be.afelio.beans.Person;
import be.afelio.controllers.jsonGenerator;
import be.afelio.jsonParameters.PersonParameters;
import be.afelio.repository.DataRepository;

public class PersonController extends jsonGenerator {

	protected DataRepository repository;

	public PersonController(DataRepository repository) {
		super();
		this.repository = repository;
	}

	public void list(HttpServletResponse response) throws IOException {
		List<Person> listPersons = repository.findAllPersons();
		jsonGenerate(response, listPersons);
	}

	public void add(HttpServletRequest request, HttpServletResponse response) throws IOException {
		ObjectMapper mapper = new ObjectMapper();
		PersonParameters personParameters = mapper.readValue(request.getInputStream(), PersonParameters.class);
		System.out.println("FrontController.doPost()");
		if (personParameters.getFirstname() != null && !personParameters.getFirstname().isBlank()
				&& personParameters.getLastname() != null && !personParameters.getLastname().isBlank()
				&& personParameters.getLogin() != null && !personParameters.getLogin().isBlank()
				&& personParameters.getPassword() != null && !personParameters.getPassword().isBlank()) {
			repository.addPerson(personParameters.getLastname(), personParameters.getFirstname(),
					personParameters.getLogin(), personParameters.getPassword());
		}
		list(response);
	}
	public void deletePerson(HttpServletRequest request) {
		int index = request.getPathInfo().lastIndexOf("/");
		String idPerson = request.getPathInfo().substring(index + 1);
		int id = Integer.parseInt(idPerson);
		repository.deletePersonById(id);
		
	}
}
