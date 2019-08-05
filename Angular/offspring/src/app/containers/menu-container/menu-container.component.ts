import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { AuthenticationsService } from 'src/app/services/authentications.service';
import { Person } from 'src/app/models/person.model';
import { PersonsService } from '../../services/persons.service';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-menu-container',
  templateUrl: './menu-container.component.html',
  styleUrls: ['./menu-container.component.scss']
})

export class MenuContainerComponent implements OnInit {

  public showMenuProfile: boolean;
  public showPopupProfile: boolean;
  public person: Person;
  public isCreate: boolean;


  constructor(
    private login: LoginService,
    private authService: AuthenticationsService,
    private personService: PersonsService,
    private router: Router) {
    this.showMenuProfile = false;
    this.showPopupProfile = false;
  }

  ngOnInit() {
  }

  public isLogged(): boolean {
    return this.authService.isLogged();
  }

  public getPerson(): Person {
    return this.authService.getPerson();
  }

  public toggleMenuProfile() {
    this.showMenuProfile = !this.showMenuProfile;
  }

  public togglePopupProfile() {
    console.log('togglePopupProfile');

    this.showPopupProfile = !this.showPopupProfile;
  }

  public logout() {
    this.authService.logout();
  }

  private setLocalStorage() {
    if (this.person !== null) {
      localStorage.setItem('Authorization', 'true');
      localStorage.setItem('Person', JSON.stringify(this.person));
      console.log(localStorage.getItem('Authorization'));

    } else {
      localStorage.setItem('Authorization', 'false');
      console.log(localStorage.getItem('Authorization'));
    }
  }

  public onCreate() {
    this.personService.createPerson(this.person).subscribe(() => {
      console.log('OK');
      this.isCreate = true;
      this.setLocalStorage();
      this.login.getConnection(this.person.login, this.person.password).subscribe();
      this.router.navigate(['/home']);
    }, error => {
      console.log(error);
    });
  }
}
