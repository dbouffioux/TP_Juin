import { Component, Output, EventEmitter, Input } from '@angular/core';
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
export class MenuContainerComponent{

  public showMenuProfile: boolean;
  public showPopupProfile: boolean;
  public person: Person;
  public isCreate: boolean;
  public errorMessage500 = false;

  constructor(
    private loginService: LoginService,
    private authService: AuthenticationsService,
    private personService: PersonsService,
    private router: Router) {
    this.showMenuProfile = false;
    this.showPopupProfile = false;
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
    this.showPopupProfile = !this.showPopupProfile;
  }

  public logout() {
    this.authService.logout();
  }

  public createPerson(person: Person) {
    this.person = person;
    this.personService.createPerson(person).subscribe(() => {
      this.errorMessage500 = false;
      this.togglePopupProfile();
      this.authService.setLoggin(this.person);
      this.loginService.getConnection(this.person.login, this.person.password).subscribe();
      this.router.navigate(['/home']).then(r => {});
    }, error => {
      if (error.status === 500) {
        this.errorMessage500 = true;
      }
      console.log(error);
    });
  }
}
