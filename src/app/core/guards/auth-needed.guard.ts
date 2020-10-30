import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot
} from '@angular/router';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AuthService } from '../services';

export const LOGIN_REDIRECT_URL = '/login';

@Injectable()
export class AuthNeededGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    // we need to try to setup auth... if auth is not avail, redirect to login
    // TODO: think about storing attempted url for redirecting after login
    return this.authService.setup().pipe(
      map((authAvailable) => {
        if (!authAvailable) {
          this.router.navigate([LOGIN_REDIRECT_URL]);
        }
        return authAvailable;
      })
    );
  }
}
