// we want console logs in this service
/* tslint:disable no-console */

import { Injectable, Injector } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse
} from '@angular/common/http';

import { Observable, throwError as observableThrowError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import {
  AuthService,
  AuthInfoService,
  ErrorHandlingService
} from '../services';

import { LOGIN_REDIRECT_URL } from '../guards';

// this is the central auth interceptor, it adds authorization headers on-demand
// and it will redirect expired / invalid auth info

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private authInfoService: AuthInfoService,
    private errorHandling: ErrorHandlingService,
    private injector: Injector
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let result;
    if (req.url.endsWith('/config.json')) {
      result = next.handle(req);
      return result;
    }

    const authService = this.injector.get(AuthService);
    // if we are logged in, add auth header
    if (this.authInfoService.isAuthInfoAvailable()) {
      const authHeader = this.authInfoService.getAuthorizationHeader();
      // Clone the request to add the new header.
      const authReq = req.clone({
        headers: req.headers.set('Authorization', authHeader)
      });
      // Pass on the cloned request instead of the original request.
      result = next.handle(authReq);
    } else {
      result = next.handle(req);
    }
    return result.pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          console.error('AuthToken is not valid anymore... redirect to login');
          // we got a 401, uh-oh
          // ignore further errors and
          // tear down auth stuff and redirect to login the hard way
          this.errorHandling.swallowAllErrors();
          authService.logout();
          // TODO: externalize into utils
          // FIXME: that won't work with a deployment at /folder/boards-client ...
          window.location.href = LOGIN_REDIRECT_URL;
          return;
        } else {
          // rethrow error
          return observableThrowError(error);
        }
      })
    );
  }
}
