import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Activity } from 'src/app/models/activity.model';
import { Person } from 'src/app/models/person.model';
import { ActivitiesService } from 'src/app/services/activities.service';
import { EventsService } from 'src/app/services/events.service';
import { Event } from 'src/app/models/event.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-activity-form',
  templateUrl: './activity-form.component.html',
  styleUrls: ['./activity-form.component.scss']
})

export class ActivityFormComponent implements OnInit {

  public event: Event;
  public person: Person;
  public persons: Person[];
  public activities: Activity[];
  public activityForm: FormGroup;

  @Input() public events: Event[];
  @Input() public activity: Activity;
  @Input() public showCreateActivityPopup: boolean;
  @Output() private create = new EventEmitter<Activity>();


  constructor(private activitiesService: ActivitiesService, private eventService: EventsService, private fb: FormBuilder) {
    this.activityForm = this.fb.group({
      event_name: this.fb.control('', [Validators.required]),
      activity_name: this.fb.control('', [Validators.required]),
      begin: this.fb.control('', [Validators.required]),
      finish: this.fb.control('', [Validators.required]),
      description: this.fb.control(''),
      url: this.fb.control('')
    });
  }

  ngOnInit() { }

  public createActivity() {
    const formValues = this.activityForm.value;
    const activity = new Activity();
    activity.eventName = formValues.event_name;
    activity.name = formValues.activity_name;
    activity.begin = formValues.begin;
    activity.finish = formValues.finish;
    activity.description = formValues.description;
    activity.url = formValues.url;
    console.log(activity);
    this.create.emit(activity);
  }

  public hideEventFormPopup() {
    this.showCreateActivityPopup = !this.showCreateActivityPopup;
  }
}

