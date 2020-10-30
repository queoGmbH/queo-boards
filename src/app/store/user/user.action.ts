import { Action } from '@ngrx/store';

import { IUser } from '@boards/core/interfaces';
import { BoardRole, UserRole } from '@boards/core/enums';

export enum UserActionTypes {
  GET_CURRENT_USER = '[USER] Get Current User',
  GET_CURRENT_USER_SUCCESS = '[USER] Get Current User Success',

  GET_CURRENT_USER_ROLES = '[USER] Get Current User Roles',
  GET_CURRENT_USER_ROLES_SUCCESS = '[USER] Get Current User Roles Success',

  GET_CURRENT_BOARD_ROLES = '[USER] Get Current Board Roles for User',
  GET_CURRENT_BOARD_ROLES_SUCCESS = '[USER] Get Current Board Roles for User Success',

  GET_USERS = '[USER] Get Users',
  GET_USERS_SUCCESS = '[USER] Get Users Success'
}

export class GetCurrentUser implements Action {
  readonly type = UserActionTypes.GET_CURRENT_USER;
}

export class GetCurrentUserSuccess implements Action {
  readonly type = UserActionTypes.GET_CURRENT_USER_SUCCESS;
  constructor(public payload: { user: IUser }) {}
}

export class GetCurrentUserRoles implements Action {
  readonly type = UserActionTypes.GET_CURRENT_USER_ROLES;
}

export class GetCurrentUserRolesSuccess implements Action {
  readonly type = UserActionTypes.GET_CURRENT_USER_ROLES_SUCCESS;
  constructor(public payload: { roles: UserRole[] }) {}
}

export class GetUsers implements Action {
  readonly type = UserActionTypes.GET_USERS;
}

export class GetUsersSuccess implements Action {
  readonly type = UserActionTypes.GET_USERS_SUCCESS;
  constructor(public payload: { users: IUser[] }) {}
}

export class GetCurrentBoardRoles implements Action {
  readonly type = UserActionTypes.GET_CURRENT_BOARD_ROLES;
  constructor(public payload: { boardId: string }) {}
}

export class GetCurrentBoardRolesSuccess implements Action {
  readonly type = UserActionTypes.GET_CURRENT_BOARD_ROLES_SUCCESS;
  constructor(public payload: { boardRoles: BoardRole[] }) {}
}

export type UserActionsUnion =
  | GetCurrentUser
  | GetCurrentUserSuccess
  | GetCurrentUserRoles
  | GetCurrentUserRolesSuccess
  | GetUsers
  | GetUsersSuccess
  | GetCurrentBoardRoles
  | GetCurrentBoardRolesSuccess;
