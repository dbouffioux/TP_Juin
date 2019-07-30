import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  private auth: boolean;

  constructor(private authService: AuthenticationService) { }

  ngOnInit() {
  }

  private logout() {
    this.authService.logout();
  }
  public isLogged(): boolean {
   return this.authService.isLogged();
  }
}
