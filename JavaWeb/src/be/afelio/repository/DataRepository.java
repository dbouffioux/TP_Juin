package be.afelio.repository;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

import be.afelio.beans.Activity;
import be.afelio.beans.Event;
import be.afelio.beans.Inscription;
import be.afelio.beans.Person;
import be.afelio.jsonParameters.PersonParameters;

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
		Event event = null;
		try (Connection connection = createConnection();
				PreparedStatement pstatement = connection.prepareStatement(sql)) {
			connection.setAutoCommit(true);
			pstatement.setInt(1, id);
			ResultSet rSet = pstatement.executeQuery();
			if (rSet.next()) {
				event = createEvent(rSet);
			}
		} catch (SQLException sqlException) {
			throw new RuntimeException(sqlException);
		}
		return event;

	}

	public Event getOneEventWithActivities(int idEvent) {
		Event event = findEventById(idEvent);
		if (event != null) {
			List<Activity> list = findAllActivitiesForOneEventById(idEvent);
			event.setActivities(list);
		}
		return event;
	}

	public Activity addActivity(Activity activity) {
		Integer event_id = findOneEventByName(activity.getEvent_name());
		if (event_id != null) {
			String sql = "insert into activity (name, begin, finish, url, description, event_id)"
					+ " values (?, ?, ?, ?, ?, ?)";
			try (Connection connection = createConnection();
					PreparedStatement pstatement = connection.prepareStatement(sql)) {

				connection.setAutoCommit(true);
				pstatement.setString(1, activity.getName());
				pstatement.setTimestamp(2, Timestamp.valueOf(activity.getBegin()));
				pstatement.setTimestamp(3, Timestamp.valueOf(activity.getFinish()));
				pstatement.setString(4, activity.getUrl());
				pstatement.setString(5, activity.getDescription());
				pstatement.setInt(6, event_id);
				pstatement.executeUpdate();
				try (ResultSet rSet = pstatement.getGeneratedKeys()) {
					if (rSet.next()) {
						activity.setId(rSet.getInt(1));
					}
				}
			} catch (SQLException sqlException) {
				throw new RuntimeException(sqlException);
			}
		}
		return activity;
	}

	public List<Activity> findAllActivities() {
		List<Activity> list = new ArrayList<>();
		String sql = "SELECT a.id,a.name, a.begin, a.finish , a.url , a.description , e.name as event_name "
				+ "FROM activity as a " + "JOIN event as e " + "on a.event_id = e.id";

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
				+ "FROM activity as a " + "JOIN event as e " + "on a.event_id = e.id " + "WHERE e.id = (?)";

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

	public Event getListActivitiesByPersonId(int id) {
		Event event = null;
		String sql = "SELECT e.id as id " + "FROM activity as a " + "JOIN event as e ON a.event_id = e.id "
				+ "JOIN person as p ON e.person_id = p.id " + "WHERE p.id = ? ";

		try (Connection connection = createConnection();
				PreparedStatement pstatement = connection.prepareStatement(sql)) {
			pstatement.setInt(1, id);

			try (ResultSet resultSet = pstatement.executeQuery()) {

				if (resultSet.next()) {
					int id1 = resultSet.getInt("id");
					event = getOneEventWithActivities(id1);
				}
			}
		} catch (SQLException sqlException) {
			throw new RuntimeException(sqlException);
		}
		return event;
	}

	public Activity findOneActivitybyId(int id) {
		Activity activity = null;
		String sql = "SELECT a.id,a.name, a.begin, a.finish , a.url , a.description , e.name as event_name "
				+ "FROM activity as a " + "JOIN event as e " + "on a.event_id = e.id " + "WHERE a.id = (?)";

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
		Timestamp begin = resultSet.getTimestamp("begin");
		Timestamp finish = resultSet.getTimestamp("finish");
		String description = resultSet.getString("description");
		String url = resultSet.getString("url");
		String event_name = resultSet.getString("event_name");
		Activity activity = new Activity(id, name, begin.toLocalDateTime(), finish.toLocalDateTime(), url, description,
				event_name);
		return activity;
	}

	public void addPerson(String lastname, String firstname, String login, String password) {
		if (lastname != null && !lastname.isBlank() && firstname != null && !firstname.isBlank() && login != null
				&& !login.isBlank() && password != null && !password.isBlank()) {
			String sql = "insert into person(lastname, firstname, login, password) values (?, ?, ?, ?)";
			try (Connection connection = createConnection();
					PreparedStatement pstatement = connection.prepareStatement(sql)) {

				connection.setAutoCommit(true);
				pstatement.setString(1, lastname);
				pstatement.setString(2, firstname);
				pstatement.setString(3, login);
				pstatement.setString(4, password);
				pstatement.executeUpdate();

			} catch (SQLException sqlException) {
				throw new RuntimeException(sqlException);
			}
		}
	}

	public List<Person> findAllPersons() {
		List<Person> list = new ArrayList<>();
		String sql = "SELECT * FROM person";

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
		String login = resultSet.getString("login");
		String password = resultSet.getString("password");
		Person person = new Person(id, firstname, lastname, login, password);
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

	public List<Event> findAllEventsByPersonId(int id) {
		List<Event> list = new ArrayList<>();
		String sql = "SELECT id FROM event WHERE person_id = ?";

		try (Connection connection = createConnection();
				PreparedStatement pstatement = connection.prepareStatement(sql)) {
			pstatement.setInt(1, id);

			try (ResultSet resultSet = pstatement.executeQuery()) {
				while (resultSet.next()) {
					int event_id = resultSet.getInt("id");
					Event event = getOneEventWithActivities(event_id);
					list.add(event);
				}
			}
		} catch (SQLException sqlException) {
			throw new RuntimeException(sqlException);
		}
		return list;
	}

	public Integer findOneEventByName(String event_name) {
		Integer id = null;
		String sql = "SELECT id " + "FROM event " + "WHERE UPPER(name) = UPPER(?)";

		try (Connection connection = createConnection();
				PreparedStatement pstatement = connection.prepareStatement(sql)) {
			pstatement.setString(1, event_name);

			try (ResultSet resultSet = pstatement.executeQuery()) {
				if (resultSet.next()) {
					id = resultSet.getInt("id");
				}
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
				System.out.println("DataRepository.addInscription()");

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

	public List<Inscription> getAllInscriptionsForOnePerson(int person_id) {
		List<Inscription> list = new ArrayList<>();
		String sql = "SELECT * FROM inscription " + "WHERE person_id = ?";
		try (Connection connection = createConnection();
				PreparedStatement pstatement = connection.prepareStatement(sql)) {
			pstatement.setInt(1, person_id);

			try (ResultSet resultSet = pstatement.executeQuery()) {

				while (resultSet.next()) {
					Inscription inscription = createInscription(resultSet);
					Activity activity = findOneActivitybyId(inscription.getActivity().getId());
					inscription.setActivity(activity);
					list.add(inscription);
				}
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

	public Person getConnection(String login, String password) {
		Person person = null;
		String sql = "SELECT * FROM person " + "WHERE login = ? AND password = ?";
		try (Connection connection = createConnection();
				PreparedStatement pstatement = connection.prepareStatement(sql)) {

			connection.setAutoCommit(true);
			pstatement.setString(1, login);
			pstatement.setString(2, password);

			try (ResultSet resultSet = pstatement.executeQuery()) {

				if (resultSet.next()) {
					person = createPerson(resultSet);
				}
			}
		} catch (SQLException sqlException) {
			throw new RuntimeException(sqlException);
		}

		return person;
	}

	public void deleteActivityById(int id) {
		String sql = "DELETE FROM activity WHERE id = ?";
		try (Connection connection = createConnection();
				PreparedStatement statement = connection.prepareStatement(sql);) {
			connection.setAutoCommit(true);
			statement.setInt(1, id);
			statement.executeUpdate();
		} catch (SQLException sqle) {
			throw new RuntimeException(sqle);
		}
	}

	public void deleteEventById(int id) {
		System.out.println("DataRepository.deleteEventById() " + id);
		String sql = "DELETE FROM event WHERE id = ?";
		try (Connection connection = createConnection();
				PreparedStatement statement = connection.prepareStatement(sql);) {
			connection.setAutoCommit(true);
			statement.setInt(1, id);
			statement.executeUpdate();
			int updatedRows = statement.getUpdateCount();
			System.out.println("DataRepository.deleteEventById() rows : " + updatedRows);
		} catch (SQLException sqle) {
			throw new RuntimeException(sqle);
		}

	}

	public void deletePersonById(int id) {
		String sql = "DELETE FROM person WHERE id = ?";
		try (Connection connection = createConnection();
				PreparedStatement statement = connection.prepareStatement(sql);) {
			connection.setAutoCommit(true);
			statement.setInt(1, id);
			statement.executeUpdate();
		} catch (SQLException sqle) {
			throw new RuntimeException(sqle);
		}
	}

	public void deleteInscriptionById(int idIns) {
		String sql = "DELETE FROM inscription WHERE id = ?";
		try (Connection connection = createConnection();
				PreparedStatement statement = connection.prepareStatement(sql);) {
			connection.setAutoCommit(true);
			statement.setInt(1, idIns);
			statement.executeUpdate();
		} catch (SQLException sqle) {
			throw new RuntimeException(sqle);
		}

	}

	public void updatePersonById(PersonParameters personParameters, int id) {
		String sql = "UPDATE person " + "SET firstname = ?, " + "	 lastname = ?, " + "	 login = ?, "
				+ "	 password = ? " + "WHERE id = ? ";

		if (personParameters.getLastname() != null && !personParameters.getLastname().isBlank()
				&& personParameters.getFirstname() != null && !personParameters.getFirstname().isBlank()
				&& personParameters.getLogin() != null && !personParameters.getLogin().isBlank()
				&& personParameters.getPassword() != null && !personParameters.getPassword().isBlank()) {
			try (Connection connection = createConnection();
					PreparedStatement pstatement = connection.prepareStatement(sql)) {

				connection.setAutoCommit(true);
				pstatement.setString(1, personParameters.getFirstname());
				pstatement.setString(2, personParameters.getLastname());
				pstatement.setString(3, personParameters.getLogin());
				pstatement.setString(4, personParameters.getPassword());
				pstatement.setInt(5, id);
				pstatement.executeUpdate();

			} catch (SQLException sqle) {
				throw new RuntimeException(sqle);
			}
		}

	}

	public Person findOnePersonById(int id) {
		Person person = null;
		String sql = "SELECT * " + "FROM person " + "WHERE id = ? ";

		try (Connection connection = createConnection();
				PreparedStatement pstatement = connection.prepareStatement(sql)) {

			connection.setAutoCommit(true);
			pstatement.setInt(1, id);

			try (ResultSet resultSet = pstatement.executeQuery()) {

				if (resultSet.next()) {
					person = createPerson(resultSet);
				}
			}
		} catch (SQLException sqlException) {
			throw new RuntimeException(sqlException);
		}

		return person;

	}

	public boolean validateInscription(Activity activity, int person_id) {
		System.out.println("DataRepository.validateInscription()" + activity.getBegin() + " " + activity.getFinish()
				+ " " + person_id);
		boolean isOverlaps = false;
		if (!findAllActivitiesForOneEventById(person_id).isEmpty()) {
			System.out.println("DataRepository.validateInscription() dans la condition");
			String sql = "SELECT (begin, finish) Overlaps ( ? , ? ) " + "FROM activity as act "
					+ "RIGHT JOIN inscription as insc ON act.id = insc.activity_id " + "WHERE person_id = ? ";

			try (Connection connection = createConnection();
					PreparedStatement pstatement = connection.prepareStatement(sql)) {

				connection.setAutoCommit(true);
				pstatement.setTimestamp(1, Timestamp.valueOf(activity.getBegin()));
				pstatement.setTimestamp(2, Timestamp.valueOf(activity.getFinish()));
				pstatement.setInt(3, person_id);
				try (ResultSet resultSet = pstatement.executeQuery()) {

					while (resultSet.next() && isOverlaps) {
						isOverlaps = resultSet.getBoolean(1);

						System.out.println("DataRepository.validateInscription() dans le while" + isOverlaps);
					}
				}
			} catch (SQLException sqlException) {
				throw new RuntimeException(sqlException);
			}
		}

		return !isOverlaps;

	}

	/*
	 * 
	 * UPDATE person SET password = ? WHERE id = ?
	 */

}
