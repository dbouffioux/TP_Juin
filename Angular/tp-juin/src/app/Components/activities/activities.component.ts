import {  OnInit, Component } from '@angular/core';
import { ActivitiesService } from 'src/app/services/activities.service';
import { Activity } from 'src/app/models/activity.model';
import { RouterLink } from '@angular/router';
import { EventService } from 'src/app/services/event.service';
import { Event } from 'src/app/models/event.model';

@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.scss']
})
export class ActivitiesComponent implements OnInit {

  public activities: Activity[];
  public activity: Activity ;
  public events: Event[];
  public event: Event;


  constructor(private activitiesServices: ActivitiesService, private eventService: EventService) {
    this.activity = new Activity();
    this.event = new Event();
   }

  ngOnInit() {
    this.activitiesServices.getActivities().subscribe(activities => this.activities = activities);
    this.eventService.getAllEvents().subscribe(event => this.events = event);
  }
  public onCreate(event: Activity) {
    this.activitiesServices.createActivity(event).subscribe(() => {
      console.log('OK');
    }, error => {
      console.log(error);
    });
  }



}
