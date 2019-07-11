import { Component, OnInit } from '@angular/core';
import { ActivitiesService } from 'src/app/services/activities.service';
import { Activity } from 'src/app/models/activity.model';
import { Person } from 'src/app/models/person.models';
import { EventService } from 'src/app/services/event.service';
import { Event } from 'src/app/models/event.model';
import { Inscription } from 'src/app/models/inscription.model';
import { InscriptionService } from 'src/app/services/inscription.service';
import { PersonService } from 'src/app/services/person.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  public activities: Activity[];
  public activity: Activity;
  public person: Person;
  public persons: Person[];
  public events: Event[];
  public inscriptions: Inscription[];

  constructor(private activitiesService: ActivitiesService,
              private eventService: EventService,
              private personService: PersonService,
              private inscriptionService: InscriptionService,
              private router: Router) {
    this.activity = new Activity();
  }

  ngOnInit() {
    this.person = JSON.parse(localStorage.getItem('Person'));
    console.log(this.person);
    // Extract service calls in other fonction tu be reusable
    this.activitiesService.getActivitiesByPerson(this.person)
      .subscribe(activities => this.activities = activities);
    this.eventService.getEventByPersonId(this.person.id)
      .subscribe(events => {this.events = events;
                            console.log(this.events);
      });
  }
  public onCreateActivity(activity: Activity, event: Event) {
    this.activitiesService.createActivity(activity).subscribe(() => {
      console.log('dans le oncreateActivity de subscribe');
      this.refreshActivities();
    }, error => {
      console.log(error);
    });
  }
  public onCreateEvent(event: Event) {
    this.eventService.createEvent(event).subscribe(() => {
      console.log('OK');
    }, error => {
      console.log(error);
    });
  }
  public refreshActivities() {
  this.activitiesService.getActivitiesByPerson(this.person)
      .subscribe(activities => this.activities = activities);
  this.eventService.getEventByPersonId(this.person.id)
      .subscribe(events => {this.events = events;
                            console.log(this.events);
      });
 }

  public deleteProfile() {
    this.person = JSON.parse(localStorage.getItem('Person'));
    console.log(this.person);

    this.personService.deleteProfile(this.person.id).subscribe(() => {
      console.log('OK');
    }, error => {
      console.log(error);
    });
  }
}
