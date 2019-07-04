import { Component, OnInit , Input, Output, EventEmitter} from '@angular/core';
import { Event } from 'src/app/models/event.model';

@Component({
  selector: 'app-event-form',
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.css']
})
export class EventFormComponent implements OnInit {

  @Input()
  public event: Event;
  @Output()
  private create = new EventEmitter<Event>();

  constructor() {
    this.event = new Event();
   }

  ngOnInit() {
  }
  public createEvent() {
    console.log(this.event);
    this.create.emit(this.event);
  }
}


