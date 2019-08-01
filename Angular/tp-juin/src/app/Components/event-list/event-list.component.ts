import { Component, OnInit, Input} from '@angular/core';
import { Event } from 'src/app/models/event.model';
import { EventService } from 'src/app/services/event.service';
import { Input } from '@angular/core';


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
  }
}
