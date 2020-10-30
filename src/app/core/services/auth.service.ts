import { Injectable } from '@angular/core';
import { HttpParameterCodec, HttpParams } from '@angular/common/http';

import { Store } from '@ngrx/store';

import { Observable, BehaviorSubject, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { IAuthInfo } from '../interfaces';

import { ApiService } from './api.service';
import { AuthInfoService } from './auth-info.service';

import { IState } from '../../store/state.interface';

import { AddAuthInfo, RemoveAuthInfo } from '../../store/auth';
import { ConfigurationService } from '@boards/configuration';

export const AUTH_INFO_IDENTIFIER = 'BOARDS.AUTH_INFO';

export class CustomEncoder implements HttpParameterCodec {
  encodeKey(key: string): string {
    return encodeURIComponent(key);
  }

  encodeValue(value: string): string {
    return encodeURIComponent(value);
  }

  decodeKey(key: string): string {
    return decodeURIComponent(key);
  }

  decodeValue(value: string): string {
    return decodeURIComponent(value);
  }
}

@Injectable()
export class AuthService {
  private _initialized = false;
  private _loggedIn = new BehaviorSubject<boolean>(false);

  constructor(
    private apiService: ApiService,
    private authInfoService: AuthInfoService,
    private store: Store<IState>,
    private config: ConfigurationService
  ) {
    this._initialized = true;
  }

  setup(): Observable<boolean> {
    if (this._loggedIn.value) {
      return of(true);
    } else if (this.isAuthInfoAvailable()) {
      this.setupAuthInfo(this.getAuthInfoFromStorage());
      return of(true);
    } else {
      return of(false);
    }
  }

  setupAuthInfo(authInfo: IAuthInfo) {
    window.localStorage[AUTH_INFO_IDENTIFIER] = JSON.stringify(authInfo);
    this.authInfoService.setup(authInfo);
    this.store.dispatch(
      new AddAuthInfo({
        authInfo: this.getAuthInfoFromStorage()
      })
    );
    this._loggedIn.next(true);
  }

  setupByCreds(loginId, password): Observable<boolean> {
    return this.requestToken(loginId, password).pipe(
      map((token) => {
        this.setupAuthInfo(token);
        return true;
      }),
      catchError(() => {
        return of(false);
      })
    );
  }

  removeAuthInfo() {
    delete window.localStorage[AUTH_INFO_IDENTIFIER];
    this.authInfoService.removeInfo();
    this.store.dispatch(new RemoveAuthInfo());
  }

  isAuthInfoAvailable(): boolean {
    return window.localStorage[AUTH_INFO_IDENTIFIER] !== undefined;
  }

  getAuthInfoFromStorage(): IAuthInfo {
    return JSON.parse(window.localStorage[AUTH_INFO_IDENTIFIER]);
  }

  logout() {
    this.removeAuthInfo();
    this._loggedIn.next(false);
    this.authInfoService.removeInfo();
    this.store.dispatch(new RemoveAuthInfo());
  }

  requestToken(loginId: string, password: string): Observable<any> {
    let body = new HttpParams({ encoder: new CustomEncoder() });
    body = body.set('grant_type', 'password');
    body = body.set('userName', loginId);
    body = body.set('password', password);
    return this.apiService.rawPost(`${this.config.url}/Token`, body);
  }

  requestPasswortResetLink(username: string): Observable<any> {
    return this.apiService.post(`/user/me/passwordresetrequest`, {username});
  }

  resetPasswort({passwordResetRequestId, newPassword}): Observable<any> {
    return this.apiService.put(`/user/me/passwordreset`, {passwordResetRequestId, newPassword});
  }
}
