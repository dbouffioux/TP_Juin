import { Component, OnInit } from '@angular/core';
import { Event } from 'src/app/models/event.model';
import { EventService } from 'src/app/services/event.service';
import { Activity } from 'src/app/models/activity.model';

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
  constructor(private eventService: EventService) {
    this.activities = [];
    this.showActivityPopup = false;
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
  }

  public toggleActivityItem(activity: Activity) {
    console.log(activity.id);
    this.showActivityPopup = !this.showActivityPopup;
    this.activityToShow = activity;
  }

}
