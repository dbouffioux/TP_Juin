import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Activity } from 'src/app/models/activity.model';
import { Event } from 'src/app/models/event.model';
import { Person } from 'src/app/models/person.models';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Inscription } from 'src/app/models/inscription.model';

@Component({
  selector: 'app-activity-item',
  templateUrl: './activity-item.component.html',
  styleUrls: ['./activity-item.component.scss']
})
export class ActivityItemComponent implements OnInit {

  public event: Event;
  public person: Person;
  public events: Event[];
  public isDeleted: boolean;
  public isCreate: boolean;
  @Input() public isManagement: boolean;

  @Input() public isParticipantValue: boolean;
  @Input() public activity: Activity;
  @Input() public activities: Activity[];
  @Input() public showActivityPopup: boolean;
  @Output() private delete = new EventEmitter<Activity>();
  @Output() private refreshButton = new EventEmitter<void>();
  @Output() public createInscription = new EventEmitter<number>();
  @Output() public deleteTheInscription = new EventEmitter<number>();



  constructor(private authService: AuthenticationService) {
    this.isManagement = false;
    this.event = new Event();
    this.person = this.authService.getPerson();
  }

  ngOnInit() {
    this.isManagement = false;
    if (this.getPerson()) {
      this.person = JSON.parse(localStorage.getItem('Person'));
    } else {
      this.person = null;
    }
  }

  public createNewInscription(event: Event) {

    // this.createInscription.emit(inscription);
    // if (event) {
    //   this.inscription.person_id = this.person.id;
    //   this.inscription.activity_id = this.activity.id;
    // }
    if (event) {
      console.log(event);
      this.createInscription.emit(this.activity.id);
    }
  }
  public deleteInscription(event: Event) {
    console.log('deleteInscription');
    this.deleteTheInscription.emit(this.activity.id);
  }

  public deleteActivity(activity: Activity) {
    this.delete.emit(activity);
    this.refreshButton.emit();
  }

  public hidePopup() {
    this.showActivityPopup = false;
  }

  public isLogged(): boolean {
    return this.authService.isLogged();
  }

  public getPerson(): boolean {
    if (localStorage.getItem('Person') !== '') {
      return true;
    } else {
      return false;
    }
  }
}
