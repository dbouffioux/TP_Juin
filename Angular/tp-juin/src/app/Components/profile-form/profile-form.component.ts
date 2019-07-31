import { Component, OnInit , Input, Output, EventEmitter } from '@angular/core';
import { Person } from 'src/app/models/person.models';
import { PersonService } from 'src/app/services/person.service';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-profile-form',
  templateUrl: './profile-form.component.html',
  styleUrls: ['./profile-form.component.css']
})

export class ProfileFormComponent implements OnInit {

  @Input() public person: Person;
  @Output() private create = new EventEmitter<Person>();

  public persons: Person[];
  public isCreate: boolean;


  constructor(private personService: PersonService, private router: Router, private login: LoginService) { this.person = new Person(); }

  ngOnInit() {
    this.personService.getPersons().subscribe(person => this.persons = person);
  }

  public onCreate() {
    this.personService.createPerson(this.person).subscribe(() => {
      console.log('OK');
      this.isCreate = true;
      this.setLocalStorage();
      this.login.getConnection(this.person.login, this.person.password).subscribe();
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

  public createPerson() {
    console.log(this.person);
    this.create.emit(this.person);
  }
}
