import { Component, Input, Output, EventEmitter } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Person} from '../../models/person.model';

@Component({
  selector: 'app-profile-form',
  templateUrl: './profile-form.component.html',
  styleUrls: ['./profile-form.component.scss']
})

export class ProfileFormComponent {

  public signInForm: FormGroup;
  public person: Person;
  @Input() public errorMessage500: boolean;
  @Input() public showPopupProfile: boolean;
  @Output() private createPerson = new EventEmitter<Person>();
  @Output() private resetPopupProfileStateInParent = new EventEmitter<void>();

  constructor(private fb: FormBuilder) {
    this.signInForm = this.fb.group({
      firstname: this.fb.control('', [Validators.required]),
      lastname: this.fb.control('', [Validators.required]),
      login: this.fb.control('', [Validators.required]),
      password: this.fb.control('', [Validators.required])
    });
  }

  public submitForm() {
    const formValues = this.signInForm.value;
    this.person = new Person();
    this.person.firstname = formValues.firstname;
    this.person.lastname = formValues.lastname;
    this.person.login = formValues.login;
    this.person.password = formValues.password;
    this.createPerson.emit(this.person);
  }

  public hidePopup() {
    this.showPopupProfile = !this.showPopupProfile;
    this.resetPopupProfileStateInParent.emit();
  }
}
