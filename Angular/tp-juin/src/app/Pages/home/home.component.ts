import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  private auth: boolean;

  constructor() { }

  ngOnInit() {
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
