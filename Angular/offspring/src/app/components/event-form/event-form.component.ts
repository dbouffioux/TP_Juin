import { Component, OnInit , Input, Output, EventEmitter, OnChanges, SimpleChange} from '@angular/core';
import { Event } from 'src/app/models/event.model';
import { Person } from 'src/app/models/person.model';
import { AuthenticationsService } from 'src/app/services/authentications.service';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { ValidationService } from '../../utils/validation.service';

@Component({
  selector: 'app-event-form',
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.scss']
})
export class EventFormComponent implements OnInit, OnChanges {

  public eventForm: FormGroup;
  public person: Person;
  @Input() event?: Event;
  @Input() public minBegin: Date;
  @Input() public minFinish: Date;
  @Input() public showCreateEventPopup: boolean;
  @Output() private createEmitter = new EventEmitter<Event>();
  @Output() private closeCreateEventPopupEmitter = new EventEmitter<Event>();

  constructor(private authService: AuthenticationsService, private fb: FormBuilder) {
    this.person = new Person();
    this.eventForm = this.fb.group({
      eventName: this.fb.control('', [Validators.required, Validators.minLength(4), Validators.maxLength(30)]),
      begin : this.fb.control('', [Validators.required]),
      finish : this.fb.control('', [Validators.required, ValidationService.finishIsAfterBegin])
    });
   }

  ngOnInit() {
    this.person = this.authService.getPerson();
    this.minBegin = new Date();
    this.minFinish = new Date();
  }

  ngOnChanges() {
    this.minFinish = this.eventForm.value.begin;
  }

  public submitForm() {
    const val = this.eventForm.value;
    const event = new Event();
    event.name = val.eventName;
    event.begin = val.begin;
    event.finish = val.finish;
    this.createEmitter.emit(event);
  }

  public hideEventFormPopup() {
    this.showCreateEventPopup = !this.showCreateEventPopup;
    this.closeCreateEventPopupEmitter.emit();
  }
}
