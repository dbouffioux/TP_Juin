import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import { Injectable} from '@angular/core';
import {AuthenticationsService} from './authentications.service';


@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthenticationsService,
              private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    if (this.authService.getPerson() != null) {
      return true;
    } else {
      this.router.navigate(['/login']);
    }
  }
}
