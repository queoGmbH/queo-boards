import { Action } from '@ngrx/store';

import { IAuthInfo } from '@boards/core/interfaces';

export enum AuthActionTypes {
  ADD_AUTH_INFO = '[AUTH] Add Auth Info',
  AUTH_INFO_ADDED = '[AUTH] Auth Info added',
  REMOVE_AUTH_INFO = '[AUTH] Remove Auth Info',
  AUTH_INFO_REMOVED = '[AUTH] Auth Info removed'

  // ADD_USER = '[AUTH] Add User',
  // REMOVE_USER = '[AUTH] Remove User'
}

export class AddAuthInfo implements Action {
  readonly type = AuthActionTypes.ADD_AUTH_INFO;
  constructor(public payload: { authInfo: IAuthInfo }) {}
}

export class RemoveAuthInfo implements Action {
  readonly type = AuthActionTypes.REMOVE_AUTH_INFO;
}

export class AuthInfoAdded implements Action {
  readonly type = AuthActionTypes.AUTH_INFO_ADDED;
  constructor(public payload: { authInfo: IAuthInfo }) {}
}

export class AuthInfoRemoved implements Action {
  readonly type = AuthActionTypes.AUTH_INFO_REMOVED;
}

export type AuthActionsUnion =
  | AddAuthInfo
  | RemoveAuthInfo
  | AuthInfoAdded
  | AuthInfoRemoved;
