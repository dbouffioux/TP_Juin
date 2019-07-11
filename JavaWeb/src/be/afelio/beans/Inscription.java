package be.afelio.beans;

public class Inscription {

	protected Integer id;
	protected Activity activity;
	protected Integer person_id;
	protected Integer activity_id;
	
	public Integer getActivity_id() {
		return activity_id;
	}
	public void setActivity_id(Integer activity_id) {
		this.activity_id = activity_id;
	}
	public Inscription(Integer id, Activity activity, Integer person_id) {
		super();
		this.id = id;
		this.activity = activity;
		this.person_id = person_id;
	}
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public Activity getActivity() {
		return activity;
	}
	public void setActivity(Activity activity) {
		this.activity = activity;
	}
	public Integer getPerson_id() {
		return person_id;
	}
	public void setPerson_id(Integer person_id) {
		this.person_id = person_id;
	}

	
	
}
