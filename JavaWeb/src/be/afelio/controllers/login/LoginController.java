package be.afelio.controllers.login;

import java.io.IOException;
import java.util.Base64;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import com.fasterxml.jackson.databind.ObjectMapper;

import be.afelio.beans.Person;
import be.afelio.repository.DataRepository;

public class LoginController {

	protected DataRepository repository;

	public  LoginController (DataRepository repository) {
		super();
		this.repository = repository;
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
			Person person = repository.getConnection(login, password);
			passwordValid=true;
			jsonGenerate(response, person);
			
		}		
		return passwordValid;
	}
	protected void jsonGenerate(HttpServletResponse response, Object o) throws IOException {

		ObjectMapper mapper = new ObjectMapper();

		String json = mapper.writeValueAsString(o);

		response.setContentType("application/json");
		response.setCharacterEncoding("UTF-8");
		response.getWriter().write(json);
	}
}
