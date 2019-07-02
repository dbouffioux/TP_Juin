package be.afelio.controllers.persons;

import java.io.IOException;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.fasterxml.jackson.databind.ObjectMapper;

import be.afelio.beans.Person;
import be.afelio.repository.DataRepository;
import jsonParameters.PersonParameters;

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
		
		public void add(HttpServletRequest request, HttpServletResponse response) throws IOException {
			ObjectMapper mapper = new ObjectMapper();
			PersonParameters personParameters= mapper.readValue(request.getInputStream(), PersonParameters.class );
			System.out.println("FrontController.doPost()");
			if (personParameters.getFirstname() != null
					&& !personParameters.getFirstname().isBlank() 
					&& personParameters.getLastname() != null 
					&& !personParameters.getLastname().isBlank() ) {
				repository.addPerson(personParameters.getFirstname(),personParameters.getLastname() );
			}
			list(response);
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
