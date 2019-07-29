import { Component, OnInit } from '@angular/core';
import { Event } from 'src/app/models/event.model';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {

  public events: Event[];
  public event: Event;

  constructor(private eventService: EventService) {
    this.event = new Event();
   }

  ngOnInit() {
    this.eventService.getAllEvents().subscribe(event => this.events = event);
  }
  public onCreate(event: Event) {
    this.eventService.createEvent(event).subscribe(() => {
      console.log('OK');
    }, error => {
      console.log(error);
    });
  }

}