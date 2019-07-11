import {  OnInit, Component } from '@angular/core';
import { ActivitiesService } from 'src/app/services/activities.service';
import { Activity } from 'src/app/models/activity.model';
import { RouterLink, Router } from '@angular/router';
import { EventService } from 'src/app/services/event.service';
import { Event } from 'src/app/models/event.model';
import { Person } from 'src/app/models/person.models';
import { refreshDescendantViews } from '@angular/core/src/render3/instructions';

@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.scss']
})
export class ActivitiesComponent implements OnInit {

  public activities: Activity[];
  public activity: Activity ;
  public events: Event[];
  public event1: Event;
  public person: Person;
  public isDeleted: boolean;
  public isCreate: boolean;

  constructor(private router: Router, private activitiesService: ActivitiesService, private eventService: EventService) {
    this.activity = new Activity();
    this.event1 = new Event();
    this.person = JSON.parse(localStorage.getItem('Person'));
   }

  ngOnInit() {
    this.eventService.getEventByPersonId(this.person.id).subscribe(event => this.fillActivities(event));
  }

  private fillActivities(eventArray: Event[]) {
    console.log(eventArray);
    this.activities = new Array();
    for ( const event of eventArray) {
        this.activities = this.activities.concat(event.activities);
    }
  }
  public onCreate(event: Activity) {
    this.activitiesService.createActivity(event).subscribe(() => {
      console.log('OK');
      this.isCreate = true;
    }, error => {
      console.log(error);
    });
  }
  public deleteActivity(idActivity: number) {
    this.activitiesService.deleteActivity(idActivity).subscribe(() => {
      console.log('OK');
      this.eventService.getEventByPersonId(this.person.id).subscribe(event => this.fillActivities(event));
      this.isDeleted = true;

    }, error => {
      console.log(error);
    });
  }


}
