package be.afelio.beans;

public class Inscription {

	protected Integer id;
	protected Activity activity;
	protected Integer personId;
	protected Integer activityId;
	
	public Integer getActivityId() {
		return activityId;
	}
	public void setActivityId(Integer activityId) {
		this.activityId = activityId;
	}
	public Inscription(Integer id, Activity activity, Integer personId, Integer activityId) {
		super();
		this.id = id;
		this.activity = activity;
		this.personId = personId;
		this.activityId = activityId;
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
	/**
	 * @return the personId
	 */
	public Integer getPersonId() {
		return personId;
	}
	/**
	 * @param personId the personId to set
	 */
	public void setPersonId(Integer personId) {
		this.personId = personId;
	}

	
	
}
