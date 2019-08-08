package be.afelio.controllers.persons;

import java.io.IOException;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import com.fasterxml.jackson.databind.ObjectMapper;

import be.afelio.beans.Person;
import be.afelio.controllers.jsonGenerator;
import be.afelio.jsonParameters.PersonParameters;
import be.afelio.repository.DataRepositoryPerson;

public class PersonController extends jsonGenerator {

	protected DataRepositoryPerson repositoryPerson;

	public PersonController(DataRepositoryPerson repositoryPerson) {
		super();
		this.repositoryPerson = repositoryPerson;
	}

	public void list(HttpServletResponse response) throws IOException {
		List<Person> listPersons = repositoryPerson.findAllPersons();
		jsonGenerate(response, listPersons);
	}

	public void add(HttpServletRequest request, HttpServletResponse response) throws IOException {
		System.out.println("ADD USER in personController");
		ObjectMapper mapper = new ObjectMapper();
		Person person = null;
		PersonParameters personParameters = mapper.readValue(request.getInputStream(), PersonParameters.class);
		if (personParameters.getFirstname() != null && !personParameters.getFirstname().isBlank()
				&& personParameters.getLastname() != null && !personParameters.getLastname().isBlank()
				&& personParameters.getLogin() != null && !personParameters.getLogin().isBlank()
				&& personParameters.getPassword() != null && !personParameters.getPassword().isBlank()) {
			person = repositoryPerson.addPerson(personParameters.getLastname(), personParameters.getFirstname(),
					personParameters.getLogin(), personParameters.getPassword());
			request.getSession().setAttribute("Authorization", "true");
		}

		jsonGenerate(response, person);
	}

	public void updatePerson(HttpServletRequest request, HttpServletResponse response) throws IOException {
		ObjectMapper mapper = new ObjectMapper();
		PersonParameters personParameters = mapper.readValue(request.getInputStream(), PersonParameters.class);
		Person person = null;
		if (personParameters.getId() != null
				&& personParameters.getFirstname() != null
				&& !personParameters.getFirstname().isBlank()
				&& personParameters.getLastname() != null
				&& !personParameters.getLastname().isBlank()
				&& personParameters.getLogin() != null
				&& !personParameters.getLogin().isBlank()
				&& personParameters.getPassword() != null
				&& !personParameters.getPassword().isBlank()) {
			person = repositoryPerson.addPerson(personParameters.getLastname(), personParameters.getFirstname(),
					personParameters.getLogin(), personParameters.getPassword());
			repositoryPerson.updatePerson(person);
		}
	}

	public void deletePerson(HttpServletRequest request) {
		int index = request.getPathInfo().lastIndexOf("/");
		String idPerson = request.getPathInfo().substring(index + 1);
		int id = Integer.parseInt(idPerson);
		repositoryPerson.deletePersonById(id);
		
	}
}
