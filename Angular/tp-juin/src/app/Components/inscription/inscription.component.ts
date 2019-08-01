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

  @Input()
  public inscriptions: Inscription[];
  public isDeleted: boolean;
  public person: Person;

  @Input()
  public inscription: Inscription;

  constructor() {
    this.inscription = new Inscription();
  }

  ngOnInit() {
    this.person = JSON.parse(localStorage.getItem('Person'));
  }



}
