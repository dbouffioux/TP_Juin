import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Activity } from 'src/app/models/activity.model';
import { Event } from 'src/app/models/event.model';
import { Person } from 'src/app/models/person.models';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-activity-item',
  templateUrl: './activity-item.component.html',
  styleUrls: ['./activity-item.component.scss']
})
export class ActivityItemComponent implements OnInit {

  @Input()
  public activities: Activity[];
  @Input()
  public activity: Activity ;
  public events: Event[];
  public event: Event;
  public person: Person;
  public isDeleted: boolean;
  public isCreate: boolean;
  @Output()
  private delete = new EventEmitter<Activity>();
  @Input()
  public showActivityPopup: boolean;
  @Input()
  public canManage: boolean;

  constructor(
    private authService: AuthenticationService) {
    this.event = new Event();
    this.person = this.authService.getPerson();
  }

  ngOnInit() {
  }

  public deleteActivity(activity: Activity){
    this.delete.emit(activity);
  }

  public hidePopup() {
    this.showActivityPopup = false;
  }

  public isLogged(): boolean {
    return this.authService.isLogged();
  }
}
