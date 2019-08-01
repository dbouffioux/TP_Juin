import { Component, OnInit , Input, Output, EventEmitter} from '@angular/core';
import { Event } from 'src/app/models/event.model';
import { Person } from 'src/app/models/person.models';

@Component({
  selector: 'app-event-form',
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.css']
})

export class EventFormComponent implements OnInit {
  public person: Person;
  @Input()
  public event: Event;
  @Output()
  private create = new EventEmitter<Event>();
  @Output()
  private refresh = new EventEmitter<void>();

  constructor() {
    this.event = new Event();
    this.person = new Person();
   }

  ngOnInit() {
    this.person = JSON.parse(localStorage.getItem('Person'));
  }

  public createEvent() {
    this.create.emit(this.event);
    this.refresh.emit();
  }
}


