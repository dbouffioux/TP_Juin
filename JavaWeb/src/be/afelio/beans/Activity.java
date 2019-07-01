package be.afelio.beans;

public class Activity {

	protected Integer id;
	protected String name;
	protected String begin;
	protected String finish;
	protected String url;
	protected String description;
	protected Integer event_id;
	
	
	public Activity(Integer id, String name, String begin, String finish, String url, String description,
			Integer event_id) {
		super();
		this.id = id;
		this.name = name;
		this.begin = begin;
		this.finish = finish;
		this.url = url;
		this.description = description;
		this.event_id = event_id;
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
	public Integer getEvent_id() {
		return event_id;
	}
	public void setEvent_id(Integer event_id) {
		this.event_id = event_id;
	}

	

	
	
}
