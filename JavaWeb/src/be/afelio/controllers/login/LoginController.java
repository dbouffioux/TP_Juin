package be.afelio.controllers.login;

import java.io.IOException;
import java.util.Base64;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import be.afelio.beans.Person;
import be.afelio.controllers.jsonGenerator;
import be.afelio.repository.DataRepositoryPerson;

public class LoginController extends jsonGenerator {

	protected DataRepositoryPerson repositoryPerson;

	public  LoginController (DataRepositoryPerson repositoryPerson) {
		super();
		this.repositoryPerson = repositoryPerson;
	}
	
	public boolean getConnection(HttpServletRequest request, HttpServletResponse response) throws IOException {
		boolean passwordValid = false;
		String btoa=request.getParameter("btoa");
		System.out.println("LoginController.getConnection() param : " + btoa);
		
		
		byte[] decodedBtoa = Base64.getDecoder().decode(btoa);
		String btoaString= new String(decodedBtoa);
		String[] parts = btoaString.split(":");

		String login = parts[0];
		String password = parts[1];

		System.out.println("LoginController.getConnection()" + login +"  " + password);
		
		if (login != null
				&& !login.isBlank()
				&& password != null
				&& !password.isBlank()) {
			Person person = repositoryPerson.getConnectionAccount(login, password);
			if(person != null) {
				passwordValid=true;
				request.getSession().setAttribute("id", person.getId() );
				request.getSession().setAttribute("Authorization", true);
				jsonGenerate(response, person);
			}
			
		}	
		return passwordValid;
	}
}
