package be.afelio.utils;



import java.io.IOException;
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneOffset;

import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.deser.std.StdDeserializer;


public class LocalDateDeserializer extends StdDeserializer<LocalDateTime> {
	private static final long serialVersionUID = -7715993065947890827L;

	public LocalDateDeserializer() {
		super(LocalDateTime.class);
	}

	@Override
    public LocalDateTime deserialize(JsonParser parser, DeserializationContext context) throws IOException, JsonProcessingException {
        return LocalDateTime.ofInstant(Instant.parse(parser.readValueAs(String.class)), ZoneOffset.UTC);
    }
	}


