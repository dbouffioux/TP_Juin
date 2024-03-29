import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Activity } from 'src/app/models/activity.model';
import { Event } from 'src/app/models/event.model';
import { Person } from 'src/app/models/person.model';
import { AuthenticationsService } from 'src/app/services/authentications.service';

@Component({
  selector: 'app-activity-list',
  templateUrl: './activity-list.component.html',
  styleUrls: ['./activity-list.component.scss']
})

export class ActivityListComponent implements OnInit {

  public events: Event[];
  public event1: Event;
  public person: Person;
  public isDeleted: boolean;
  public isCreate: boolean;
  public showActivityPopup: boolean;

  @Input() public activities: Activity[];
  @Output() public activity: Activity;
  @Output() private delete = new EventEmitter<Activity>();
  @Output() private showActivityItem = new EventEmitter<Activity>();

  constructor(
    private authService: AuthenticationsService) {
    this.activity = new Activity();
    this.event1 = new Event();
    this.person = this.authService.getPerson();
  }

  ngOnInit() {
    this.showActivityPopup = false;
  }

  public deleteActivity(activity: Activity) {
    this.delete.emit(activity);
  }

  public toggleActivityPopup(activity: Activity) {
    this.activity = activity;
    this.showActivityItem.emit(this.activity);
  }
}

