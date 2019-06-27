package be.afelio.repository;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;


import be.afelio.beans.Activity;

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

	public List<Activity> findActivities() {
		List<Activity> list = new ArrayList<>();
		String sql = "SELECT activity_id, activity_name FROM activities";

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
		int id = resultSet.getInt("activity_id");
		String name = resultSet.getString("activity_name");
		Activity activity = new Activity(id, name);
		return activity;
	}

}
