import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders
} from '@angular/common/http';

import { Observable, throwError as observableThrowError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { IOptions } from '../interfaces';

import { SignalrService } from './signalr.service';

import { environment } from '@env/environment';
import { ConfigurationService } from '@boards/configuration';

@Injectable()
export class ApiService {
  defaultOptions: IOptions = {};

  constructor(
    private httpClient: HttpClient,
    private signalRClient: SignalrService,
    private config: ConfigurationService
  ) {}

  getAll(url: string): Observable<any> {
    url = this.handleUrl(url);
    return this.httpClient
      .get(url, Object.assign({}, this.defaultOptions))
      .pipe(catchError(this.handleError));
  }

  get(url: string, options?: IOptions): Observable<any> {
    url = this.handleUrl(url);
    return this.httpClient.get(url, options).pipe(catchError(this.handleError));
  }

  getById(url: string, boardId: string): Observable<any> {
    url = this.handleUrl(url);
    return this.httpClient
      .get(`${url}/${boardId}`, Object.assign({}, this.defaultOptions))
      .pipe(catchError(this.handleError));
  }

  put(url: string, body: any, action?: any, options?): Observable<any> {
    url = this.handleUrl(url);
    if (action) {
      this.defaultOptions.headers = new HttpHeaders()
        .append('X-SignalR-Command', action.name)
        .append(
          'X-SignalR-Ignore',
          this.signalRClient.getCurrentBoardChannelConnectionID()
        );
    }
    return this.httpClient
      .put(url, body, Object.assign({}, this.defaultOptions))
      .pipe(catchError(this.handleError));
  }

  patch(url: string, body: any, options?): Observable<any> {
    url = this.handleUrl(url);
    return this.httpClient
      .patch(url, body, Object.assign({}, this.defaultOptions))
      .pipe(catchError(this.handleError));
  }

  post(url: string, body: any, action?: any, options?): Observable<any> {
    url = this.handleUrl(url);
    if (action) {
      this.defaultOptions.headers = new HttpHeaders()
        .append('X-SignalR-Command', action.name)
        .append(
          'X-SignalR-Ignore',
          this.signalRClient.getCurrentBoardChannelConnectionID()
        );
    }
    return this.httpClient
      .post(url, body, Object.assign({}, this.defaultOptions))
      .pipe(catchError(this.handleError));
  }

  remove(url: string, action?: any, options?): Observable<any> {
    url = this.handleUrl(url);
    if (action) {
      this.defaultOptions.headers = new HttpHeaders()
        .append('X-SignalR-Command', action.name)
        .append(
          'X-SignalR-Ignore',
          this.signalRClient.getCurrentBoardChannelConnectionID()
        );
    }
    return this.httpClient
      .delete(`${url}`, Object.assign({}, this.defaultOptions))
      .pipe(catchError(this.handleError));
  }

  rawPost(url: string, body: any, options = {}): Observable<any> {
    return this.httpClient.post(url, body, options);
  }

  postFormData<T>(url: string, body: FormData, action?: any): Observable<any> {
    url = this.handleUrl(url);
    if (action) {
      this.defaultOptions.headers = new HttpHeaders()
        .append('X-SignalR-Command', action.name)
        .append(
          'X-SignalR-Ignore',
          this.signalRClient.getCurrentBoardChannelConnectionID()
        );
    }
    return this.httpClient
      .post(
        url,
        body,
        Object.assign({}, this.defaultOptions, { reportProgress: true })
      )
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    return observableThrowError(error);
  }

  private handleUrl(url: string): string {
    return `${this.config.url}/api${url}`;
  }
}
