import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/app/services/event.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Event} from 'src/app/models/event.model';
import { ActivitiesService } from 'src/app/services/activities.service';
import { Activity } from 'src/app/models/activity.model';
import { Person } from 'src/app/models/person.models';

@Component({
  selector: 'app-event-item',
  templateUrl: './event-item.component.html',
  styleUrls: ['./event-item.component.scss']
})
export class EventItemComponent implements OnInit {

  public event: Event;
  public activities: Activity[];
  public activity: Activity ;
  public person: Person;

  constructor(
    private eventService: EventService,
    private route: ActivatedRoute,
    private router: Router,
    private activitiesService: ActivitiesService) { }

  ngOnInit() {

    this.route.params.subscribe(params => {
      const id = params.id;
      console.log(id);
      this.eventService.getEventWithAllActivitiesById(id).subscribe(event => this.event = event);
      this.person = JSON.parse(localStorage.getItem('Person'));
      this.activitiesService.getActivitiesByPerson(this.person)
      .subscribe(activities => this.activities = activities);

    });

  }
  public onCreate(event: Event) {
    this.eventService.createEvent(event).subscribe(() => {
      console.log('OK');
    }, error => {
      console.log(error);
    });
  }
  }


