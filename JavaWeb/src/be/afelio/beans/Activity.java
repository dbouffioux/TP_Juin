package be.afelio.beans;

public class Activity {

	protected Integer id;
	protected String name;
	protected String begin;
	protected String finish;
	protected String url;
	protected String description;
	protected String event_name;
	
	
	public String getEvent_name() {
		return event_name;
	}
	public void setEvent_name(String event_name) {
		this.event_name = event_name;
	}
	public Activity(Integer id, String name, String begin, String finish, String url, String description,
			String event_name) {
		super();
		this.id = id;
		this.name = name;
		this.begin = begin;
		this.finish = finish;
		this.url = url;
		this.description = description;
		this.event_name = event_name;
	}
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getBegin() {
		return begin;
	}
	public void setBegin(String begin) {
		this.begin = begin;
	}
	public String getFinish() {
		return finish;
	}
	public void setFinish(String finish) {
		this.finish = finish;
	}
	public String getUrl() {
		return url;
	}
	public void setUrl(String url) {
		this.url = url;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}


	

	
	
}
