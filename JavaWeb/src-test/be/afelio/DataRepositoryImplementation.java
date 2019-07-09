package be.afelio;

import be.afelio.repository.DataRepository;

public class DataRepositoryImplementation  extends DataRepository{
	private String url;
	private String password;
	private String user;
	
	public DataRepositoryImplementation(String url, String user, String password) {
		super(url, user, password);
		this.url = url;
		this.user = user;
		this.password = password;
	}

	public boolean ping() /* throws java.sql.SQLException */ {
		boolean pinged = false;

		try {
			@SuppressWarnings("unused")
			java.sql.Connection connection = java.sql.DriverManager.getConnection(url, user, password);
			pinged = true;
		} catch (java.sql.SQLException sqle) {
			throw new RuntimeException(sqle);
		}

		return pinged;
	}

}
