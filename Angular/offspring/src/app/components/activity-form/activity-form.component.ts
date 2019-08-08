import { Component, OnInit, Input, EventEmitter, Output, OnChanges } from '@angular/core';
import { Activity } from 'src/app/models/activity.model';
import { Person } from 'src/app/models/person.model';
import { ActivitiesService } from 'src/app/services/activities.service';
import { EventsService } from 'src/app/services/events.service';
import { Event } from 'src/app/models/event.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {log} from 'util';

@Component({
  selector: 'app-activity-form',
  templateUrl: './activity-form.component.html',
  styleUrls: ['./activity-form.component.scss']
})
export class ActivityFormComponent implements OnInit {

  public event: Event;
  public  minDate: Date;
  public  maxDate: Date;
  public person: Person;
  public disabled: boolean;
  public dateTimeRange: Date[];
  public activities: Activity[];
  public activityForm: FormGroup;
  @Input() public events: Event[];
  @Input() public activity: Activity;
  @Input() public showCreateActivityPopup: boolean;
  @Input() public showUpdateActivityPopup: boolean;
  @Output() private create = new EventEmitter<Activity>();
  @Output() private refresh = new EventEmitter<Event>();
  @Output() private update = new EventEmitter<Activity>();
  @Output() private closeUpdateActivityPopupEmitter = new EventEmitter<Activity>();
  @Output() private closeCreateActivityPopupEmitter = new EventEmitter<Activity>();

  constructor(private activitiesService: ActivitiesService, private eventService: EventsService, private fb: FormBuilder) {
    this.activityForm = this.fb.group({
      event: this.fb.control('', [Validators.required]),
      activityName: this.fb.control('', [Validators.required, Validators.minLength(4), Validators.maxLength(20)]),
      begin: this.fb.control('', [Validators.required]),
      description: this.fb.control(''),
      url: this.fb.control('')
    });
  }

  ngOnInit() {
    this.disabled = false;
  }

  public submitForm() {
    const formValues = this.activityForm.value;
    const activity = new Activity();
    this.activity.eventName = formValues.event;
    this.activity.name = formValues.activityName;
    this.activity.begin = this.dateTimeRange[0];
    this.activity.finish = this.dateTimeRange[1];
    this.activity.description = formValues.description;
    this.activity.url = formValues.url;
    if (this.updateActivity()) {
      this.update.emit(this.activity);
    } else {
      this.create.emit(this.activity);
      this.refresh.emit(formValues.event);
    }
    this.hideActivityFormPopup();
  }

  public hideActivityFormPopup() {
    this.showCreateActivityPopup = !this.showCreateActivityPopup;
    this.closeCreateActivityPopupEmitter.emit();
    this.closeUpdateActivityPopupEmitter.emit();
  }

  public updateActivity(): boolean {
    if (this.activity.id !== undefined) {
      return true;
    } else {
      return false;
    }
  }

  public eventSelect(eventJson: string) {
    this.event = JSON.parse(eventJson);
    this.dateTimeRange = null;
    if (this.event !== null) {
      this.minDate = this.event.begin;
      this.maxDate = this.event.finish;
      this.disabled = true;
    } else {
      this.minDate = new Date();
      this.maxDate = new Date();
      this.disabled = false;
    }
  }
}

