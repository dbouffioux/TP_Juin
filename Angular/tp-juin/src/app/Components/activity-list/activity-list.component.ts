import {  OnInit, Component, Input } from '@angular/core';
import { ActivitiesService } from 'src/app/services/activities.service';
import { Activity } from 'src/app/models/activity.model';
import { EventService } from 'src/app/services/event.service';
import { Event } from 'src/app/models/event.model';
import { Person } from 'src/app/models/person.models';

@Component({
  selector: 'app-activity-list',
  templateUrl: './activity-list.component.html',
  styleUrls: ['./activity-list.component.css']
})

export class ActivityListComponent implements OnInit {

  @Input()
  public activities: Activity[];
  public activity: Activity ;
  public events: Event[];
  public event1: Event;
  public person: Person;
  public isDeleted: boolean;
  public isCreate: boolean;

  constructor(private activitiesService: ActivitiesService, private eventService: EventService) {
    this.activity = new Activity();
    this.event1 = new Event();
    this.person = JSON.parse(localStorage.getItem('Person'));
  }

  ngOnInit() {
    // this.eventService.getEventByPersonId(this.person.id).subscribe(event => this.fillActivities(event));
  }

  private fillActivities(eventArray: Event[]) {
    if (eventArray !== null) {
      this.activities = new Array();
      for ( const event of eventArray) {
          this.activities = this.activities.concat(event.activities);
      }
    }
  }

  public onCreate(acvitity: Activity) {
    this.activitiesService.createActivity(acvitity).subscribe(() => {
      this.eventService.getEventByPersonId(this.person.id).subscribe(event => this.fillActivities(event));
      this.isCreate = true;
    }, error => {
      console.log(error);
    });
  }

  public deleteActivity(idActivity: number) {
    this.activitiesService.deleteActivity(idActivity).subscribe(() => {
      this.eventService.getEventByPersonId(this.person.id).subscribe(event => this.fillActivities(event));
      this.isDeleted = true;

    }, error => {
      console.log(error);
    });
  }

  public updateActivity(idActivity: number) {
    this.activitiesService.deleteActivity(idActivity).subscribe(() => {
      this.eventService.getEventByPersonId(this.person.id).subscribe(event => this.fillActivities(event));
      this.isDeleted = true;
    }, error => {
      console.log(error);
    });
  }
}
