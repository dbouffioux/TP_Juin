import { Component, OnInit, Output, Input } from '@angular/core';
import { ActivitiesService } from 'src/app/services/activities.service';
import { Activity } from 'src/app/models/activity.model';
import { Person } from 'src/app/models/person.models';
import { EventService } from 'src/app/services/event.service';
import { Event } from 'src/app/models/event.model';
import { Inscription } from 'src/app/models/inscription.model';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { InscriptionService } from 'src/app/services/inscription.service';

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
    private authService: AuthenticationService,
    private inscriptionService: InscriptionService) {
      this.activity = new Activity();
  }

  ngOnInit() {
    this.person = this.authService.getPerson();
    this.initActivities();
    this.initEvents();
    this.initInscriptions();
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

  public initInscriptions(){
      this.inscriptionService.getAllInscriptionsForOnePerson(this.person.id).subscribe(inscription => {
          this.inscriptions = inscription,
          console.log(this.inscriptions);
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
      this.initEvents();
      this.initActivities();
    }, error => {
      console.log(error);
    });
  }

  public deleteEvent(eventId: number) {
    this.eventService.deleteEvent(eventId).subscribe(() => {
      this.isDeleted = true;
      this.initEvents();
    }, error => {
      console.log(error);
    });
  }
  public deleteActivity(activity: Activity) {
    console.log('deleteActivity avant Service ' + activity);

    this.activitiesService.deleteActivity(activity.id).subscribe(() => {
      this.initActivities();
      this.isDeleted = true;
      console.log('dans le deleteActivity');
    }, error => {
      console.log(error);
    });
  }

  public deleteInscription(inscription: Inscription) {
    this.inscriptionService.deleteInscription(inscription.id).subscribe(() => {
      console.log('OK');
      this.isDeleted = true;
      this.initInscriptions();
    }, error => {
      this.isDeleted = false;
      console.log(error);
    });
  }
}

