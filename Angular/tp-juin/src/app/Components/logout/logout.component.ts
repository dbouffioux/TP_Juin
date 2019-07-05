import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  private auth: boolean;

  constructor() { }

  ngOnInit() {
  }

  private logout() {
    localStorage.setItem('Authorization', 'false');
    localStorage.setItem('Person', '');
    console.log(localStorage.getItem('Authorization'));
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
