import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Inscription } from 'src/app/models/inscription.model';
import { InscriptionService } from 'src/app/services/inscription.service';
import { Person } from 'src/app/models/person.models';


@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.scss']
})

export class InscriptionComponent implements OnInit {

  public isDeleted: boolean;
  public person: Person;

  @Input() public inscriptions: Inscription[];
  @Input() public inscription: Inscription;
  @Output() private delete = new EventEmitter<Inscription>();

  constructor() {
    this.inscription = new Inscription();
  }

  ngOnInit() {
    this.person = JSON.parse(localStorage.getItem('Person'));
  }
  public deleteInscription(inscription: Inscription) {
    this.delete.emit(inscription);
  }
}
