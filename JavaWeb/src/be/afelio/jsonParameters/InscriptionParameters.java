package be.afelio.jsonParameters;


import be.afelio.beans.Activity;

public class InscriptionParameters {

	protected Integer activityId;
	protected Integer personId;
	protected Activity activity;
	
	
	
	public Integer getActivityId() {
		return activityId;
	}
	public void setActivityId(Integer activityId) {
		this.activityId = activityId;
	}
	public Integer getPersonId() {
		return personId;
	}
	public void setPersonId(Integer personId) {
		this.personId = personId;
	}
	public Activity getActivity() {
		return activity;
	}
	public void setActivity(Activity activity) {
		this.activity = activity;
	}
}
