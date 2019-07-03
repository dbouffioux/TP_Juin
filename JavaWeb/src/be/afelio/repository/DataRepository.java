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

	
	public Event findEventById(int id) {
		String sql = "SELECT * FROM event WHERE id= ?";
		Event event=null;
		try (Connection connection = createConnection();
				PreparedStatement pstatement = connection.prepareStatement(sql)) {
			connection.setAutoCommit(true);
			pstatement.setInt(1, id);
			ResultSet rSet= pstatement.executeQuery();
			if(rSet.next()) {
				event=createEvent(rSet);
			}
		} catch (SQLException sqlException) {
			throw new RuntimeException(sqlException);
		}	
		return event;
	
	}
	
	public Event getOneEventWithActivities(int idEvent) {
		Event event=findEventById(idEvent);
		if(event!=null) {
			List<Activity> list = findAllActivitiesForOneEventById(idEvent);
			event.setActivities(list);
		}
		return event;
	}
	

	public void addActivity(String name, String begin, String finish, String url, String description,
			String event_name) {
		if (name != null && !name.isBlank()
				&& begin != null && !begin.isBlank()
				&& finish != null && !finish.isBlank()
				&& event_name != null && !event_name.isBlank()) {
			int event_id = findOneEventByName(event_name);
			String sql = "insert into activity (name, begin, finish, url, description, event_id)"
					+ " values (?, ?, ?, ?, ?, ?)";
			try (Connection connection = createConnection();
					PreparedStatement pstatement = connection.prepareStatement(sql)) {

				connection.setAutoCommit(true);
				pstatement.setString(1, name);
				pstatement.setString(2, begin);
				pstatement.setString(3, finish);
				pstatement.setString(4, url);
				pstatement.setString(5, description);
				pstatement.setInt(6, event_id);
				pstatement.executeUpdate();

			} catch (SQLException sqlException) {
				throw new RuntimeException(sqlException);
			}
		}
		
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
	
	public List<Activity> findAllActivitiesForOneEventById(int id) {
		List<Activity> list = new ArrayList<>();
		String sql = "SELECT a.id,a.name, a.begin, a.finish , a.url , a.description , e.name as event_name "
				+ "FROM activity as a " + 
				"JOIN event as e " + 
				"on a.event_id = e.id "+
				"WHERE e.id = (?)";
		
		try (Connection connection = createConnection();
				PreparedStatement pstatement = connection.prepareStatement(sql)) {
			pstatement.setInt(1, id);
			
			try (ResultSet resultSet = pstatement.executeQuery()) {
				
				while (resultSet.next()) {
					Activity activity = createActivity(resultSet);
					list.add(activity);
				}
			}
		} catch (SQLException sqlException) {
			throw new RuntimeException(sqlException);
		}

		return list;
	}

	public Activity findOneActivitybyId(int id) {
		Activity activity=null;
		String sql = "SELECT a.id,a.name, a.begin, a.finish , a.url , a.description , e.name as event_name "
				+ "FROM activity as a " + 
				"JOIN event as e " + 
				"on a.event_id = e.id "
				+ "WHERE a.id = (?)";
		
		try (Connection connection = createConnection();
				PreparedStatement pstatement = connection.prepareStatement(sql)) {
			pstatement.setInt(1, id);
			
			try (ResultSet resultSet = pstatement.executeQuery()) {

				while (resultSet.next()) {
					activity = createActivity(resultSet);
				}
			}
		} catch (SQLException sqlException) {
			throw new RuntimeException(sqlException);
		}
		return activity;
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

	public void addPerson(String lastname, String firstname) {
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

	public void addEvent(String name, Integer person_id) {
		if (name != null && !name.isBlank() && person_id != null) {
			String sql = "insert into event (name, person_id) values (?, ?)";
			try (Connection connection = createConnection();
					PreparedStatement pstatement = connection.prepareStatement(sql)) {

				connection.setAutoCommit(true);
				pstatement.setString(1, name);
				pstatement.setInt(2, person_id);
				pstatement.executeUpdate();

			} catch (SQLException sqlException) {
				throw new RuntimeException(sqlException);
			}
		}
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

	public Integer findOneEventByName(String event_name) {
		Integer id=null;
		String sql ="SELECT id " + 
				"FROM event " + 
				"WHERE UPPER(name) = UPPER(?)";
		
		try (Connection connection = createConnection();
				PreparedStatement pstatement = connection.prepareStatement(sql)) {
			pstatement.setString(1, event_name);
			
			try (ResultSet resultSet = pstatement.executeQuery()) {
					resultSet.next();
					id = resultSet.getInt("id");
			}
		} catch (SQLException sqlException) {
			throw new RuntimeException(sqlException);
		}
		return id;
	}

	private Event createEvent(ResultSet resultSet) throws SQLException {
		int id = resultSet.getInt("id");
		String name = resultSet.getString("name");
		int person_id = resultSet.getInt("person_id");
		Event event = new Event(id, name, person_id);
		return event;
	}

	public void addInscription(Integer activity_id, Integer person_id) {
		if (activity_id != null && person_id != null) {
			String sql = "insert into inscription (activity_id, person_id) values (?, ?)";
			try (Connection connection = createConnection();
					PreparedStatement pstatement = connection.prepareStatement(sql)) {

				connection.setAutoCommit(true);
				pstatement.setInt(1, activity_id);
				pstatement.setInt(2, person_id);
				pstatement.executeUpdate();

			} catch (SQLException sqlException) {
				throw new RuntimeException(sqlException);
			}
		}
		
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
		int person_id = resultSet.getInt("person_id");
		int activity_id = resultSet.getInt("activity_id");
		Activity activity = findOneActivitybyId(activity_id);
		Inscription inscription = new Inscription(id, activity, person_id);
		return inscription;
	}


	
	
	
	
	
	
	
}
