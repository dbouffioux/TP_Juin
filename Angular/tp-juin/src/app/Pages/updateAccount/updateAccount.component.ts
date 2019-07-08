import { Component, OnInit } from '@angular/core';
import { Person } from 'src/app/models/person.models';
import { PersonService } from 'src/app/services/person.service';

@Component({
  selector: 'app-updateAccount',
  templateUrl: './updateAccount.component.html',
  styleUrls: ['./updateAccount.component.css']
})
export class UpdateAccountComponent implements OnInit {

  public person: Person;

  constructor(private personService: PersonService) {
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

}
