import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Person } from 'src/app/models/person.models';
import { LoginService } from 'src/app/services/login.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;
  private auth: boolean;
  @Output()
  private connection = new EventEmitter<Person>();

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
          console.log(personFound);
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
}
