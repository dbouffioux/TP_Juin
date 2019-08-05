import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { Person } from 'src/app/models/person.models';
import { LoginService } from 'src/app/services/login.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {

  public loginForm: FormGroup;
  public person: Person;
  @Input()
  public showPopup: boolean;
  @Output() showSubscription = new EventEmitter<void>();
  public showLoginFormPopup: boolean;

  constructor(private loginService: LoginService, private fb: FormBuilder, private authService: AuthenticationService) {
    this.person = new Person();
    this.loginForm = this.fb.group({
      login: this.fb.control('', [Validators.required]),
      password: this.fb.control('', [Validators.required])
    });
    // init popup state
    this.showLoginFormPopup = false;
  }

  ngOnInit() {
  }

  public getConnection() {
    this.loginService.getConnection(this.person.login , this.person.password).subscribe((personFound) => {
      this.authService.setLoggin(personFound);
    }, error => {
      console.log(error);
    });
  }

  public toggleLoginFormPopupState() {
    this.showLoginFormPopup = !this.showLoginFormPopup;
  }

  public showSubscriptionPopup() {
    console.log('showSubscriptionMenu');

    this.showSubscription.emit();
  }

}
