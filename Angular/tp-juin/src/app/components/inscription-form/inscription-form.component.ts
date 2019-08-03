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

export class InscriptionFormComponent implements OnInit {

  public person: Person;
  public events: Event[];
  public subscriptionBtnClicked = false;
  public inscriptions: Inscription[];
  public isParticipantValue: boolean;
  public inscriptionID: number;

  @Input() public inscription: Inscription;
  @Input() public success: boolean;
  @Input() public activity: Activity;
  @Input() public eventID: number;
  @Output() public create = new EventEmitter<Event>();
  @Output() public delete = new EventEmitter<Event>();
  @Output() public refresh = new EventEmitter<void>();


  constructor(
    private eventService: EventService,
    private activityService: ActivitiesService,
    private inscriptionService: InscriptionService) {
    this.person = new Person();
    this.inscription = new Inscription();

  }
  ngOnInit() {}
}
//   ngOnInit() {
//     if (this.getPerson()) {
//       this.person = JSON.parse(localStorage.getItem('Person'));
//       this.isParticipant();
//     } else {
//       this.person = null;
//     }

//     console.log(this.person);
//     this.eventService.getEventByPersonId(this.person.id)
//       .subscribe(events => {
//         this.events = events;
//       });
//   }

//   public createInscription(event: Event) {
//     this.subscriptionBtnClicked = true;
//     this.create.emit(event);
//   }

//   public deleteInscription(event : Event) {
//     console.log('delete');

//     this.delete.emit(event);
//   }

//   public getPerson(): boolean {
//     if (localStorage.getItem('Person') !== '') {
//       return true;
//     } else {
//       return false;
//     }
//   }

//   public getListInscription() {
//     this.inscriptionService.getAllInscriptionsForOnePerson(this.person.id).subscribe(inscription => {
//       this.inscriptions = inscription,
//         console.log(this.inscriptions);

//     });
//   }


//   }

//   private getActivities() {
//     this.activityService.getActivities().subscribe(
//       activities => {
//         this.activity = activities.find(activity => activity.id === this.activity.id);
//         this.isParticipant();
//       }
//     );
//   }

// }
