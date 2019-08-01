import { Component, OnInit, Input } from '@angular/core';
import { Inscription } from 'src/app/models/inscription.model';
import { InscriptionService } from 'src/app/services/inscription.service';
import { Person } from 'src/app/models/person.models';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css']
})

export class InscriptionComponent implements OnInit {

  public inscriptions: Inscription[];
  public isDeleted: boolean;
  public person: Person;

  @Input()
  public inscription: Inscription;

  constructor(private inscriptionService: InscriptionService) {
    this.inscription = new Inscription();
  }

  ngOnInit() {
    this.person = JSON.parse(localStorage.getItem('Person'));
    this.getListInscription();
  }

  public deleteInscription(idInscription: number) {
    this.inscriptionService.deleteInscription(idInscription).subscribe(() => {
      this.isDeleted = true;
      this.getListInscription();
    }, error => {
      this.isDeleted = false;
      console.log(error);
    });
  }

 public getListInscription() {
  this.inscriptionService.getAllInscriptionsForOnePerson(this.person.id).subscribe(
      inscription => {this.inscriptions = inscription; }
    );
  }
}
