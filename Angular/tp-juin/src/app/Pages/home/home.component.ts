import { Component, OnInit } from '@angular/core';
import { Event } from 'src/app/models/event.model';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public events: Event[];
  constructor(private eventService: EventService){ }

  ngOnInit() {
    this.initEventList();
  }

public initEventList() {
  this.eventService.getAllEvents().subscribe(event => {
    this.events = event;
    console.log('dans le initEventlist');
  });
}
}
