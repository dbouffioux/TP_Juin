import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  private auth: boolean;

  constructor(private loginService: LoginService) { }

  ngOnInit() {
  }

  private logout() {
    localStorage.setItem('Authorization', 'false');
    localStorage.setItem('Person', '');
    console.log(localStorage.getItem('Authorization'));
    this.loginService.closeConnection().subscribe();
  }
  public getLocalStorage(): boolean {
    if (localStorage.getItem('Authorization') === 'true') {
      this.auth = true;
    } else {
      this.auth = false;
    }
    return this.auth;
  }
}
