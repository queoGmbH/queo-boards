import { Injectable } from '@angular/core';

import { IAuthInfo } from '../interfaces';

@Injectable()
export class AuthInfoService {
  private _accessToken = null;
  private _authInfo = null;

  constructor() {}

  setup(authInfo: IAuthInfo) {
    this._accessToken = authInfo.access_token;
    this._authInfo = { ...authInfo };
  }

  removeInfo() {
    this._accessToken = null;
    this._authInfo = null;
  }

  getAuthorizationHeader(): string {
    return `Bearer ${this._accessToken}`;
  }

  getToken() {
    return this._accessToken;
  }

  isAuthInfoAvailable(): boolean {
    return this._authInfo !== null;
  }
}
