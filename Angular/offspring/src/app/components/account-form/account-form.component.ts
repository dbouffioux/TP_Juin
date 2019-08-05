import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Person } from 'src/app/models/person.models';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-account-form',
  templateUrl: './account-form.component.html',
  styleUrls: ['./account-form.component.scss']
})
export class AccountFormComponent implements OnInit {

  @Input() public person: Person;
  public isLogged: boolean;
  public newPerson: Person;
  public accountForm: FormGroup;
  @Output() public emitter = new EventEmitter<Person>();
  @Output() public delete = new EventEmitter<void>();

  constructor(
    private fb: FormBuilder,
    private authService: AuthenticationService
  ) { }

  ngOnInit() {
    this.person = JSON.parse(localStorage.getItem('Person'));
    this.isLogged = this.authService.isLogged();
    this.accountForm = this.fb.group({
      firstname: this.fb.control(this.person.firstname, [Validators.required]),
      lastname: this.fb.control(this.person.lastname, [Validators.required]),
      login: this.fb.control(this.person.login, [Validators.required]),
      password: this.fb.control(this.person.password, [Validators.required])
    });
    this.newPerson = new Person();
  }

  public onSubmit() {
    const val = this.accountForm.value;
    console.log('val : ' + this.accountForm.value.firstname);
    this.newPerson.id = this.person.id;
    this.newPerson.firstname = val.firstname;
    this.newPerson.lastname = val.lastname;
    this.newPerson.login = val.login;
    this.newPerson.password = val.password;
    console.log('val dasn onsubmit : ' + this.newPerson.firstname);
    this.emitter.emit(this.newPerson);
  }

  public deleteProfile() {
    this.delete.emit();
  }
}

