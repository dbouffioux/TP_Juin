import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Inscription } from 'src/app/models/inscription.model';
import { Activity } from 'src/app/models/activity.model';
import { ActivatedRoute } from '@angular/router';
import { Person } from 'src/app/models/person.models';
import { InscriptionService } from 'src/app/services/inscription.service';
import { EventService } from 'src/app/services/event.service';
import { Event } from 'src/app/models/event.model';

@Component({
  selector: 'app-inscription-form',
  templateUrl: './inscription-form.component.html',
  styleUrls: ['./inscription-form.component.css']
})
export class InscriptionFormComponent implements OnInit {

  public activities: Activity[];
  public person: Person;
  public persons: Person[];
  public event: Event;
  public events: Event[];

  @Input()
  public inscription: Inscription;
  @Output()
  private create = new EventEmitter<Inscription>();
  constructor(private inscriptionService: InscriptionService, private eventService: EventService) { }

  ngOnInit() {
    this.person = JSON.parse(localStorage.getItem('Person'));
    console.log(this.person);
    this.eventService.getEventByPersonId(this.person.id)
      .subscribe(events => {
      this.events = events;
      console.log(this.events);
      });
  }


}
