import { Injectable } from '@angular/core';

import { select, Store } from '@ngrx/store';
import { Effect, Actions, ofType } from '@ngrx/effects';

import { flatMap, map, switchMap, withLatestFrom } from 'rxjs/operators';

import { IUser } from '@boards/core/interfaces';
import { BoardRole, UserRole } from '@boards/core/enums';

import { UserService } from '@boards/core/services';

import { IState } from '../state.interface';

import { AuthActionTypes, AuthInfoAdded } from '../auth';
import { BoardActionTypes } from '../board';
import {
  UserActionTypes,
  GetCurrentBoardRoles,
  GetCurrentBoardRolesSuccess,
  GetCurrentUserRoles,
  GetCurrentUserRolesSuccess,
  GetCurrentUser,
  GetCurrentUserSuccess,
  GetUsers,
  GetUsersSuccess
} from './user.action';
import {
  GetBoard,
  CreateBoardMemberSuccess,
  CreateBoardOwnerSuccess,
  RemoveBoardMemberSuccess,
  RemoveBoardOwnerSuccess
} from '@boards/store/board';

@Injectable()
export class UserEffect {
  @Effect()
  onAuthAdded$ = this.actions$.pipe(
    ofType<AuthInfoAdded>(AuthActionTypes.AUTH_INFO_ADDED),
    flatMap(() => {
      return [new GetCurrentUser(), new GetCurrentUserRoles(), new GetUsers()];
    })
  );

  @Effect()
  onBoardLoad = this.actions$.pipe(
    ofType<GetBoard>(BoardActionTypes.GET_BOARD),
    map((action) => action.payload),
    map(({ boardId }) => {
      return new GetCurrentBoardRoles({ boardId });
    })
  );

  @Effect()
  onUserChangeOnBoardSuccess = this.actions$.pipe(
    ofType<
      | CreateBoardMemberSuccess
      | CreateBoardOwnerSuccess
      | RemoveBoardMemberSuccess
      | RemoveBoardOwnerSuccess
    >(
      BoardActionTypes.CREATE_BOARD_MEMBER_SUCCESS,
      BoardActionTypes.CREATE_BOARD_OWNER_SUCCESS,
      BoardActionTypes.REMOVE_BOARD_MEMBER_SUCCESS,
      BoardActionTypes.REMOVE_BOARD_OWNER_SUCCESS
    ),
    map((action) => action.payload),
    withLatestFrom(
      this.store.pipe(select((state: IState) => state.board.businessId))
    ),
    map(([{ inner }, currentBoardId]) => {
      if (inner.businessId === currentBoardId) {
        return new GetCurrentBoardRoles({
          boardId: inner.businessId
        });
      } else {
        // do nothing and dispatch an action that does not do anything
        return { type: 'NOOP' };
      }
    })
  );

  @Effect()
  getCurrentBoardRoles$ = this.actions$.pipe(
    ofType<GetCurrentBoardRoles>(UserActionTypes.GET_CURRENT_BOARD_ROLES),
    map((action) => action.payload),
    switchMap(({ boardId }) =>
      this.userService.getBoardRolesByBoardId(boardId)
    ),
    map((boardRoles: BoardRole[]) => {
      return new GetCurrentBoardRolesSuccess({ boardRoles });
    })
  );

  @Effect()
  getCurrentUser$ = this.actions$.pipe(
    ofType(UserActionTypes.GET_CURRENT_USER),
    switchMap(() => this.userService.getCurrentUser()),
    map((user: IUser) => {
      return new GetCurrentUserSuccess({ user });
    })
  );

  @Effect()
  getCurrentUserRoles$ = this.actions$.pipe(
    ofType(UserActionTypes.GET_CURRENT_USER_ROLES),
    switchMap(() => this.userService.getCurrentUserRoles()),
    map((roles: UserRole[]) => {
      return new GetCurrentUserRolesSuccess({ roles });
    })
  );

  @Effect()
  getUsers$ = this.actions$.pipe(
    ofType(UserActionTypes.GET_USERS),
    switchMap(() => this.userService.getUsers()),
    map((users: IUser[]) => {
      return new GetUsersSuccess({ users });
    })
  );

  // @Effect()
  // initUserRoles$ = this.actions$.pipe(
  //   ofType(AuthActionTypes.AUTH_INFO_ADDED),
  //   map(() => new GetCurrentUserRoles())
  // );

  constructor(
    private actions$: Actions,
    private store: Store<IState>,
    private userService: UserService
  ) {}
}
