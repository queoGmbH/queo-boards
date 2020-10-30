import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';

import { map, switchMap } from 'rxjs/operators';

import { IBoardSummary, IBreadcrumbBoard } from '@boards/core/interfaces';

import { BoardArchiveService } from '@boards/core/services';

import { AddBoardSummarySuccess } from '../board-summary';

import { BoardsArchiveActions } from './actions';

@Injectable()
export class BoardArchiveEffect {
  @Effect()
  getArchivedBoards$ = this.actions$.pipe(
    ofType(BoardsArchiveActions.BoardArchiveActionTypes.GET_ARCHIVED_BOARDS),
    switchMap(() => {
      return this.boardArchiveService.getAll();
    }),
    map((boardSummaries: IBoardSummary[]) => {
      return new BoardsArchiveActions.GetArchivedBoardsSuccess({
        boardSummaries
      });
    })
  );

  @Effect()
  createArchivedBoard$ = this.actions$.pipe(
    ofType<BoardsArchiveActions.CreateArchivedBoard>(
      BoardsArchiveActions.BoardArchiveActionTypes.CREATE_ARCHIVED_BOARD
    ),
    map((action) => action.payload),
    switchMap(({ boardSummary }) => {
      return this.boardArchiveService.create(
        boardSummary,
        {},
        {
          name:
            BoardsArchiveActions.BoardArchiveActionTypes
              .CREATE_ARCHIVED_BOARD_SUCCESS
        }
      );
    }),
    map((boardSummary: IBoardSummary) => {
      return new BoardsArchiveActions.CreateArchivedBoardSuccess({
        boardSummary
      });
    })
  );

  @Effect()
  removeArchivedBoard$ = this.actions$.pipe(
    ofType<BoardsArchiveActions.RemoveArchivedBoard>(
      BoardsArchiveActions.BoardArchiveActionTypes.REMOVE_ARCHIVED_BOARD
    ),
    map((action) => action.payload),
    switchMap(({ boardSummary }) => {
      return this.boardArchiveService.remove(boardSummary);
    }),
    map((breadcrumbBoard: IBreadcrumbBoard) => {
      return new BoardsArchiveActions.RemoveArchivedBoardSuccess({
        breadcrumbBoard
      });
    })
  );

  @Effect()
  restoreArchivedBoard$ = this.actions$.pipe(
    ofType<BoardsArchiveActions.RestoreArchivedBoard>(
      BoardsArchiveActions.BoardArchiveActionTypes.RESTORE_ARCHIVED_BOARD
    ),
    map((action) => action.payload),
    switchMap(({ boardSummary }) => {
      return this.boardArchiveService.restore(boardSummary);
    }),
    map((boardSummary: IBoardSummary) => {
      return new BoardsArchiveActions.RestoreArchivedBoardSuccess({
        boardSummary
      });
    })
  );

  @Effect()
  addRestoredBoardToSummaries$ = this.actions$.pipe(
    ofType<BoardsArchiveActions.RestoreArchivedBoardSuccess>(
      BoardsArchiveActions.BoardArchiveActionTypes
        .RESTORE_ARCHIVED_BOARD_SUCCESS
    ),
    map((action) => action.payload),
    map(({ boardSummary }) => {
      return new AddBoardSummarySuccess({ boardSummary });
    })
  );

  constructor(
    private actions$: Actions,
    private boardArchiveService: BoardArchiveService
  ) {}
}
