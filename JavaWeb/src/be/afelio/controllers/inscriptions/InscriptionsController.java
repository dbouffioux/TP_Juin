package be.afelio.controllers.inscriptions;

import java.io.IOException;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.fasterxml.jackson.databind.ObjectMapper;
import be.afelio.beans.Inscription;
import be.afelio.controllers.jsonGenerator;
import be.afelio.jsonParameters.InscriptionParameters;
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
			System.out.println("FrontController.doPost()");
			if (inscriptionParameters.getActivity_id() != null
					&& inscriptionParameters.getPerson_id() != null) {
				repository.addInscription(inscriptionParameters.getActivity_id(),inscriptionParameters.getPerson_id());
			}
			list(response);
			
			
		} catch (Exception e) {
			e.printStackTrace();
			response.setStatus(400);
		}
		
	}

	public void list(HttpServletResponse response) throws IOException {
		List<Inscription> listInscriptions = repository.findAllInscriptions();
		jsonGenerate(response, listInscriptions);
	}
}