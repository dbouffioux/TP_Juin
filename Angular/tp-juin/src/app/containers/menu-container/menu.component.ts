import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Person } from 'src/app/models/person.models';
import { PersonService } from '../../services/person.service';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-menu-container',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})

export class MenuContainerComponent implements OnInit {

  public showMenuProfile: boolean;
  public showPopupProfile: boolean;
  public person: Person;
  public isCreate: boolean;


  constructor(
    private login: LoginService,
    private authService: AuthenticationService,
    private personService: PersonService,
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

  public toggleMenuProfile(){
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
      localStorage.setItem('Person', JSON.stringify(this.person ));
      console.log(localStorage.getItem('Authorization'));

    } else {
      localStorage.setItem('Authorization', 'false');
      console.log(localStorage.getItem('Authorization'));
    }
  }

  public onCreate(person: Person) {
    this.personService.createPerson(person).subscribe(() => {
      console.log('OK');
      this.isCreate = true;
      this.setLocalStorage();
      this.togglePopupProfile();
      this.login.getConnection(person.login, person.password).subscribe();
      this.router.navigate(['/home']);
    }, error => {
      console.log(error);
    });
  }


}
