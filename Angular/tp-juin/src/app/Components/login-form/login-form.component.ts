import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginService } from 'src/app/services/login.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Person } from 'src/app/models/person.models';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {

  public loginForm: FormGroup;
  @Input()
  public showPopup: boolean;
  @Output()
  public resetPopupStateInParent = new EventEmitter<boolean>();

  constructor(private loginService: LoginService, private fb: FormBuilder, private authService: AuthenticationService) {
    this.loginForm = this.fb.group({
      login: this.fb.control('', [Validators.required]),
      password: this.fb.control('', [Validators.required])
    });
   }

  ngOnInit() {
  }

  public submitForm() {
    const formValues = this.loginForm.value;
    this.loginService.getConnection(
      formValues.login,
      formValues.password)
      .subscribe(
        (personFound) => {
          this.authService.setLoggin(personFound);
        }, error => {
          console.log(error);
    }, );
  }

  public isLogged(): boolean {
    return this.authService.isLogged();
  }

  public getPerson(): Person {
    return this.authService.getPerson();
  }

  public hidePopup() {
    this.resetPopupStateInParent.emit(true);
    this.showPopup = false;
  }
}
