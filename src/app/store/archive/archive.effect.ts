import { Injectable } from '@angular/core';

import { select, Store } from '@ngrx/store';
import { Effect, Actions, ofType } from '@ngrx/effects';

import { map, switchMap } from 'rxjs/operators';

import { ICard, IList } from '@boards/core/interfaces';
import { IState } from '../state.interface';

import {
  BoardService,
  CardService,
  ListService,
  SignalrService
} from '@boards/core/services';

import {
  BoardActionTypes,
  AddCardSuccess,
  AddListSuccess,
  GetCards
} from '../board';
import { GetBoardComments } from '../board-comment';

import {
  ArchiveActionTypes,
  GetArchivedCards,
  GetArchivedCardsSuccess,
  GetArchivedLists,
  GetArchivedListsSuccess,
  RestoreCard,
  RestoreCardSuccess,
  RestoreList,
  RestoreListSuccess
} from './archive.action';

@Injectable()
export class ArchiveEffect {
  @Effect()
  getArchivedCards$ = this.actions$.pipe(
    ofType<GetArchivedCards>(ArchiveActionTypes.GET_ARCHIVED_CARDS),
    map((action) => action.payload),
    switchMap(({ boardId }) => {
      return this.boardService.getArchivedCards(boardId);
    }),
    map((cards: ICard[]) => {
      return new GetArchivedCardsSuccess({ cards });
    })
  );

  @Effect()
  restoreCard$ = this.actions$.pipe(
    ofType<RestoreCard>(ArchiveActionTypes.RESTORE_CARD),
    map((action) => action.payload),
    switchMap(({ cardId }) => {
      return this.cardService.updateCardIsArchived(
        {
          cardId,
          value: false
        },
        {
          name: ArchiveActionTypes.RESTORE_CARD_SUCCESS
        }
      );
    }),
    map((card: ICard) => {
      return new RestoreCardSuccess({ card });
    })
  );

  @Effect()
  updateCardsInList$ = this.actions$.pipe(
    ofType<RestoreCardSuccess>(ArchiveActionTypes.RESTORE_CARD_SUCCESS),
    map((action) => action.payload),
    map(({ card }) => {
      return new AddCardSuccess({ inner: card });
    })
  );

  @Effect()
  updateArchivedCards$ = this.actions$.pipe(
    ofType(
      BoardActionTypes.ARCHIVE_CARD_SUCCESS,
      BoardActionTypes.ARCHIVE_LIST_SUCCESS
    ),
    switchMap(() => this.store.pipe(select((state) => state.board.businessId))),
    map((boardId: string) => {
      return new GetArchivedCards({ boardId });
    })
  );

  @Effect()
  getArchivedLists$ = this.actions$.pipe(
    ofType<GetArchivedLists>(ArchiveActionTypes.GET_ARCHIVED_LISTS),
    map((action) => action.payload),
    switchMap(({ boardId }) => {
      return this.boardService.getArchivedLists(boardId);
    }),
    map((lists: IList[]) => {
      return new GetArchivedListsSuccess({ lists });
    })
  );

  @Effect()
  restoreList$ = this.actions$.pipe(
    ofType<RestoreList>(ArchiveActionTypes.RESTORE_LIST),
    map((action) => action.payload),
    switchMap(({ listId }) => {
      return this.listService.updateListIsArchived(listId, false, {
        name: ArchiveActionTypes.RESTORE_LIST_SUCCESS
      });
    }),
    map((list: IList) => {
      return new RestoreListSuccess({ list });
    })
  );

  @Effect()
  updateListsInBoard$ = this.actions$.pipe(
    ofType<RestoreListSuccess>(ArchiveActionTypes.RESTORE_LIST_SUCCESS),
    map((action) => action.payload),
    map(({ list }) => {
      return new AddListSuccess({ inner: list });
    })
  );

  @Effect()
  updateCardsAfterListRestore$ = this.actions$.pipe(
    ofType(ArchiveActionTypes.RESTORE_LIST_SUCCESS),
    switchMap(() => this.store.pipe(select((state) => state.board.businessId))),
    map((boardId: string) => {
      return new GetCards({ boardId });
    })
  );

  @Effect()
  updateArchivedList$ = this.actions$.pipe(
    ofType(BoardActionTypes.ARCHIVE_LIST_SUCCESS),
    switchMap(() => this.store.pipe(select((state) => state.board.businessId))),
    map((boardId: string) => {
      return new GetArchivedLists({ boardId });
    })
  );

  @Effect()
  updateArchivedCardsCardsAfterListRestore$ = this.actions$.pipe(
    ofType(ArchiveActionTypes.RESTORE_LIST_SUCCESS),
    switchMap(() => this.store.pipe(select((state) => state.board.businessId))),
    map((boardId: string) => {
      return new GetArchivedCards({ boardId });
    })
  );

  @Effect()
  updateBoardComments$ = this.actions$.pipe(
    ofType(
      BoardActionTypes.ARCHIVE_CARD_SUCCESS,
      BoardActionTypes.ARCHIVE_LIST_SUCCESS,
      ArchiveActionTypes.RESTORE_CARD_SUCCESS,
      ArchiveActionTypes.RESTORE_LIST_SUCCESS
    ),
    switchMap(() => this.store.pipe(select((state) => state.board.businessId))),
    map((boardId: string) => {
      return new GetBoardComments({ boardId });
    })
  );

  constructor(
    private actions$: Actions,
    private boardService: BoardService,
    private cardService: CardService,
    private listService: ListService,
    private signalrService: SignalrService,
    private store: Store<IState>
  ) {}
}
