import { Component, OnInit } from '@angular/core';
import { Person } from 'src/app/models/person.model';
import { PersonsService } from 'src/app/services/persons.service';

@Component({
  selector: 'app-update-ccount',
  templateUrl: './updateAccount.component.html',
  styleUrls: ['./updateAccount.component.scss']
})
export class UpdateAccountComponent implements OnInit {

  public person: Person;

  constructor(private personService: PersonsService) {
    this.person = new Person();
  }

  ngOnInit() {
    this.person = JSON.parse(localStorage.getItem('Person'));
    console.log(this.person);
  }

  public updateProfile(personUpdated: Person) {
    this.personService.updatePerson(personUpdated).subscribe(() => {
      console.log('OK');
    }, error => {
      console.log(error);
    });
  }

  public deleteProfile() {
    this.person = JSON.parse(localStorage.getItem('Person'));
    this.personService.deleteProfile(this.person.id).subscribe(() => {
      console.log('OK');
    }, error => {
      console.log(error);
    });
  }
}
