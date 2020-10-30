import { Injectable } from '@angular/core';

import { Effect, Actions, ofType } from '@ngrx/effects';

import { map, switchMap } from 'rxjs/operators';

import { IBoard } from '@boards/core/interfaces';

import { BoardTeamService, SignalrService } from '@boards/core/services';

import { CreateBoardTeamSuccess, RemoveBoardTeamSuccess } from '../board';
import {
  BoardTeamActionTypes,
  CreateBoardTeam,
  RemoveBoardTeam
} from './board-team.action';

@Injectable()
export class BoardTeamEffect {
  @Effect()
  createBoardTeam$ = this.actions$.pipe(
    ofType<CreateBoardTeam>(BoardTeamActionTypes.CREATE_BOARD_TEAM),
    map((action) => action.payload),
    switchMap(({ boardId, teamId }) => {
      return this.boardTeamService.create(boardId, teamId);
    }),
    map((board: IBoard) => {
      return new CreateBoardTeamSuccess({ inner: board });
    })
  );

  @Effect()
  removeBoardTeam$ = this.actions$.pipe(
    ofType<RemoveBoardTeam>(BoardTeamActionTypes.REMOVE_BOARD_TEAM),
    map((action) => action.payload),
    switchMap(({ boardId, teamId }) => {
      return this.boardTeamService.remove(boardId, teamId);
    }),
    map((board: IBoard) => {
      return new RemoveBoardTeamSuccess({ inner: board });
    })
  );

  constructor(
    private actions$: Actions,
    private signalrService: SignalrService,
    private boardTeamService: BoardTeamService
  ) {}
}
