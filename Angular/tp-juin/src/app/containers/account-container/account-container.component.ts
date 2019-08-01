import { Component, OnInit, Output, Input } from '@angular/core';
import { ActivitiesService } from 'src/app/services/activities.service';
import { Activity } from 'src/app/models/activity.model';
import { Person } from 'src/app/models/person.models';
import { EventService } from 'src/app/services/event.service';
import { Event } from 'src/app/models/event.model';
import { Inscription } from 'src/app/models/inscription.model';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-account-container',
  templateUrl: './account-container.component.html',
  styleUrls: ['./account-container.component.css']
})

export class AccountContainerComponent implements OnInit {

  public activities: Activity[];
  public activity: Activity;
  public person: Person;
  public persons: Person[];
  public event: Event;
  public events: Event[];
  public inscriptions: Inscription[];
  public isDeleted: boolean;

  constructor(
    private activitiesService: ActivitiesService,
    private eventService: EventService,
    private authService: AuthenticationService) {
      this.activity = new Activity();
  }

  ngOnInit() {
    this.person = this.authService.getPerson();
    this.initActivities();
    this.initEvents();
  }

  public initActivities() {
    this.activitiesService.getAllActivitiesToManage(this.person.id)
      .subscribe(activities => {
        this.activities = activities;
      });
    }

  public initEvents() {
    this.eventService.getEventByPersonId(this.person.id)
    .subscribe(events => {
      this.events = events;
    });
  }

  public createActivity(activity: Activity) {
   this.activitiesService.createActivity(activity).subscribe(() => {
      console.log('dans le oncreateActivity');
      this.initActivities();

    }, error => {
      console.log(error);
    });
  }

  public createEvent(event: Event) {
    this.eventService.createEvent(event).subscribe(() => {
      console.log('OK');
      this.initEvents();
    }, error => {
      console.log(error);
    });
  }

  public deleteEvent(event: Event) {
    console.log(event.id);
    this.eventService.deleteEvent(event.id).subscribe(() => {
      this.isDeleted = true;
      this.initEvents();
    }, error => {
      console.log(error);
    });
  }
}

