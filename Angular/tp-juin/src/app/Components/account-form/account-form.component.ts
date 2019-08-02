import { Component, OnInit, Input } from '@angular/core';
import { Person } from 'src/app/models/person.models';
import { PersonService } from 'src/app/services/person.service';

@Component({
  selector: 'app-account-form',
  templateUrl: './account-form.component.html',
  styleUrls: ['./account-form.component.scss']
})
export class AccountFormComponent implements OnInit {

  @Input() public person: Person;

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

  public deleteProfile() {
    this.person = JSON.parse(localStorage.getItem('Person'));
    this.personService.deleteProfile(this.person.id).subscribe(() => {
      console.log('OK');
    }, error => {
      console.log(error);
    });
  }
}
