import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginService } from 'src/app/services/login.service';
import { AuthenticationsService } from 'src/app/services/authentications.service';
import { Person } from 'src/app/models/person.model';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent {

  public loginForm: FormGroup;
  public errorMessage403 = false;
  public errorMessage500 = false;
  @Input() public showLoginFormPopup: boolean;
  @Output() public resetLoginFormPopupStateInParent = new EventEmitter<void>();

  constructor(private loginService: LoginService, private fb: FormBuilder, private authService: AuthenticationsService) {
    this.loginForm = this.fb.group({
      login: this.fb.control('', [Validators.required]),
      password: this.fb.control('', [Validators.required])
    });
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
          if (error.status === 403) {
            this.errorMessage403 = true;
          } else if (error.status === 500) {
            this.errorMessage500 = true;
          }
    });
  }

  public isLogged(): boolean {
    return this.authService.isLogged();
  }

  public getPerson(): Person {
    return this.authService.getPerson();
  }

  public hideLoginFormPopup() {
    this.resetLoginFormPopupStateInParent.emit();
  }
}
