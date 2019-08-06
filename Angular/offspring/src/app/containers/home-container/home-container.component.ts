import { Component, OnInit } from '@angular/core';
import { Event } from 'src/app/models/event.model';
import { EventsService } from 'src/app/services/events.service';
import { Activity } from 'src/app/models/activity.model';
import { Inscription } from 'src/app/models/inscription.model';
import { InscriptionsService } from 'src/app/services/inscriptions.service';
import { ActivitiesService } from 'src/app/services/activities.service';
import { AuthenticationsService } from 'src/app/services/authentications.service';
import { Person } from 'src/app/models/person.model';

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
    private eventService: EventsService,
    private inscriptionService: InscriptionsService,
    private activityService: ActivitiesService,
    private authService: AuthenticationsService) {
    this.activities = [];
    this.showActivityPopup = false;
    this.activeEvent = 0;
    this.person = this.authService.getPerson();
    this.inscription = new Inscription();
  }

  ngOnInit() {
    this.initEventList();
    this.person = this.authService.getPerson();
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
    this.inscription.activityId = activityId;
    this.inscription.personId = this.person.id;

    this.inscriptionService.createInscription(this.inscription).subscribe(() => {
      this.isParticipantValue = true;
    }
    );
  }

  public toggleActivityItem(activity: Activity) {
    this.showActivityPopup = !this.showActivityPopup;
    this.activityToShow = activity;
    this.isParticipantValue = false;
    this.isParticipant(activity);
  }

  public deleteInscription(activityId: number) {
    this.inscriptionService.getAllInscriptionsForOnePerson(this.person.id).subscribe(
      inscriptions => {
        const inscription = inscriptions.find(inscription1 => {
          return inscription1.activity.id === activityId;
        });
        this.inscriptionID = inscription.id;
        this.inscriptionService.deleteInscription(this.inscriptionID).subscribe(() => {
          this.isParticipantValue = false;
        }, error => {
          console.log(error);
        });
      }
    );
  }

  public isParticipant(activity: Activity) {
    if (this.person.id !== null) {
      const inscription = activity.inscriptions.find((participant) => {
        return participant.personId === this.person.id;
      });
      this.isParticipantValue = inscription.personId === this.person.id;
    }
  }
}
