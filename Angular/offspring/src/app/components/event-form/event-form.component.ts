import { Component, OnInit , Input, Output, EventEmitter} from '@angular/core';
import { Event } from 'src/app/models/event.model';
import { Person } from 'src/app/models/person.model';
import { AuthenticationsService } from 'src/app/services/authentications.service';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'app-event-form',
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.scss']
})

export class EventFormComponent implements OnInit {
  public eventForm: FormGroup;
  public person: Person;
  @Input() private showCreateEventPopup: boolean;
  @Output() private refresh = new EventEmitter<void>();
  @Output() private createEmitter = new EventEmitter<Event>();

  constructor(private authService: AuthenticationsService, private fb: FormBuilder) {
    this.person = new Person();
    this.eventForm = this.fb.group({
      eventName: this.fb.control('', [Validators.required]),
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
    event.name = val.eventName;
    event.begin = val.begin;
    event.finish = val.finish;
    this.createEmitter.emit(event);
    console.log('ok createEvent', event);
  }
  public hideEventFormPopup() {
    this.showCreateEventPopup = !this.showCreateEventPopup;
  }
}
