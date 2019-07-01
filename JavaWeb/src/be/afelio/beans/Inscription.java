package be.afelio.beans;

public class Inscription {

	protected Integer id;
	protected Integer activity_id;
	protected Integer person_id;
	
	public Inscription(Integer id, Integer activity_id, Integer person_id) {
		super();
		this.id = id;
		this.activity_id = activity_id;
		this.person_id = person_id;
	}
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public Integer getActivity_id() {
		return activity_id;
	}
	public void setActivity_id(Integer activity_id) {
		this.activity_id = activity_id;
	}
	public Integer getPerson_id() {
		return person_id;
	}
	public void setPerson_id(Integer person_id) {
		this.person_id = person_id;
	}
	
	
	
}
