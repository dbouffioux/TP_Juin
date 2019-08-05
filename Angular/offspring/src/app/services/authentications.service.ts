import { Injectable } from '@angular/core';
import { Person } from '../models/person.model';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})

export class AuthenticationsService {

  public person: Person;

  constructor(private loginService: LoginService) { }

  public isLogged(): boolean {
    return localStorage.getItem('Authorization') === 'true' ? true : false;
  }

  public setLoggin(person?: Person): void {
    if (person !== null) {
      localStorage.setItem('Authorization', 'true');
      localStorage.setItem('Person', JSON.stringify(person));
    } else {
      localStorage.setItem('Authorization', 'false');
    }
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
