import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Event } from 'src/app/models/event.model';
import { EventService } from 'src/app/services/event.service';
import { Person } from 'src/app/models/person.models';
import { AuthenticationService } from 'src/app/services/authentication.service';


@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.scss']
})

export class EventListComponent implements OnInit {
  @Input()
  public events: Event[];
  public event: Event;
  public person: Person;
  @Input()
  public isManagement: boolean;
  public showCreateEventPopup: boolean;
  @Output() private delete = new EventEmitter<number>();
  @Output() private create = new EventEmitter<Event>();
  @Output() private getActivityList = new EventEmitter<number>();
  @Input() public activeEventId: number;

  constructor() {
    this.event = new Event();
   }

  ngOnInit() {

  }

  public onCreate(event: Event) {
    this.create.emit(event);
  }

  public getActivities(eventId: number) {
    this.getActivityList.emit(eventId);
  }

  public onDelete(id: number) {
    this.delete.emit(id);
  }

  public toggleShowCreateEventPopup() {
    this.showCreateEventPopup = !this.showCreateEventPopup;
  }
}
