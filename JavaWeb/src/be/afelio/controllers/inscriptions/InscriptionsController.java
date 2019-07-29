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
import be.afelio.jsonParameters.PersonParameters;
import be.afelio.repository.DataRepository;

public class InscriptionsController extends jsonGenerator{
	
	protected DataRepository repository;

	public InscriptionsController(DataRepository repository) {
		super();
		this.repository = repository;
	}

	public void add(HttpServletRequest request, HttpServletResponse response) throws IOException {
		
		ObjectMapper mapper = new ObjectMapper();
		try {
			InscriptionParameters inscriptionParameters= mapper.readValue(request.getInputStream(), InscriptionParameters.class );
			Activity activity = repository.findOneActivitybyId(inscriptionParameters.getActivity_id());
		System.out.println("InscriptionsController.add() act-id " + inscriptionParameters.getActivity_id() +" person id " +inscriptionParameters.getPerson_id());
			if (inscriptionParameters.getActivity_id() != null
					&& inscriptionParameters.getPerson_id() != null
					&& validateInscription(activity, inscriptionParameters.getPerson_id())) {
				System.out.println("InscriptionsController.add()");
				repository.addInscription(inscriptionParameters.getActivity_id(),inscriptionParameters.getPerson_id());
			}
			list(response);
			
			
		} catch (Exception e) {
			e.printStackTrace();
			response.setStatus(400);
		}
		
	}
	public boolean validateInscription(Activity activity, int person_id) {
		System.out.println("InscriptionsController.validateInscription()");
		return repository.validateInscription(activity, person_id);
		
	}
	public void getAllInscriptionsForOnePerson(HttpServletRequest request, HttpServletResponse response) throws IOException {
		String pathInfoString=request.getPathInfo();
		String[] parts = pathInfoString.split("/");
		int id = Integer.parseInt(parts[2]);
		List<Inscription> listInscriptions = repository.getAllInscriptionsForOnePerson(id);
		jsonGenerate(response, listInscriptions);
	}

	public void list(HttpServletResponse response) throws IOException {
		List<Inscription> listInscriptions = repository.findAllInscriptions();
		jsonGenerate(response, listInscriptions);
	}

	public void deleteInscription(HttpServletRequest request) {
		int index = request.getPathInfo().lastIndexOf("/");
		String id = request.getPathInfo().substring(index + 1);
		int idIns = Integer.parseInt(id);
		repository.deleteInscriptionById(idIns);
		
	}
	

}