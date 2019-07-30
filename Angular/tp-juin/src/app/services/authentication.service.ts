import { Injectable } from '@angular/core';
import { Person } from '../models/person.models';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  public person: Person;

  constructor(private loginService: LoginService) { }

  public isLogged(): boolean {
    return localStorage.getItem('Authorization') === 'true' ? true : false;
  }
  public getPerson(): Person {
    return this.person = localStorage.getItem('Person') !== '' ?
      JSON.parse(localStorage.getItem('Person'))
      : '';
  }
  public logout(): any {
    localStorage.setItem('Authorization', 'false');
    localStorage.setItem('Person', '');
    this.loginService.closeConnection().subscribe();
  }
}
