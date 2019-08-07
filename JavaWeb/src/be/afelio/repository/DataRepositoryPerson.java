package be.afelio.repository;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import be.afelio.beans.Person;
import be.afelio.jsonParameters.PersonParameters;

public class DataRepositoryPerson {
	private DataRepositoryConnection dataRepositoryConnection;

	public DataRepositoryPerson(String url, String user, String password) {
		super();
		dataRepositoryConnection = new DataRepositoryConnection(url, user, password);
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

	public Person addPerson(String lastname, String firstname, String login, String password) {
		Person person = null;
		if (lastname != null && !lastname.isBlank() && firstname != null && !firstname.isBlank() && login != null
				&& !login.isBlank() && password != null && !password.isBlank()) {
			String sql = "insert into person(lastname, firstname, login, password) values (?, ?, ?, ?)";
			int generatedId;

			try (Connection connection = dataRepositoryConnection.createConnection();
					PreparedStatement pstatement = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS)) {

				connection.setAutoCommit(true);
				pstatement.setString(1, lastname);
				pstatement.setString(2, firstname);
				pstatement.setString(3, login);
				pstatement.setString(4, password);
				pstatement.executeUpdate();
				try (ResultSet rs = pstatement.getGeneratedKeys()) {
					if (rs.next()) {
						generatedId = rs.getInt(1);
						person = this.findOnePersonById(generatedId);
					}
				}

			} catch (SQLException sqlException) {
				throw new RuntimeException(sqlException);
			}
		}
		return person;
	}

	public List<Person> findAllPersons() {
		List<Person> list = new ArrayList<>();
		String sql = "SELECT * FROM person";
	
		try (Connection connection = dataRepositoryConnection.createConnection();
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

	public Person findOnePersonById(int id) {
		Person person = null;
		String sql = "SELECT * " + "FROM person " + "WHERE id = ? ";
	
		try (Connection connection = dataRepositoryConnection.createConnection();
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

	public void updatePersonById(PersonParameters personParameters, int id) {
		String sql = "UPDATE person "
				   + "SET firstname = ?, "
				   + "	 lastname = ?, "
				   + "	 login = ?, "
				   + "	 password = ? "
				   + "WHERE id = ? ";
	
		if (personParameters.getLastname() != null && !personParameters.getLastname().isBlank()
				&& personParameters.getFirstname() != null && !personParameters.getFirstname().isBlank()
				&& personParameters.getLogin() != null && !personParameters.getLogin().isBlank()
				&& personParameters.getPassword() != null && !personParameters.getPassword().isBlank()) {
			try (Connection connection = dataRepositoryConnection.createConnection();
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

	public void deletePersonById(int id) {
		String sql = "DELETE FROM person WHERE id = ?";
		try (Connection connection = dataRepositoryConnection.createConnection();
				PreparedStatement statement = connection.prepareStatement(sql);) {
			connection.setAutoCommit(true);
			statement.setInt(1, id);
			statement.executeUpdate();
		} catch (SQLException sqle) {
			throw new RuntimeException(sqle);
		}
	}

	public Person getConnectionAccount(String login, String password) {
		Person person = null;
		String sql = "SELECT * FROM person " + "WHERE login = ? AND password = ?";
		try (Connection connection = dataRepositoryConnection.createConnection();
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
}
