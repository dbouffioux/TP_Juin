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

public class DataRepositoryEvent {
	private DataRepositoryActivity dataRepositoryActivity;
	private String url;
	private String password;
	private String user;

	public DataRepositoryEvent(String url, String user, String password) {
		super();
		this.url = url;
		this.user = user;
		this.password = password;
	}
	
	public DataRepositoryActivity getDataRepositoryActivities() {
		return dataRepositoryActivity;
	}


	public void setDataRepositoryActivities(DataRepositoryActivity dataRepositoryActivity) {
		this.dataRepositoryActivity = dataRepositoryActivity;
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
			List<Activity> list = dataRepositoryActivity.findAllActivitiesForOneEventById(idEvent);
			event.setActivities(list);
		}
		return event;
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

	public void deleteEventById(int id) {
		if (dataRepositoryActivity.findAllActivitiesForOneEventById(id).isEmpty()) {
			String sql = "DELETE FROM event WHERE id = ?";
			try (Connection connection = createConnection();
					PreparedStatement statement = connection.prepareStatement(sql);) {
				connection.setAutoCommit(true);
				statement.setInt(1, id);
				statement.executeUpdate();
			} catch (SQLException sqle) {
				throw new RuntimeException(sqle);
			}
		}
		
	}

	private Event createEvent(ResultSet resultSet) throws SQLException {
		int id = resultSet.getInt("id");
		String name = resultSet.getString("name");
		int person_id = resultSet.getInt("person_id");
		Event event = new Event(id, name, person_id);
		return event;
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
}
