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
import be.afelio.jsonParameters.ActivityParameters;

public class DataRepositoryActivity {
	private DataRepositoryEvent dataRepositoryEvent;
	private DataRepositoryInscription dataRepositoryInscription;
	private DataRepositoryConnection dataRepositoryConnection;



	public DataRepositoryActivity(String url, String user, String password) {
		super();
		dataRepositoryConnection = new DataRepositoryConnection(url, user, password);
	}
	
	public DataRepositoryEvent getDataRepositoryEvent() {
		return dataRepositoryEvent;
	}

	public void setDataRepositoryEvent(DataRepositoryEvent dataRepositoryEvent) {
		this.dataRepositoryEvent = dataRepositoryEvent;
	}

	public DataRepositoryInscription getDataRepositoryInscription() {
		return dataRepositoryInscription;
	}

	public void setDataRepositoryInscription(DataRepositoryInscription dataRepositoryInscription) {
		this.dataRepositoryInscription = dataRepositoryInscription;
	}

	private Activity createActivity(ResultSet resultSet) throws SQLException {
		Integer id = resultSet.getInt("id");
		String name = resultSet.getString("name");
		Timestamp begin = resultSet.getTimestamp("begin");
		Timestamp finish = resultSet.getTimestamp("finish");
		String description = resultSet.getString("description");
		String url = resultSet.getString("url");
		String eventName = resultSet.getString("event_name");
		Activity activity = new Activity(id, name, begin.toLocalDateTime(), finish.toLocalDateTime(), url, description, eventName);
		return activity;
	}
	

	public Activity addActivity(Activity activity) {
		System.out.println("DataRepositoryActivity.addActivity()");
		Integer eventId = dataRepositoryEvent.findOneEventByName(activity.getEventName());
		if (eventId != null) {
			String sql = "insert into activity (name, begin, finish, url, description, event_id)"
					+ " values (?, ?, ?, ?, ?, ?)";
			try (Connection connection = dataRepositoryConnection.createConnection();
					PreparedStatement pstatement = connection.prepareStatement(sql)) {
	
				connection.setAutoCommit(true);
				pstatement.setString(1, activity.getName());
				pstatement.setTimestamp(2 , Timestamp.valueOf(activity.getBegin()));
				pstatement.setTimestamp(3, Timestamp.valueOf(activity.getFinish()));
				pstatement.setString(4, activity.getUrl());
				pstatement.setString(5, activity.getDescription());
				pstatement.setInt(6, eventId);
				pstatement.executeUpdate();
				try (ResultSet rSet = pstatement.getGeneratedKeys()) {
					if(rSet.next()) {
						activity.setId(rSet.getInt(1));
					}
				}
			} catch (SQLException sqlException) {
				throw new RuntimeException(sqlException);
			}
		}return activity;
	}

	public List<Activity> findAllActivities() {
		List<Activity> list = new ArrayList<>();
		String sql = "SELECT a.id,a.name, a.begin, a.finish , a.url , a.description , e.name as event_name "
				+ "FROM activity as a " + "JOIN event as e " + "on a.event_id = e.id";
	
		try (Connection connection = dataRepositoryConnection.createConnection();
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
	
		try (Connection connection = dataRepositoryConnection.createConnection();
				PreparedStatement pstatement = connection.prepareStatement(sql)) {
			pstatement.setInt(1, id);
	
			try (ResultSet resultSet = pstatement.executeQuery()) {
	
				while (resultSet.next()) {
					Activity activity = createActivity(resultSet);
					activity.setInscriptions(dataRepositoryInscription.findAllInscriptionsByActivityId(activity.getId()));
					list.add(activity);
					
				}
			}
		} catch (SQLException sqlException) {
			throw new RuntimeException(sqlException);
		}
	
		return list;
	}

	public Activity findOneActivitybyId(int id) {
		Activity activity = null;
		String sql = "SELECT a.id,a.name, a.begin, a.finish , a.url , a.description , e.name as event_name "
				+ "FROM activity as a " + "JOIN event as e " + "on a.event_id = e.id " + "WHERE a.id = (?)";
	
		try (Connection connection = dataRepositoryConnection.createConnection();
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

	public List<Activity> findActivitiesByPersonId(Integer id) {
		List<Activity> list = new ArrayList<Activity>();
		List<Event> events = dataRepositoryEvent.findAllEventsByPersonId(id);
		List<Activity> temp = new ArrayList<Activity>();
		
		for (Event event : events) {
			temp = event.getActivities();
			for (Activity activity : temp) {
				list.add(activity);
			}			
		}
		
		return list;
	}

	public Event getListActivitiesByPersonId(int id) {
		Event event = null;
		String sql = "SELECT e.id as id " + "FROM activity as a " + "JOIN event as e ON a.event_id = e.id "
				+ "JOIN person as p ON e.person_id = p.id " + "WHERE p.id = ? ";
	
		try (Connection connection = dataRepositoryConnection.createConnection();
				PreparedStatement pstatement = connection.prepareStatement(sql)) {
			pstatement.setInt(1, id);
	
			try (ResultSet resultSet = pstatement.executeQuery()) {
	
				if (resultSet.next()) {
					int id1 = resultSet.getInt("id");
					event = dataRepositoryEvent.getOneEventWithActivities(id1);
				}
			}
		} catch (SQLException sqlException) {
			throw new RuntimeException(sqlException);
		}
		return event;
	}

	public void updateActivityById(ActivityParameters activityParameters, int id) {
		String sql ="UPDATE public.activity " + 
				"    SET name=?, begin=?, finish=?, url=?, description=?, event_id=? " + 
				"    WHERE id = ? ";
		Integer eventId = dataRepositoryEvent.findOneEventByName(activityParameters.getEventName());
		if (activityParameters.getBegin() != null
				&& activityParameters.getFinish()!= null
				&& activityParameters.getName() != null && !activityParameters.getName().isBlank()
				&& activityParameters.getEventName() != null && !activityParameters.getEventName().isBlank()) {
			try (Connection connection = dataRepositoryConnection.createConnection();
					PreparedStatement pstatement = connection.prepareStatement(sql)) {
	
				connection.setAutoCommit(true);
				pstatement.setString(1, activityParameters.getName());
				pstatement.setTimestamp(2 , Timestamp.valueOf(activityParameters.getBegin()));
				pstatement.setTimestamp(3, Timestamp.valueOf(activityParameters.getFinish()));
				pstatement.setString(4, activityParameters.getUrl());
				pstatement.setString(5, activityParameters.getDescription());
				pstatement.setInt(6, eventId);
				pstatement.executeUpdate();
	
			} catch (SQLException sqle) {
				throw new RuntimeException(sqle);
			}
		}
	
	}

	public void deleteActivityById(int id) {
		String sql = "DELETE FROM activity WHERE id = ?";
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
