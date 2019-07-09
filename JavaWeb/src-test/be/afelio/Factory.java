package be.afelio;

import be.afelio.repository.DataRepository;

public class Factory {

    static String databaseUrl = "jdbc:postgresql://localhost:5432/activity";
    static String databaseUser = "postgres";
    static String databasePassword = "postgres";

    public static String getDatabaseUrl() {
        return databaseUrl;
    }

    public static String getDatabaseUser() {
        return databaseUser;
    }

    public static String getDatabasePassword() {
        return databasePassword;
    }

    public static DataRepository repository () {
        return new DataRepositoryImplementation(databaseUrl, databaseUser, databasePassword);
    }
}