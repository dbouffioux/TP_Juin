package be.afelio.controllers.inscriptions;

import java.io.IOException;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.fasterxml.jackson.databind.ObjectMapper;

import be.afelio.beans.Activity;
import be.afelio.beans.Inscription;
import be.afelio.controllers.jsonGenerator;
import be.afelio.jsonParameters.InscriptionParameters;
import be.afelio.repository.DataRepositoryActivity;
import be.afelio.repository.DataRepositoryInscription;

public class InscriptionsController extends jsonGenerator{
	
	protected DataRepositoryInscription repositoryInscription;
	protected DataRepositoryActivity repositoryActivity;

	public InscriptionsController(DataRepositoryInscription repositoryInscription, DataRepositoryActivity repositoryActivity) {
		super();
		this.repositoryInscription = repositoryInscription;
		this.repositoryActivity = repositoryActivity;
	}

	public void add(HttpServletRequest request, HttpServletResponse response) throws IOException {
		
		ObjectMapper mapper = new ObjectMapper();
		try {
			InscriptionParameters inscriptionParameters= mapper.readValue(request.getInputStream(), InscriptionParameters.class );
			Activity activity = repositoryActivity.findOneActivitybyId(inscriptionParameters.getActivityId());
		System.out.println("InscriptionsController.add() act-id " + inscriptionParameters.getActivityId() +" person id " +inscriptionParameters.getPersonId());
			if (inscriptionParameters.getActivityId() != null
					&& inscriptionParameters.getPersonId() != null
					&& validateInscription(activity, inscriptionParameters.getPersonId())) {
				System.out.println("InscriptionsController.add()");
			repositoryInscription.addInscription(inscriptionParameters.getActivityId(),inscriptionParameters.getPersonId());
			}
			list(response);
			
			
		} catch (Exception e) {
			e.printStackTrace();
			response.setStatus(400);
		}
		
	}
	public boolean validateInscription(Activity activity, int personId) {
		System.out.println("InscriptionsController.validateInscription()");
		if (repositoryInscription.getAllInscriptionsForOnePerson(personId).isEmpty()) {
			return true;
		}
		else {
			return !repositoryInscription.validateInscriptionOverlaps(activity, personId);
		}
		
		
	}
	public void getAllInscriptionsForOnePerson(HttpServletRequest request, HttpServletResponse response) throws IOException {
		String pathInfoString=request.getPathInfo();
		String[] parts = pathInfoString.split("/");
		int id = Integer.parseInt(parts[2]);
		List<Inscription> listInscriptions = repositoryInscription.getAllInscriptionsForOnePerson(id);
		jsonGenerate(response, listInscriptions);
	}

	public void list(HttpServletResponse response) throws IOException {
		List<Inscription> listInscriptions = repositoryInscription.findAllInscriptions();
		jsonGenerate(response, listInscriptions);
	}

	public void deleteInscription(HttpServletRequest request) {
		int index = request.getPathInfo().lastIndexOf("/");
		String id = request.getPathInfo().substring(index + 1);
		int idIns = Integer.parseInt(id);
		repositoryInscription.deleteInscriptionById(idIns);
		
	}
	

}