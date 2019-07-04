package be.afelio.beans;

import java.io.Serializable;

public class Person implements Serializable {
	
private static final long serialVersionUID = 7762537910490355991L;
	
	protected Integer id;
	protected String firstname;
	protected String lastname;
	protected String login;
	protected String password;

	public Person(Integer id, String firstname, String lastname, String login, String password) {
		super();
		this.id = id;
		this.firstname = firstname;
		this.lastname = lastname;
		this.login = login;
		this.password = password;
	}
	public String getFirstname() {
		return firstname;
	}
	public void setFirstname(String firstname) {
		this.firstname = firstname;
	}
	public String getLastname() {
		return lastname;
	}
	public void setLastname(String lastname) {
		this.lastname = lastname;
	}
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public static long getSerialversionuid() {
		return serialVersionUID;
	}

	public String getLogin() {
		return login;
	}

	public void setLogin(String login) {
		this.login = login;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}
	
	
	

}
