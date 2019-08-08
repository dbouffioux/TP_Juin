import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {Event} from 'src/app/models/event.model';
import {Person} from 'src/app/models/person.model';
import {AuthenticationsService} from 'src/app/services/authentications.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-event-form',
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.scss']
})
export class EventFormComponent implements OnInit, OnChanges {

  public minBegin: Date;
  public person: Person;
  public eventForm: FormGroup;
  public dateTimeRange: Date[];
  public isUpdate: boolean;
  @Input() event: Event;
  @Input() public showCreateEventPopup: boolean;
  @Output() private createEmitter = new EventEmitter<Event>();
  @Output() private updateEmitter = new EventEmitter<Event>();
  @Output() private closeEventPopupEmitter = new EventEmitter<Event>();

  constructor(private authService: AuthenticationsService, private fb: FormBuilder) {
    this.person = new Person();
    this.eventForm = this.fb.group({
      eventName: this.fb.control('', [Validators.required, Validators.minLength(4), Validators.maxLength(30)]),
      begin : this.fb.control('', [Validators.required])
    });
   }

  ngOnInit() {
    this.isUpdate = this.event.name !== '';
    this.minBegin = new Date();
    this.person = this.authService.getPerson();
    this.eventForm.patchValue({eventName: this.event.name});
    this.dateTimeRange = [];
    this.dateTimeRange[0] = this.event.begin;
    this.dateTimeRange[1] = this.event.finish;
    this.eventForm.patchValue({begin: this.dateTimeRange});
  }

  ngOnChanges() { }

  public submitForm() {
    const val = this.eventForm.value;
    this.event.name = val.eventName;
    this.event.begin = this.dateTimeRange[0];
    this.event.finish = this.dateTimeRange[1];
    if (this.isUpdate) {
      this.updateEmitter.emit(this.event);
    } else {
      this.createEmitter.emit(this.event);
    }
  }

  public hideEventFormPopup() {
    this.showCreateEventPopup = !this.showCreateEventPopup;
    this.closeEventPopupEmitter.emit();
  }
}
