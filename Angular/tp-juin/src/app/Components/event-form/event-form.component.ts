import { Component, OnInit , Input, Output, EventEmitter} from '@angular/core';
import { Event } from 'src/app/models/event.model';
import { Person } from 'src/app/models/person.models';
import { AuthenticationService } from 'src/app/services/authentication.service';

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
  @Input()
  private showCreateEventPopup: boolean;

  constructor(private authService: AuthenticationService) {
    this.event = new Event();
    this.person = new Person();
   }

  ngOnInit() {
    this.person = this.authService.getPerson();
  }

  public createEvent() {
    this.create.emit(this.event);
    this.refresh.emit();

  }
}


