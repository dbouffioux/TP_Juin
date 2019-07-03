import { Component, OnInit , Input, Output, EventEmitter} from '@angular/core';
import { Event } from '@angular/router';

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
  constructor() { }

  ngOnInit() {
  }
  public createEvent() {
    console.log(this.event);
    this.create.emit(this.event);
  }
}


