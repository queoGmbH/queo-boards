import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

import { Effect, Actions, ofType } from '@ngrx/effects';

import { map, switchMap, tap } from 'rxjs/operators';

import { IBoard } from '@boards/core/interfaces';

import { BoardService } from '@boards/core/services';

import {
  BoardActionTypes,
  ArchiveCardSuccess,
  ArchiveListSuccess
} from '../board';
import {
  UIActionTypes,
  SetCopyMove,
  SetCopyMoveSuccess,
  ShowSnackBar,
  ShowSnackBarError
} from './ui.action';

@Injectable()
export class UIEffect {
  @Effect({ dispatch: false })
  showSnackBarMessage$ = this.actions$.pipe(
    ofType<ShowSnackBar>(UIActionTypes.SHOW_SNACK_BAR),
    map((action) => action.payload),
    tap(({ message }) => {
      const config = <MatSnackBarConfig>{
        duration: 40000,
        panelClass: 'boards-message'
      };
      this.matSnackbar.open(message, 'OK', config);
    })
  );

  @Effect({ dispatch: false })
  showSnackBarErrorMessage$ = this.actions$.pipe(
    ofType<ShowSnackBarError>(UIActionTypes.SHOW_SNACK_BAR_ERROR),
    map((action) => action.payload),
    tap(({ message }) => {
      const config = <MatSnackBarConfig>{
        extraClasses: ['boards-message message-error']
      };
      this.matSnackbar.open(message, 'OK', config);
    })
  );

  @Effect()
  getCopyMoveBoard$ = this.actions$.pipe(
    ofType<SetCopyMove>(UIActionTypes.SET_COPY_MOVE),
    map((action) => action.payload),
    switchMap(({ boardId }) => {
      return this.boardService.getBoard(boardId);
    }),
    map((board: IBoard) => {
      return new SetCopyMoveSuccess({ board });
    })
  );

  @Effect()
  archiveCardSuccess$ = this.actions$.pipe(
    ofType<ArchiveCardSuccess>(BoardActionTypes.ARCHIVE_CARD_SUCCESS),
    map((action) => action.payload),
    map(({ inner }) => {
      return new ShowSnackBar({
        message: `Karte "${inner.title}" wurde archiviert.`
      });
    })
  );

  @Effect()
  archiveListSuccess$ = this.actions$.pipe(
    ofType<ArchiveListSuccess>(BoardActionTypes.ARCHIVE_LIST_SUCCESS),
    map((action) => action.payload),
    map(({ inner }) => {
      return new ShowSnackBar({
        message: `Liste "${inner.title}" wurde archiviert.`
      });
    })
  );

  constructor(
    private actions$: Actions,
    private boardService: BoardService,
    private matSnackbar: MatSnackBar
  ) {}
}
