import { Component, OnInit} from '@angular/core';
import { Person } from 'src/app/models/person.models';
import { PersonService } from 'src/app/services/person.service';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';


@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css']
})
export class PersonComponent implements OnInit {
  public persons: Person[];
  public person: Person;
  public isCreate: boolean;


  constructor(private personService: PersonService, private router: Router, private login: LoginService) { this.person = new Person(); }

  ngOnInit() {
    this.personService.getPersons().subscribe(person => this.persons = person);
  }
  public onCreate(personCreate: Person) {
    this.personService.createPerson(personCreate).subscribe(() => {
      console.log('OK');
      this.isCreate = true;
      this.setLocalStorage();
      this.login.getConnection(personCreate.login, personCreate.password).subscribe();
      this.router.navigate(['/home']);
    }, error => {
      console.log(error);
    });
  }
  private setLocalStorage() {
    if (this.person !== null) {
      localStorage.setItem('Authorization', 'true');
      localStorage.setItem('Person', JSON.stringify(this.person ));
      console.log(localStorage.getItem('Authorization'));

    } else {
      localStorage.setItem('Authorization', 'false');
      console.log(localStorage.getItem('Authorization'));
    }
  }

}
