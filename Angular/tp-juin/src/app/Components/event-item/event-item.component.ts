import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/app/services/event.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Event} from 'src/app/models/event.model';
import { ActivitiesService } from 'src/app/services/activities.service';
import { Activity } from 'src/app/models/activity.model';

@Component({
  selector: 'app-event-item',
  templateUrl: './event-item.component.html',
  styleUrls: ['./event-item.component.scss']
})
export class EventItemComponent implements OnInit {

  public event: Event;

  constructor(
    private eventService: EventService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {

    this.route.params.subscribe(params => {
      const id = params.id;
      console.log(id);
      this.eventService.getEventWithAllActivitiesById(id).subscribe(event => this.event = event);
    });

  }



}
