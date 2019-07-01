package be.afelio.beans;

import java.io.Serializable;

public class Person implements Serializable {
	
private static final long serialVersionUID = 7762537910490355991L;
	
	protected Integer id;
	protected String firstname;
	protected String lastname;

	public Person(Integer id, String firstname, String lastname) {
		this.id = id;
		this.firstname = firstname;
		this.lastname = lastname;
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
	
	
	

}
