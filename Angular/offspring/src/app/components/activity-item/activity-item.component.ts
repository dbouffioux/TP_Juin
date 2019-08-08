import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Activity } from 'src/app/models/activity.model';
import { Person } from 'src/app/models/person.model';
import { AuthenticationsService } from 'src/app/services/authentications.service';
import {log} from 'util';

@Component({
  selector: 'app-activity-item',
  templateUrl: './activity-item.component.html',
  styleUrls: ['./activity-item.component.scss']
})
export class ActivityItemComponent implements OnInit {

  public person: Person;
  public isCreate: boolean;
  public isDeleted: boolean;
  public showConfirmDel: boolean;
  @Input() public events: Event[];
  @Input() public activity: Activity;
  @Input() public isManagement: boolean;
  @Input() public activities: Activity[];
  @Input() public showActivityPopup: boolean;
  @Input() public isParticipantValue: boolean;
  @Output() private showUpdateActivityPopup: boolean;
  @Output() private delete = new EventEmitter<Activity>();
  @Output() private refreshButton = new EventEmitter<void>();
  @Output() private hidePopUpEmitter = new EventEmitter<Activity>();
  @Output() private createInscription = new EventEmitter<Activity>();
  @Output() private updateActivityEmit = new EventEmitter<Activity>();
  @Output() private deleteTheInscription = new EventEmitter<number>();

  constructor(private authService: AuthenticationsService) {
    this.isManagement = false;
  }

  ngOnInit() {
    this.isManagement = false;
    this.person = this.authService.getPerson();
  }

  public createNewInscription(activity: Activity) {
    this.createInscription.emit(activity);
  }

  public deleteInscription() {
    this.deleteTheInscription.emit(this.activity.id);
  }
  public showConfirmDelete() {
    this.showConfirmDel = !this.showConfirmDel;
  }
  public deleteActivity() {
    this.showActivityPopup = false;
    this.delete.emit(this.activity);
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
