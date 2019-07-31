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
import be.afelio.beans.Inscription;

public class DataRepositoryInscription {
	private DataRepositoryActivity dataRepositoryActivity;
	private DataRepositoryConnection dataRepositoryConnection;

	public DataRepositoryInscription(String url, String user, String password) {
		super();
		dataRepositoryConnection = new DataRepositoryConnection(url, user, password);
	}

	public DataRepositoryActivity getDataRepositoryActivity() {
		return dataRepositoryActivity;
	}

	public void setDataRepositoryActivity(DataRepositoryActivity dataRepositoryActivity) {
		this.dataRepositoryActivity = dataRepositoryActivity;
	}

	private Inscription createInscription(ResultSet resultSet) throws SQLException {
		int id = resultSet.getInt("id");
		int person_id = resultSet.getInt("person_id");
		int activity_id = resultSet.getInt("activity_id");
		Activity activity = dataRepositoryActivity.findOneActivitybyId(activity_id);
		Inscription inscription = new Inscription(id, activity, person_id);
		return inscription;
	}

	public void addInscription(Integer activity_id, Integer person_id) {
		if (activity_id != null && person_id != null) {
			String sql = "insert into inscription (activity_id, person_id) values (?, ?)";
			try (Connection connection = dataRepositoryConnection.createConnection();
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
	
		try (Connection connection = dataRepositoryConnection.createConnection();
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

	public List<Inscription> findAllInscriptionsByActivityId(Integer activity_id) {
		List<Inscription> list = new ArrayList<>();
		String sql = "SELECT * FROM inscription " + "WHERE activity_id = ?";

		try (Connection connection = dataRepositoryConnection.createConnection();
				PreparedStatement pstatement = connection.prepareStatement(sql)) {
			pstatement.setInt(1, activity_id);

			try (ResultSet resultSet = pstatement.executeQuery()) {

				while (resultSet.next()) {
					Inscription inscription = createInscription(resultSet);
					list.add(inscription);
				}
			}
		} catch (SQLException sqlException) {
			throw new RuntimeException(sqlException);
		}
		return list;
	}

	public List<Inscription> getAllInscriptionsForOnePerson(int person_id) {
		List<Inscription> list = new ArrayList<>();

		String sql = "SELECT * FROM inscription " + 
				"WHERE person_id = ?";
		
		try (Connection connection = dataRepositoryConnection.createConnection();
				PreparedStatement pstatement = connection.prepareStatement(sql)) {
			pstatement.setInt(1, person_id);

			try (ResultSet resultSet = pstatement.executeQuery()) {

				while (resultSet.next()) {
					Inscription inscription = createInscription(resultSet);
					Activity activity = dataRepositoryActivity.findOneActivitybyId(inscription.getActivity().getId());
					inscription.setActivity(activity);
					list.add(inscription);
				}
			}
		} catch (SQLException sqlException) {
			throw new RuntimeException(sqlException);
		}

		return list;
	}

	public void deleteInscriptionById(int idIns) {
		String sql = "DELETE FROM inscription WHERE id = ?";
		try (Connection connection = dataRepositoryConnection.createConnection();
				PreparedStatement statement = connection.prepareStatement(sql);) {
			connection.setAutoCommit(true);
			statement.setInt(1, idIns);
			statement.executeUpdate();
		} catch (SQLException sqle) {
			throw new RuntimeException(sqle);
		}

	}

	public boolean validateInscriptionOverlaps(Activity activity, int person_id) {
		System.out.println("DataRepository.validateInscription()" + activity.getBegin() + " " + activity.getFinish()
				+ " " + person_id);
		boolean isOverlaps = false;

		System.out.println("DataRepository.validateInscription() dans la condition");
		
		String sql = "SELECT (begin, finish) Overlaps ( ? , ? ) " + 
			"FROM activity as act " + 
			"RIGHT JOIN inscription as insc ON act.id = insc.activity_id " + 
			"WHERE person_id = ? " ;
	
		try (Connection connection = dataRepositoryConnection.createConnection();
				PreparedStatement pstatement = connection.prepareStatement(sql)) {

			connection.setAutoCommit(true);
			pstatement.setTimestamp(1, Timestamp.valueOf(activity.getBegin()));
			pstatement.setTimestamp(2, Timestamp.valueOf(activity.getFinish()));
			pstatement.setInt(3, person_id);
			try (ResultSet resultSet = pstatement.executeQuery()) {

				while (resultSet.next() && !isOverlaps) {
					isOverlaps = resultSet.getBoolean(1);

					System.out.println("DataRepository.validateInscription() dans le while" + isOverlaps);
				}
			}
		} catch (SQLException sqlException) {
			throw new RuntimeException(sqlException);
		}
		return isOverlaps;
	}
}
