import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Person } from 'src/app/models/person.models';

@Component({
  selector: 'app-menu-container',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})

export class MenuContainerComponent implements OnInit {

  public showMenuProfile: boolean;
  public showPopupProfile: boolean;
  constructor(private authService: AuthenticationService) {
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
}
