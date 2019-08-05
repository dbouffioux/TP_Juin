import { Component, OnInit , Input, Output, EventEmitter} from '@angular/core';
import { Event } from 'src/app/models/event.model';
import { Person } from 'src/app/models/person.models';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { FormGroup, FormBuilder, Form, Validators} from '@angular/forms';

@Component({
  selector: 'app-event-form',
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.scss']
})

export class EventFormComponent implements OnInit {
  public eventForm: FormGroup;
  public person: Person;
  @Input()
  public event: Event;
  @Output()
  private create = new EventEmitter<Event>();
  @Output()
  private refresh = new EventEmitter<void>();
  @Input()
  private showCreateEventPopup: boolean;
  public eventForm: FormGroup;

  constructor(private authService: AuthenticationService, private fb: FormBuilder) {
    this.event = new Event();
    this.person = new Person();
    this.eventForm = this.fb.group({
      event_name: this.fb.control('', [Validators.required])
    });
   }

  ngOnInit() {
    this.person = this.authService.getPerson();
  }

  public createEvent(event: Event) {
    this.create.emit(this.event);
  }
  public hideEventFormPopup() {
    this.showCreateEventPopup = !this.showCreateEventPopup;
  }
}
