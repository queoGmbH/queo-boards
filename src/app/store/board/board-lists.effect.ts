import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

import { select, Store } from '@ngrx/store';
import { Effect, Actions, ofType } from '@ngrx/effects';

import { filter, map, switchMap, take, withLatestFrom } from 'rxjs/operators';

import { IBoard, IList, IMove } from '@boards/core/interfaces';
import { IState } from '../state.interface';

import { BoardService, ListService } from '@boards/core/services';

import { CardDetailDialogComponent } from '@boards/features/board/containers';

import {
  BoardActionTypes,
  ArchiveList,
  ArchiveListSuccess,
  UpdateList,
  UpdateListSuccess,
  AddList,
  AddListSuccess,
  CopyList,
  CopyListSuccess,
  MoveListCurrentSuccess,
  MoveList,
  MoveListSuccess,
  ArchiveListSuccessSignalR,
  CopyListSuccessSignalR,
  MoveListSuccessSignalR
} from './board.action';

@Injectable()
export class BoardListsEffect {
  @Effect()
  archiveList$ = this.actions$.pipe(
    ofType<ArchiveList>(BoardActionTypes.ARCHIVE_LIST),
    map((action) => action.payload),
    switchMap(({ listId, value }) => {
      return this.listService.updateListIsArchived(listId, value, {
        name: BoardActionTypes.ARCHIVE_LIST_SUCCESS_SIGNAL_R
      });
    }),
    map((inner: IList) => {
      return new ArchiveListSuccess({ inner });
    })
  );

  @Effect()
  updateList$ = this.actions$.pipe(
    ofType<UpdateList>(BoardActionTypes.UPDATE_LIST),
    map((action) => action.payload),
    switchMap(({ title, list }) => {
      return this.listService.updateList(title, list, {
        name: BoardActionTypes.UPDATE_LIST_SUCCESS
      });
    }),
    map((inner) => {
      return new UpdateListSuccess({ inner });
    })
  );

  @Effect()
  addList$ = this.actions$.pipe(
    ofType<AddList>(BoardActionTypes.ADD_LIST),
    map((action) => action.payload),
    switchMap(({ title, boardId }) => {
      return this.boardService.createList(title, boardId, {
        name: BoardActionTypes.ADD_LIST_SUCCESS
      });
    }),
    map((inner: IList) => {
      return new AddListSuccess({ inner });
    })
  );

  @Effect()
  archiveListSignalR$ = this.actions$.pipe(
    ofType<ArchiveListSuccessSignalR>(
      BoardActionTypes.ARCHIVE_LIST_SUCCESS_SIGNAL_R
    ),
    map((action) => action.payload),
    withLatestFrom(
      this.store$.pipe(
        select((state: IState): string => state.ui.currentCardId)
      )
    ),
    map(([{ inner }, currentCardId]) => {
      const currentCardInList = inner.cards.find(
        (card) => card.businessId === currentCardId
      );
      if (currentCardInList) {
        let cardDialog: MatDialogRef<CardDetailDialogComponent>;
        cardDialog = this.matDialog.getDialogById(currentCardInList.businessId);
        if (cardDialog) {
          cardDialog.close({ currentCardInList });
          cardDialog
            .afterClosed()
            .pipe(take(1))
            .subscribe(() => {
              this.store$.dispatch(new ArchiveListSuccess({ inner }));
            });
        }
      } else {
        this.store$.dispatch(new ArchiveListSuccess({ inner }));
      }
    })
  );

  @Effect()
  copyList$ = this.actions$.pipe(
    ofType<CopyList>(BoardActionTypes.COPY_LIST),
    map((action) => action.payload),
    switchMap(({ targetId, body }) => {
      return this.listService.copyList(targetId, body, {
        name: BoardActionTypes.COPY_LIST_SUCCESS_SIGNAL_R
      });
    }),
    withLatestFrom(
      this.store$.pipe(select((state: IState) => state.board.businessId))
    ),
    filter(
      ([board, boardId]: [IBoard, string]) => board.businessId === boardId
    ),
    map(([inner, boardId]: [IBoard, string]) => {
      return new CopyListSuccess({ inner });
    })
  );

  @Effect()
  copyListSuccessSignalR$ = this.actions$.pipe(
    ofType<CopyListSuccessSignalR>(BoardActionTypes.COPY_LIST_SUCCESS_SIGNAL_R),
    map((action) => action.payload),
    withLatestFrom(this.store$.pipe(select((state: IState) => state))),
    filter(([{ inner }, state]) => {
      return inner.businessId === state.board.businessId;
    }),
    map(([{ inner }, state]) => {
      return new CopyListSuccess({ inner });
    })
  );

  @Effect()
  moveList$ = this.actions$.pipe(
    ofType<MoveList>(BoardActionTypes.MOVE_LIST),
    map((action) => action.payload),
    switchMap(({ targetId, body }) => {
      return this.listService.moveList(targetId, body, {
        name: BoardActionTypes.MOVE_LIST_SUCCESS_SIGNAL_R
      });
    }),
    map((inner: IMove) => {
      return new MoveListCurrentSuccess({ inner });
    })
  );

  @Effect()
  moveListSuccessSignalR = this.actions$.pipe(
    ofType<MoveListSuccessSignalR>(BoardActionTypes.MOVE_LIST_SUCCESS_SIGNAL_R),
    map((action) => action.payload),
    withLatestFrom(this.store$.pipe(select((state: IState) => state))),
    filter(([{ inner }, state]) => {
      return inner.target.businessId === state.board.businessId;
    }),
    map(([{ inner }, state]) => {
      return new MoveListSuccess({ inner });
    })
  );

  constructor(
    private actions$: Actions,
    private boardService: BoardService,
    private listService: ListService,
    private matDialog: MatDialog,
    private store$: Store<IState>
  ) {}
}
