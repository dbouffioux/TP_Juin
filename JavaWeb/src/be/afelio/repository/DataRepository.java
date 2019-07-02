package be.afelio.repository;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;


import be.afelio.beans.Activity;
import be.afelio.beans.Event;
import be.afelio.beans.Inscription;
import be.afelio.beans.Person;

public class DataRepository {
	private String url;
	private String password;
	private String user;

	public DataRepository(String url, String user, String password) {
		super();
		this.url = url;
		this.user = user;
		this.password = password;
	}

	protected Connection createConnection() throws SQLException {
		return DriverManager.getConnection(url, user, password);
	}

	public void addActivity(String name) {

	}
	public String findEventName(int id) {
		String sql = "SELECT * FROM event WHERE id= ?";
		String name=null;
		try (Connection connection = createConnection();
				PreparedStatement pstatement = connection.prepareStatement(sql)) {
			connection.setAutoCommit(true);
			pstatement.setInt(1, id);
			ResultSet rSet= pstatement.executeQuery();
			name= rSet.getString("name");
		} catch (SQLException sqlException) {
			throw new RuntimeException(sqlException);
		}	
		return name;
	
	}

	public List<Activity> findAllActivities() {
		List<Activity> list = new ArrayList<>();
		String sql = "SELECT a.id,a.name, a.begin, a.finish , a.url , a.description , e.name as event_name "
				+ "FROM activity as a " + 
				"JOIN event as e " + 
				"on a.event_id = e.id";

		try (Connection connection = createConnection();
				Statement statement = connection.createStatement();
				ResultSet resultSet = statement.executeQuery(sql)) {

			while (resultSet.next()) {
				Activity activity = createActivity(resultSet);
				list.add(activity);
			}
		} catch (SQLException sqlException) {
			throw new RuntimeException(sqlException);
		}
		return list;
	}

	private Activity createActivity(ResultSet resultSet) throws SQLException {
		Integer id = resultSet.getInt("id");
		String name = resultSet.getString("name");
		String begin= resultSet.getString("begin");
		String finish= resultSet.getString("finish");
		String description= resultSet.getString("description");
		String url= resultSet.getString("url");
		String event_name = resultSet.getString("event_name");
		Activity activity = new Activity(id, name, begin, finish,url , description, event_name);
		return activity;
	}

	private void addPerson(String lastname, String firstname) {
		if (lastname != null && !lastname.isBlank() && firstname != null && !firstname.isBlank()) {
			String sql = "insert into person(lastname, firstname) values (?, ?)";
			try (Connection connection = createConnection();
					PreparedStatement pstatement = connection.prepareStatement(sql)) {

				connection.setAutoCommit(true);
				pstatement.setString(1, lastname);
				pstatement.setString(2, firstname);
				pstatement.executeUpdate();

			} catch (SQLException sqlException) {
				throw new RuntimeException(sqlException);
			}
		}
	}

	public List<Person> findAllPersons() {
		List<Person> list = new ArrayList<>();
		String sql = "SELECT id, firstname, lastname FROM person";

		try (Connection connection = createConnection();
				Statement statement = connection.createStatement();
				ResultSet resultSet = statement.executeQuery(sql)) {

			while (resultSet.next()) {
				Person person = createPerson(resultSet);
				list.add(person);
			}
		} catch (SQLException sqlException) {
			throw new RuntimeException(sqlException);
		}
		return list;
	}

	private Person createPerson(ResultSet resultSet) throws SQLException {
		int id = resultSet.getInt("id");
		String firstname = resultSet.getString("firstname");
		String lastname = resultSet.getString("lastname");
		Person person = new Person(id, firstname, lastname);
		return person;
	}

	public List<Event> findAllEvents() {
		List<Event> list = new ArrayList<>();
		String sql = "SELECT * FROM event";

		try (Connection connection = createConnection();
				Statement statement = connection.createStatement();
				ResultSet resultSet = statement.executeQuery(sql)) {

			while (resultSet.next()) {
				Event event = createEvent(resultSet);
				list.add(event);
			}
		} catch (SQLException sqlException) {
			throw new RuntimeException(sqlException);
		}
		return list;
	}

	private Event createEvent(ResultSet resultSet) throws SQLException {
		int id = resultSet.getInt("id");
		String name = resultSet.getString("name");
		int person_id = resultSet.getInt("person_id");
		Event event = new Event(id, name, person_id);
		return event;
	}

	public List<Inscription> findAllInscriptions() {
		List<Inscription> list = new ArrayList<>();
		String sql = "SELECT * FROM inscription";

		try (Connection connection = createConnection();
				Statement statement = connection.createStatement();
				ResultSet resultSet = statement.executeQuery(sql)) {

			while (resultSet.next()) {
				Inscription inscription = createInscription(resultSet);
				list.add(inscription);
			}
		} catch (SQLException sqlException) {
			throw new RuntimeException(sqlException);
		}
		return list;
	}

	private Inscription createInscription(ResultSet resultSet) throws SQLException {
		int id = resultSet.getInt("id");
		int activity_id = resultSet.getInt("activity_id");
		int person_id = resultSet.getInt("person_id");
		Inscription inscription = new Inscription(id, activity_id, person_id);
		return inscription;
	}


	
	
	
	
	
	
	
}
