import { Component, OnInit } from '@angular/core';
import { Event } from 'src/app/models/event.model';
import { EventService } from 'src/app/services/event.service';
import { Activity } from 'src/app/models/activity.model';
import { Inscription } from 'src/app/models/inscription.model';
import { InscriptionService } from 'src/app/services/inscription.service';
import { ActivitiesService } from 'src/app/services/activities.service';

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

  constructor(
    private eventService: EventService,
    private inscriptionService: InscriptionService,
    private activityService: ActivitiesService) {
    this.activities = [];
    this.showActivityPopup = false;
    this.activeEvent = 0;
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
  public createInscription(inscription: Inscription) {
    console.log('createInscription');

    this.inscriptionService.createInscription(inscription).subscribe(() => {
      console.log('ok');
      this.refreshActivity(inscription.activity_id);
    }
    );
  }

  public toggleActivityItem(activity: Activity) {
    console.log(activity.id);
    this.showActivityPopup = !this.showActivityPopup;
    this.activityToShow = activity;
  }
  public refreshActivity(activityId: number) {
    this.activityService.getOneActivtyById(activityId).subscribe(activity => {
      this.activity = activity;
    });
  }

}
