package be.afelio.activity;

import static org.junit.jupiter.api.Assertions.*;

import java.time.LocalDateTime;

import org.junit.jupiter.api.Test;

import be.afelio.Factory;
import be.afelio.beans.Activity;
import be.afelio.repository.DataRepository;

public class _01_ActivityExist {
	
	@Test
	void testFindOneActivity() throws Exception {
		DataRepository repository = Factory.repository();
		assertNotNull(repository);
		
		Activity expected = new Activity(1, "Pink",
				LocalDateTime.of(2019, 8, 3, 00, 30), 
				LocalDateTime.of(2019, 8, 3, 01, 30),
				"https://www.pinkspage.com/",
				"rock",
				"Rock Wechter");
		Activity actual = repository.findOneActivitybyId(1);
		
		assertNotNull(actual);
		assertEquals(expected.getId(), actual.getId());
		assertEquals(expected.getName(), actual.getName());
		assertEquals(expected.getBegin(), actual.getBegin());
		assertEquals(expected.getFinish(), actual.getFinish());
		assertEquals(expected.getUrl(), actual.getUrl());
		assertEquals(expected.getDescription(), actual.getDescription());
		
	}
}
