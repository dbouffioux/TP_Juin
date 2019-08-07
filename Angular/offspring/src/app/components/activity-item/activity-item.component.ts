import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Activity } from 'src/app/models/activity.model';
import { Event } from 'src/app/models/event.model';
import { Person } from 'src/app/models/person.model';
import { AuthenticationsService } from 'src/app/services/authentications.service';

@Component({
  selector: 'app-activity-item',
  templateUrl: './activity-item.component.html',
  styleUrls: ['./activity-item.component.scss']
})
export class ActivityItemComponent implements OnInit {

  public person: Person;
  public isDeleted: boolean;
  public isCreate: boolean;

  @Input() public isManagement: boolean;
  @Input() public isParticipantValue: boolean;
  @Input() public activity: Activity;
  @Input() public activities: Activity[];
  @Input() public showActivityPopup: boolean;
  @Output() private showUpdateActivityPopup: boolean;
  @Output() private delete = new EventEmitter<Activity>();
  @Output() private refreshButton = new EventEmitter<void>();
  @Output() private createInscription = new EventEmitter<number>();
  @Output() private hidePopUpEmitter = new EventEmitter<Activity>();
  @Output() private updateActivityEmit = new EventEmitter<Activity>();
  @Output() private deleteTheInscription = new EventEmitter<number>();

  constructor(private authService: AuthenticationsService) {
    this.isManagement = false;
  }

  ngOnInit() {
    this.isManagement = false;
    this.person = this.authService.getPerson();
  }

  public createNewInscription() {
    this.createInscription.emit(this.activity.id);
  }

  public deleteInscription() {
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

  public updateActivity(activity: Activity) {
    this.updateActivityEmit.emit(activity);
  }

  public isLogged(): boolean {
    return this.authService.isLogged();
  }

  toggleUpdateActivityPopup() {
    this.showUpdateActivityPopup = !this.showUpdateActivityPopup;
  }

}
