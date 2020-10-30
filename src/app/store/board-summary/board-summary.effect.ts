import { Injectable } from '@angular/core';

import { Effect, Actions, ofType } from '@ngrx/effects';

import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import { IBoardSummary } from '@boards/core/interfaces';

import { BoardService } from '@boards/core/services';

import {
  BoardArchiveActionTypes,
  CreateArchivedBoardSuccess,
  RestoreArchivedBoardSuccess
} from '../board-archive/actions/board-archive.actions';

import { BoardSummariesActions } from './actions';

@Injectable()
export class BoardSummaryEffect {
  @Effect()
  loadBoardSummaries$ = this.actions$.pipe(
    ofType(BoardSummariesActions.BoardSummaryActionTypes.GET_BOARD_SUMMARIES),
    switchMap(() => {
      return this.boardService.getBoards().pipe(
        map((boardSummaries: IBoardSummary[]) => {
          return new BoardSummariesActions.GetBoardSummariesSuccess({
            boardSummaries
          });
        }),
        catchError((error) => {
          return of(new BoardSummariesActions.GetBoardSummariesFail({ error }));
        })
      );
    })
  );

  @Effect()
  addBoardSummary$ = this.actions$.pipe(
    ofType<BoardSummariesActions.AddBoardSummary>(
      BoardSummariesActions.BoardSummaryActionTypes.ADD_BOARD_SUMMARY
    ),
    map((action) => action.payload),
    switchMap(({ boardSummary }) => {
      return this.boardService.createBoard(boardSummary);
    }),
    map((boardSummary: IBoardSummary) => {
      return new BoardSummariesActions.AddBoardSummarySuccess({ boardSummary });
    })
  );

  @Effect()
  addBoardSummaryAfterRestoreSuccess$ = this.actions$.pipe(
    ofType<RestoreArchivedBoardSuccess>(
      BoardArchiveActionTypes.RESTORE_ARCHIVED_BOARD_SUCCESS
    ),
    map((action) => action.payload),
    map(({ boardSummary }) => {
      return new BoardSummariesActions.AddBoardSummarySuccess({ boardSummary });
    })
  );

  @Effect()
  removeBoardSummaryAfterArchiveSuccess$ = this.actions$.pipe(
    ofType<CreateArchivedBoardSuccess>(
      BoardArchiveActionTypes.CREATE_ARCHIVED_BOARD_SUCCESS
    ),
    map((action) => action.payload),
    map(({ boardSummary }) => {
      return new BoardSummariesActions.RemoveBoardSummary({ boardSummary });
    })
  );

  constructor(private actions$: Actions, private boardService: BoardService) {}
}
