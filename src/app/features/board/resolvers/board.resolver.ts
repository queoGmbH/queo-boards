import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot
} from '@angular/router';

import { Action, Store } from '@ngrx/store';
import { Actions, ofType } from '@ngrx/effects';

import { take } from 'rxjs/operators';

import { BoardActionTypes, GetBoard } from '@boards/store/board';
import { GetBoardChecklists } from '@boards/store/board-checklist';
import { GetBoardComments } from '@boards/store/board-comment';

import { GetArchivedCards, GetArchivedLists } from '@boards/store/archive';

import { TeamsActions } from '@boards/store/team';

@Injectable()
export class BoardResolver implements Resolve<Action> {
  constructor(private actions$: Actions, private store: Store<any>) {}

  resolve(
    activatedRouteSnapshot: ActivatedRouteSnapshot,
    routerStateSnapshot: RouterStateSnapshot
  ) {
    const boardId = activatedRouteSnapshot.params['boardId'];

    this.store.dispatch(new GetBoard({ boardId }));
    this.store.dispatch(new GetBoardChecklists({ boardId }));
    this.store.dispatch(new GetBoardComments({ boardId }));

    this.store.dispatch(new GetArchivedCards({ boardId }));
    this.store.dispatch(new GetArchivedLists({ boardId }));

    this.store.dispatch(new TeamsActions.GetTeams());

    return this.actions$.pipe(
      ofType(BoardActionTypes.GET_BOARD_SUCCESS),
      take(1)
    );
  }
}
