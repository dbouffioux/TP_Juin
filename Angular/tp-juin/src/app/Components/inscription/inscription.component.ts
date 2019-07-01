import { Component, OnInit } from '@angular/core';
import { Inscription } from 'src/app/models/inscription.model';
import { InscriptionService } from 'src/app/services/inscription.service';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css']
})
export class InscriptionComponent implements OnInit {

  public inscriptions: Inscription[];

  constructor(private inscriptionService: InscriptionService) { }

  ngOnInit() {
    this.inscriptionService.getAllInscriptions().subscribe(inscription => this.inscriptions = inscription);
  }

}
