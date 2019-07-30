import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Inscription } from 'src/app/models/inscription.model';
import { Activity } from 'src/app/models/activity.model';
import { ActivatedRoute } from '@angular/router';
import { Person } from 'src/app/models/person.models';
import { InscriptionService } from 'src/app/services/inscription.service';
import { EventService } from 'src/app/services/event.service';
import { Event } from 'src/app/models/event.model';
import { eraseStyles } from '@angular/animations/browser/src/util';

@Component({
  selector: 'app-inscription-form',
  templateUrl: './inscription-form.component.html',
  styleUrls: ['./inscription-form.component.css']
})
export class InscriptionFormComponent implements OnInit {

  public person: Person;
  public events: Event[];
  public subscriptionBtnClicked = false;

  @Input() public inscription: Inscription;
  @Input() success: boolean;
  @Output()
  private create = new EventEmitter<Inscription>();

  @Input() private activity: Activity;

  constructor(private inscriptionService: InscriptionService, private eventService: EventService) {
    this.person = new Person();
    this.inscription = new Inscription();
  }

  ngOnInit() {
    if (this.getPerson()) {
      this.person = JSON.parse(localStorage.getItem('Person'));
    } else {
      this.person = null;
    }

    console.log(this.person);
    this.eventService.getEventByPersonId(this.person.id)
      .subscribe(events => {
        this.events = events;
      });
  }
  public createInscription() {
    this.subscriptionBtnClicked = true;
    this.person = JSON.parse(localStorage.getItem('Person'));
    console.log(this.person);
    this.inscription.person_id = this.person.id;
    console.log(this.inscription.person_id);

    this.inscription.activity_id = this.activity.id; // Number.parseInt(localStorage.getItem('activityId'), 0);
    console.log(this.inscription);

    this.inscriptionService.createInscription(this.inscription).subscribe(() => {
      console.log('ok');
    }
    );
  }

  public deleteInscription(idInscription: number) {
    this.inscriptionService.deleteInscription(idInscription).subscribe(() => {
      console.log('OK');
      this.success = true;
    }, error => {
      this.success = false;
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

}
