import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Person } from 'src/app/models/person.models';

@Component({
  selector: 'app-menu-container',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})

export class MenuContainerComponent implements OnInit {

  public showMenuProfile:boolean;
  @Output() public create = new EventEmitter<void>();

  constructor(private authService: AuthenticationService) {
    this.showMenuProfile = false;
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

  public logout() {
    this.authService.logout();
  }
}
