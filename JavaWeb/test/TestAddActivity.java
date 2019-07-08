import java.time.LocalDateTime;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import be.afelio.beans.Activity;

public class TestAddActivity {
public static void main(String[] args) throws JsonProcessingException {
	Activity activity= new Activity(25, "Test", LocalDateTime.of(2019, 8, 25, 16, 00),  LocalDateTime.of(2019, 8, 27, 16, 00), "tests", "pop", "Rock Wechter");
	ObjectMapper mapper = new ObjectMapper();
	System.out.println(mapper.writeValueAsString(activity));
}
}
