import { Component, OnInit } from '@angular/core';
import { Event } from 'src/app/models/event.model';
import { EventService } from 'src/app/services/event.service';


@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.scss']
})

export class EventListComponent implements OnInit {

  public events: Event[];
  public event: Event;
  public person: Person;
  @Input()
  public isManagement: boolean;
  public showCreateEventPopup: boolean;

  constructor(
    private eventService: EventService,
    private authService: AuthenticationService) {
      this.event = new Event();
      this.showCreateEventPopup = false;
  }

  ngOnInit() {
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
