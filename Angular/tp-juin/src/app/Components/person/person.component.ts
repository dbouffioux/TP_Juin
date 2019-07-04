import { Component, OnInit} from '@angular/core';
import { Person } from 'src/app/models/person.models';
import { PersonService } from 'src/app/services/person.service';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css']
})
export class PersonComponent implements OnInit {
  public persons: Person[];
  public person: Person;

  constructor(private personService: PersonService) { this.person = new Person(); }

  ngOnInit() {
    this.personService.getPersons().subscribe(person => this.persons = person);
  }
  public onCreate(personCreate: Person) {
    this.personService.createPerson(personCreate).subscribe(() => {
      console.log('OK');
    }, error => {
      console.log(error);
    });
  }

}
