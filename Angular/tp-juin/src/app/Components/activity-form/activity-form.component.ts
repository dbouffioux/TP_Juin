import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Activity } from 'src/app/models/activity.model';
import { Person } from 'src/app/models/person.models';
import { ActivitiesService } from 'src/app/services/activities.service';
import { EventService } from 'src/app/services/event.service';
import { Event } from 'src/app/models/event.model';

@Component({
  selector: 'app-activity-form',
  templateUrl: './activity-form.component.html',
  styleUrls: ['./activity-form.component.css']
})

export class ActivityFormComponent implements OnInit {

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


  constructor(private activitiesService: ActivitiesService, private eventService: EventService) {
    this.activity = new Activity();
    this.event = new Event();

  }

  ngOnInit() {
  this.person = JSON.parse(localStorage.getItem('Person'));
  console.log(this.person);
  }

  public createActivity() {
    console.log(this.activity);
    this.create.emit(this.activity);
    // this.refreshActivities.emit();
  }
}
