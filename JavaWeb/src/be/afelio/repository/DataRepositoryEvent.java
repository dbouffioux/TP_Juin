package be.afelio.repository;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

import be.afelio.beans.Activity;
import be.afelio.beans.Event;

public class DataRepositoryEvent {
	private DataRepositoryActivity dataRepositoryActivity;
	private DataRepositoryConnection dataRepositoryConnection;

	public DataRepositoryEvent(String url, String user, String password) {
		super();
		dataRepositoryConnection = new DataRepositoryConnection(url, user, password);
	}
	
	public DataRepositoryActivity getDataRepositoryActivities() {
		return dataRepositoryActivity;
	}


	public void setDataRepositoryActivities(DataRepositoryActivity dataRepositoryActivity) {
		this.dataRepositoryActivity = dataRepositoryActivity;
	}

	private Event createEvent(ResultSet resultSet) throws SQLException {
		int id = resultSet.getInt("id");
		String name = resultSet.getString("name");
		int person_id = resultSet.getInt("person_id");
		Timestamp begin = resultSet.getTimestamp("begin");
		Timestamp finish = resultSet.getTimestamp("finish");
		Event event = new Event(id, name, person_id, begin.toLocalDateTime(), finish.toLocalDateTime());
		return event;
	}

	public void addEvent(Event event) {
		if (null != event) {
			String sql = "INSERT INTO event (name, person_id, begin, finish) values (?, ?, ?, ?)";
			try (Connection connection = dataRepositoryConnection.createConnection();
					PreparedStatement pstatement = connection.prepareStatement(sql)) {
	
				connection.setAutoCommit(true);
				pstatement.setString(1, event.getName());
				pstatement.setInt(2, event.getPerson_id());
				pstatement.setTimestamp(3, Timestamp.valueOf(event.getBegin()));
				pstatement.setTimestamp(4, Timestamp.valueOf(event.getFinish()));
				pstatement.executeUpdate();
	
			} catch (SQLException sqlException) {
				throw new RuntimeException(sqlException);
			}
		}
	}

	public Event findEventById(int id) {
		String sql = "SELECT * FROM event WHERE id= ?";
		Event event = null;
		try (Connection connection = dataRepositoryConnection.createConnection();
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

	public List<Event> findAllEvents() {
		List<Event> list = new ArrayList<>();
		String sql = "SELECT * FROM event";
	
		try (Connection connection = dataRepositoryConnection.createConnection();
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
	
		try (Connection connection = dataRepositoryConnection.createConnection();
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
	
		try (Connection connection = dataRepositoryConnection.createConnection();
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

	public Event getOneEventWithActivities(int idEvent) {
		Event event = findEventById(idEvent);
		if (event != null) {
			List<Activity> list = dataRepositoryActivity.findAllActivitiesForOneEventById(idEvent);
			event.setActivities(list);
		}
		return event;
	}

	public void deleteEventById(int id) {
			String sql = "DELETE FROM event WHERE id = ?";
			try (Connection connection = dataRepositoryConnection.createConnection();
					PreparedStatement statement = connection.prepareStatement(sql);) {
				connection.setAutoCommit(true);
				statement.setInt(1, id);
				statement.executeUpdate();
			} catch (SQLException sqle) {
				throw new RuntimeException(sqle);
			}
		}
		
	
}
