import { Component, OnInit, Input, Output } from '@angular/core';
import { EventService } from 'src/app/services/event.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Event} from 'src/app/models/event.model';
import { ActivitiesService } from 'src/app/services/activities.service';
import { Activity } from 'src/app/models/activity.model';
import { Person } from 'src/app/models/person.models';
import { Inscription } from 'src/app/models/inscription.model';
import { InscriptionService } from 'src/app/services/inscription.service';

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
  public inscription: Inscription;
  public isDeleted: boolean;

  constructor(
    private eventService: EventService,
    private route: ActivatedRoute,
    private router: Router,
    private activitiesService: ActivitiesService,
    private inscriptionService: InscriptionService) {
      this.inscription = new Inscription();
      this.person = new Person();
     }

  ngOnInit() {

    this.route.params.subscribe(params => {
      const id = params.id;
      console.log(id);
      this.eventService.getEventWithAllActivitiesById(id).subscribe(event => {this.event = event; console.log('dans le getEvent'); });
      // this.person = JSON.parse(localStorage.getItem('Person'));
      // this.activitiesService.getActivitiesByPerson(this.person)
      // .subscribe(activities => this.activities = activities);

    });

  }
  public onCreate(event: Event) {
    this.eventService.createEvent(event).subscribe(() => {
      console.log('OK');
    }, error => {
      console.log(error);
    });
  }
  public onCreateInscription(inscription: Inscription) {
    console.log(this.inscription);

    this.inscriptionService.createInscription(inscription).subscribe(() => {
      console.log('OK');
    }, error => {
      console.log(error);
    });
  }

  public getPerson(): boolean {
    if (localStorage.getItem('Person') !== '') {
      return true;
    } else {
      return false;
    }
  }

  public deleteEvent() {
    this.eventService.deleteEvent(this.event.id).subscribe(() => {
      console.log('OK');
      this.isDeleted = true;
      this.router.navigate(['/home']);
    }, error => {
      console.log(error);
    });
  }
}
