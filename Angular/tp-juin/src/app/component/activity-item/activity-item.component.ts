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

  @Input()
  public activities: Activity[];
  @Input()
  public activity: Activity ;
  @Output()
  public inscription: Inscription;
  public events: Event[];
  public event: Event;
  public person: Person;
  public isDeleted: boolean;
  public isCreate: boolean;
  @Output()
  private delete = new EventEmitter<Activity>();
  @Input()
  public showActivityPopup: boolean;
  @Output()
  private refreshButton = new EventEmitter<void>();
  @Output() private createInscription = new EventEmitter<Inscription>();


  constructor(private authService: AuthenticationService) {
    this.event = new Event();
    this.person = this.authService.getPerson();
  }

  ngOnInit() {
  }

  public createNewInscription(inscription: Inscription){
    console.log(inscription);
    this.createInscription.emit(inscription);
  }

  public deleteActivity(activity: Activity){
    this.delete.emit(activity);
    this.refreshButton.emit();
  }

  public hidePopup() {
    this.showActivityPopup = false;
  }

  public isLogged(): boolean {
    return this.authService.isLogged();
  }
}
