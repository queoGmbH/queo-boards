import { throwError as observableThrowError, Observable } from 'rxjs';
// we want console logs in this service
/* tslint:disable no-console */

import { Injectable } from '@angular/core';

import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { catchError } from 'rxjs/operators';

import { ErrorHandlingService } from '../services';

@Injectable()
export class AccessDeniedInterceptor implements HttpInterceptor {
  constructor(private errorHandling: ErrorHandlingService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 403) {
          console.error('Access is denied!');
          // we got a 403, uh-oh
          // ignore further errors and
          // tear down auth stuff and redirect to login the hard way
          this.errorHandling.swallowAllErrors();
          this.errorHandling.showAccessDeniedErrorDialog();
          return;
        } else {
          // rethrow error
          return observableThrowError(error);
        }
      })
    );
  }
}
