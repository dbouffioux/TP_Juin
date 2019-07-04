import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Person } from 'src/app/models/person.models';
import { LoginService } from 'src/app/services/login.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;


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
      console.log(localStorage.getItem('Authorization'));

    } else {
      localStorage.setItem('Authorization', 'false');
      console.log(localStorage.getItem('Authorization'));
    }
  }
}
