import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Activity } from 'src/app/models/activity.model';
import { Event } from 'src/app/models/event.model';
import { Person } from 'src/app/models/person.models';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-activity-list',
  templateUrl: './activity-list.component.html',
  styleUrls: ['./activity-list.component.scss']
})

export class ActivityListComponent implements OnInit {

  @Input()
  public activities: Activity[];
  public activity: Activity ;
  public events: Event[];
  public event1: Event;
  public person: Person;
  public isDeleted: boolean;
  public isCreate: boolean;
  public showActivityPopup: boolean;
  @Output()
  private delete = new EventEmitter<Activity>();
  @Output()
  private showActivityItem = new EventEmitter<Activity>();

  constructor(
    private authService: AuthenticationService) {
    this.activity = new Activity();
    this.event1 = new Event();
    this.person = this.authService.getPerson();
  }

  ngOnInit() {
    this.showActivityPopup = false;
  }

  public deleteActivity(activity: Activity){
    console.log('deleteActivity ' + activity.id);
    this.delete.emit(activity);
  }

  public toggleActivityPopup(activity: Activity) {
    this.showActivityItem.emit(activity);
  }
}

/*   public updateActivity(idActivity: number) {
    this.activitiesService.deleteActivity(idActivity).subscribe(() => {
      this.eventService.getEventByPersonId(this.person.id).subscribe(event => this.fillActivities(event));
      this.isDeleted = true;
    }, error => {
      console.log(error);
    });
  } */

  /*   private fillActivities(eventArray: Event[]) {
    if (eventArray !== null) {
      this.activities = new Array();
      for ( const event of eventArray) {
          this.activities = this.activities.concat(event.activities);
      }
    }
  } */
