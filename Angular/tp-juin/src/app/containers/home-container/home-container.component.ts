import { Component, OnInit } from '@angular/core';
import { Event } from 'src/app/models/event.model';
import { EventService } from 'src/app/services/event.service';
import { Activity } from 'src/app/models/activity.model';
import { Inscription } from 'src/app/models/inscription.model';
import { InscriptionService } from 'src/app/services/inscription.service';
import { ActivitiesService } from 'src/app/services/activities.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Person } from 'src/app/models/person.models';

@Component({
  selector: 'app-home-container',
  templateUrl: './home-container.component.html',
  styleUrls: ['./home-container.component.scss']
})

export class HomeContainerComponent implements OnInit {

  public events: Event[];
  public activities: Activity[];
  public showActivityPopup: boolean;
  public activityToShow: Activity;
  public activeEvent: number;
  public activity: Activity;
  public inscription: Inscription;
  public person: Person;
  public inscriptionID: number;
  public isParticipantValue: boolean;

  constructor(
    private eventService: EventService,
    private inscriptionService: InscriptionService,
    private activityService: ActivitiesService,
    private authService: AuthenticationService) {
    this.activities = [];
    this.showActivityPopup = false;
    this.activeEvent = 0;
    this.person = this.authService.getPerson();
    this.inscription = new Inscription();
  }

  ngOnInit() {
    this.initEventList();
  }

  public initEventList() {
    this.eventService.getAllEvents().subscribe(event => {
      this.events = event;
    });
  }

  public initActivitiesList(eventId: number) {
    this.activities = [];
    this.eventService.getEventWithAllActivitiesById(eventId).subscribe(event => {
      event.activities.map(activity => {
        this.activities.push(activity);
      });
    });
    this.activeEvent = eventId;
  }
  public createInscription(activityId: number) {
    console.log('createInscription');
    this.inscription.activity_id = activityId;
    this.inscription.person_id = this.person.id;

    this.inscriptionService.createInscription(this.inscription).subscribe(() => {
      console.log('ok');
      this.isParticipantValue = true;
    }
    );
  }

  public toggleActivityItem(activity: Activity) {
    console.log(activity.id);
    this.showActivityPopup = !this.showActivityPopup;
    this.activityToShow = activity;
    this.isParticipantValue = false;
    this.isParticipant(activity);
  }

  public deleteInscription(activityId: number) {
    console.log('delete');
    this.inscriptionService.getAllInscriptionsForOnePerson(this.person.id).subscribe(
        inscriptions => {
          const inscription = inscriptions.find(inscription1 => {
            return inscription1.activity.id === activityId;
          });
          this.inscriptionID = inscription.id;
          console.log(this.inscriptionID);
          this.inscriptionService.deleteInscription(this.inscriptionID).subscribe(() => {
            console.log('OK');
            this.isParticipantValue = false;
          }, error => {
            console.log(error);
          });
        }
      );
  }
    public isParticipant(activity: Activity) {
    const inscription = activity.inscriptions.find((participant) => {
      console.log(participant.person_id);
      return participant.person_id === this.person.id;
    });
    if (inscription.person_id === this.person.id) {
      this.isParticipantValue = true;
    } else {
      this.isParticipantValue = false;
    }
  }
}
