import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Person } from 'src/app/models/person.models';
import { LoginService } from 'src/app/services/login.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;
  private auth: boolean;
  public person: Person;
  @Output()
  private connection = new EventEmitter<Person>();


  constructor(private loginService: LoginService, private fb: FormBuilder) {
    this.person = new Person();
    this.loginForm = this.fb.group({
      login: this.fb.control('', [Validators.required]),
      password: this.fb.control('', [Validators.required])
    });
   }

  ngOnInit() {
  }
  public getConnection(login: string, password: string) {
    this.loginService.getConnection(login, password).subscribe((personFound) => {
      console.log('OK');
      this.person = personFound;
      this.setLocalStorage();
    }, error => {
      console.log(error);
    }, );
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
  public getLocalStorage(): boolean {
    if (localStorage.getItem('Authorization') === 'true') {
      this.auth = true;
    } else {
      this.auth = false;
    }
    return this.auth;
  }

  public getPerson(): Person {
    return this.person = JSON.parse(localStorage.getItem('Person'));
  }
}
