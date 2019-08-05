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
  @Output() private createInscription = new EventEmitter<number>();
  @Output() private deleteTheInscription = new EventEmitter<number>();
  @Output() public hidePopUpEmitter = new EventEmitter<Activity>();

  constructor(private authService: AuthenticationService) {
    this.isManagement = false;
    this.event = new Event();
  }

  ngOnInit() {
    this.isManagement = false;
    this.person = this.authService.getPerson();
  }

  public createNewInscription(event: Event) {
    if (event) {
      this.createInscription.emit(this.activity.id);
    }
  }
  public deleteInscription(event: Event) {
    this.deleteTheInscription.emit(this.activity.id);
  }

  public deleteActivity(activity: Activity) {
    this.showActivityPopup = false;
    this.delete.emit(activity);
    this.refreshButton.emit();
  }

  public hidePopup() {
    this.showActivityPopup = false;
    this.hidePopUpEmitter.emit(this.activity);
  }

  public isLogged(): boolean {
    return this.authService.isLogged();
  }
}
