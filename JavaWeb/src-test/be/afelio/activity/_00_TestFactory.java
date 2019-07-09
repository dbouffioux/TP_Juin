package be.afelio.activity;

import static org.junit.jupiter.api.Assertions.*;
import org.junit.jupiter.api.Test;

import java.sql.Connection;
import java.sql.DriverManager;

import be.afelio.Factory;
import be.afelio.repository.DataRepository;

class _00_TestFactory {

	@Test
	void testConnectionParameters() throws Exception {
		String url = Factory.getDatabaseUrl();
		String user = Factory.getDatabaseUser();
		String password = Factory.getDatabasePassword();
		try (Connection c = DriverManager.getConnection(url, user, password)) {
			assertNotNull(c);
		}
	}

	@Test
	void testRepositoryCreation() {
		DataRepository repository = Factory.repository();
		assertNotNull(repository);
	}
}