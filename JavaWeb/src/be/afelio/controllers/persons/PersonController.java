package be.afelio.controllers.persons;

import java.io.IOException;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.fasterxml.jackson.databind.ObjectMapper;

import be.afelio.beans.Activity;
import be.afelio.beans.Person;
import be.afelio.repository.DataRepository;

public class PersonController {


		protected DataRepository repository;

		public  PersonController (DataRepository repository) {
			super();
			this.repository = repository;
		}
		

		public void list(HttpServletResponse response) throws IOException {
			List<Person> listPersons = repository.findAllPersons();
			jsonGenerate(response, listPersons);
		}

		protected void jsonGenerate(HttpServletResponse response, Object o) throws IOException {

			ObjectMapper mapper = new ObjectMapper();

			String json = mapper.writeValueAsString(o);

			response.setContentType("application/json");
			response.setCharacterEncoding("UTF-8");
			response.addHeader("Access-Control-Allow-Origin", "*");
			response.getWriter().write(json);
		}


		public void deletePerson(HttpServletRequest request) {
			int index = request.getPathInfo().lastIndexOf("/");
			String idPerson = request.getPathInfo().substring(index + 1);
			int id = Integer.parseInt(idPerson);
			repository.deletePersonById(id);
			
		}
	

}
