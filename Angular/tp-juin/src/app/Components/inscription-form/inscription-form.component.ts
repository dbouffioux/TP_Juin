import { Component, OnInit, Input, EventEmitter, Output, SimpleChanges, OnChanges } from '@angular/core';
import { Inscription } from 'src/app/models/inscription.model';
import { Activity } from 'src/app/models/activity.model';
import { Person } from 'src/app/models/person.models';
import { InscriptionService } from 'src/app/services/inscription.service';
import { EventService } from 'src/app/services/event.service';
import { Event } from 'src/app/models/event.model';
import { ActivitiesService } from 'src/app/services/activities.service';


@Component({
  selector: 'app-inscription-form',
  templateUrl: './inscription-form.component.html',
  styleUrls: ['./inscription-form.component.css']
})

export class InscriptionFormComponent implements OnInit, OnChanges {

  public person: Person;
  public events: Event[];
  public subscriptionBtnClicked = false;
  public inscriptions: Inscription[];
  public isParticipantValue: boolean;
  public inscriptionID: number;

  @Input() public inscription: Inscription;
  @Input() public success: boolean;
  @Input() private activity: Activity;
  @Input() public eventID: number;
  @Output() private create = new EventEmitter<Inscription>();
  @Output() private refresh = new EventEmitter<void>();

  constructor(private inscriptionService: InscriptionService,
    private eventService: EventService,
    private activityService: ActivitiesService) {
    this.person = new Person();
    this.inscription = new Inscription();

  }

  ngOnInit() {
    if (this.getPerson()) {
      this.person = JSON.parse(localStorage.getItem('Person'));
      this.isParticipant();
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
      this.refresh.emit();
    }
    );
  }

  public deleteInscription() {
    this.inscriptionService.getAllInscriptionsForOnePerson(this.person.id).subscribe(
      inscriptions => {
        const inscription = inscriptions.find(inscription1 => {
          return inscription1.activity.id === this.activity.id;
        });
        this.inscriptionID = inscription.id;
        console.log(this.inscriptionID);
        this.inscriptionService.deleteInscription(this.inscriptionID).subscribe(() => {
          console.log('OK');
          this.success = true;
          this.refresh.emit();
        }, error => {
          this.success = false;
          console.log(error);
        });
      }
    );
  }

  public getPerson(): boolean {
    if (localStorage.getItem('Person') !== '') {
      return true;
    } else {
      return false;
    }
  }

  public getListInscription() {
    this.inscriptionService.getAllInscriptionsForOnePerson(this.person.id).subscribe(inscription => {
      this.inscriptions = inscription,
        console.log(this.inscriptions);

    });
  }

  public isParticipant() {
    this.activity.inscriptions.map((participant) => {

      if (participant.person_id === this.person.id) {
        console.log('is Participant');
        this.isParticipantValue = true;
      } else {
        console.log('is not Participant' + participant.person_id + this.person.id);
        this.isParticipantValue = false;
      }
    });
  }

  private getActivities() {
    this.activityService.getActivities().subscribe(
      activities => {
        this.activity = activities.find(activity => activity.id === this.activity.id);
        this.isParticipant();
      }
    );
  }

  ngOnChanges(changes: SimpleChanges): void {
  }

  public onChanges() {
  }
}
