import { Component, OnInit, Input } from '@angular/core';
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

  constructor() {
    this.event = new Event();
   }

  ngOnInit() {
    this.person = this.authService.getPerson();
    this.initEvents();
  }

  public initEvents() {
    if (this.isManagement) {
      this.eventService.getEventByPersonId(this.person.id)
      .subscribe(events => {
        this.events = events;
      });
    } else {
      this.eventService.getAllEvents().subscribe(
        events => this.events = events
      );
    }
    this.eventService.getAllEvents().subscribe(event => this.events = event);
  }

  public onCreate(event: Event) {
    if (this.isManagement) {
      this.eventService.createEvent(event).subscribe(() => {
        this.initEvents();
      }, error => {
        console.log(error);
      });
    }
  }

  public onDelete(event: Event) {
    if (this.isManagement) {
      this.eventService.deleteEvent(event.id).subscribe(() => {
        this.initEvents();
      }, error => {
        console.log(error);
      });
    }
  }

  public toggleShowCreateEventPopup() {
    this.showCreateEventPopup = !this.showCreateEventPopup;
  }
}
