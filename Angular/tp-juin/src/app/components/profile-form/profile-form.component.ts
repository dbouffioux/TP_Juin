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
  @Input() public showPopupProfile: boolean;
  @Output() private resetPopupProfileStateInParent = new EventEmitter<void>();
  @Output() private create = new EventEmitter<Person>();

  public persons: Person[];

  constructor(
    private personService: PersonService,
    private router: Router,
    private login: LoginService) {
      this.person = new Person();
    }

  ngOnInit() {
    this.personService.getPersons().subscribe(person => this.persons = person);
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

  public hidePopup() {
    this.resetPopupProfileStateInParent.emit();
  }

  public createPerson() {
    this.create.emit(this.person);
  }
}
