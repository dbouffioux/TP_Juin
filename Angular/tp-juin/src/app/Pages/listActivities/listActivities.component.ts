import { Component, OnInit } from '@angular/core';
import { ActivitiesService } from 'src/app/services/activities.service';
import { Activity } from 'src/app/models/activity.model';
import { Event } from 'src/app/models/event.model';
import { Person } from 'src/app/models/person.models';

@Component({
  selector: 'app-list-activities',
  templateUrl: './listActivities.component.html',
  styleUrls: ['./listActivities.component.css']
})
export class ListActivitiesComponent implements OnInit {

  public activities: Activity[];
  public activity: Activity ;
  public events: Event[];
  public event: Event;
  public person: Person;

  constructor(private activitiesService: ActivitiesService) {
   this.activity = new Activity();
   this.event = new Event();
  }

  ngOnInit() {
    this.person = JSON.parse(localStorage.getItem('Person'));
    this.initActivities();
  }

  public initActivities() {
  this.activitiesService.getActivitiesByPerson(this.person)
  .subscribe(activities => this.activities = activities);
  console.log('dans le init activities');

}

  public onCreate(activity: Activity) {
    this.activity.event_name = this.activities[0].event_name;
    this.activitiesService.createActivity(activity).subscribe(() => {
      console.log('OK');
      this.initActivities();
    }, error => {
      console.log(error);
    });
  }
}
