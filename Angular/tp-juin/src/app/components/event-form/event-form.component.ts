import { Component, OnInit , Input, Output, EventEmitter} from '@angular/core';
import { Event } from 'src/app/models/event.model';
import { Person } from 'src/app/models/person.models';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'app-event-form',
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.scss']
})

export class EventFormComponent implements OnInit {
  public eventForm: FormGroup;
  public person: Person;
  @Output()
  private createEmitter = new EventEmitter<Event>();
  @Output()
  private refresh = new EventEmitter<void>();
  @Input()
  private showCreateEventPopup: boolean;

  constructor(private authService: AuthenticationService, private fb: FormBuilder) {
    this.person = new Person();
    this.eventForm = this.fb.group({
      event_name: this.fb.control('', [Validators.required]),
      begin : this.fb.control('', [Validators.required]),
      finish : this.fb.control('', [Validators.required])
    });
   }

  ngOnInit() {
    this.person = this.authService.getPerson();
  }

  public createEvent() {
    const val = this.eventForm.value;
    const event = new Event();
    event.name = val.event_name;
    event.begin = val.begin;
    event.finish = val.finish;
    this.createEmitter.emit(event);
    console.log('ok createEvent', event);
  }
  public hideEventFormPopup() {
    this.showCreateEventPopup = !this.showCreateEventPopup;
  }
}
