import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Activity } from 'src/app/models/activity.model';
import { Person } from 'src/app/models/person.models';
import { ActivitiesService } from 'src/app/services/activities.service';
import { EventService } from 'src/app/services/event.service';
import { Event } from 'src/app/models/event.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-activity-form',
  templateUrl: './activity-form.component.html',
  styleUrls: ['./activity-form.component.css']
})

export class ActivityFormComponent implements OnInit {

public activityForm: FormGroup;
public activities: Activity[];
public person: Person;
public persons: Person[];
public event: Event;
@Input()
public events: Event[];

  @Input()
  public activity: Activity;
  @Output()
  private create = new EventEmitter<Activity>();


  constructor(private activitiesService: ActivitiesService, private eventService: EventService, private fb: FormBuilder) {
    this.activityForm = this.fb.group({
      event_name: this.fb.control('', [Validators.required]),
      activity_name: this.fb.control('', [Validators.required]),
      begin: this.fb.control('', [Validators.required]),
      finish: this.fb.control('', [Validators.required]),
      description: this.fb.control(''),
      url: this.fb.control('')
  });
}

  ngOnInit() {}

  public createActivity(activity: Activity) {
    const formValues = this.activityForm.value;
    activity.event_name = formValues.event_name;
    activity.name = formValues.activity_name;
    activity.begin = formValues.begin;
    activity.finish = formValues.finish;
    activity.description = formValues.description;
    activity.url = formValues.url;
    console.log(activity);
    this.create.emit(activity);
  }
}