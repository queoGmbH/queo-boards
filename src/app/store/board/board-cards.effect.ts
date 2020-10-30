import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

import { select, Store } from '@ngrx/store';
import { Effect, Actions, ofType } from '@ngrx/effects';

import { filter, map, switchMap, tap, withLatestFrom } from 'rxjs/operators';

import { IBoard, ICard, IMove } from '@boards/core';
import { BoardActions } from '@boards/core/enums';

import { IState } from '../state.interface';

import { BoardService, CardService, ListService } from '@boards/core/services';

import {
  BoardActionTypes,
  ArchiveCard,
  ArchiveCardSuccess,
  UpdateCardTitle,
  UpdateCardTitleSuccess,
  UpdateCardDescription,
  UpdateCardDescriptionSuccess,
  CreateCardDueDate,
  CreateCardDueDateSuccess,
  RemoveCardDueDate,
  RemoveCardDueDateSuccess,
  AddCard,
  AddCardSuccess,
  GetCard,
  GetCardSuccess,
  GetCards,
  GetCardsSuccess,
  MoveCard,
  MoveCardSuccess,
  CopyCard,
  CopyCardSuccess,
  // todo: check this
  MoveCardCurrentSuccess,
  MoveCardSuccessSignalR,
  ArchiveCardSuccessSignalR,
  CopyCardSuccessSignalR,
  AddCardAndOpen,
  AddCardAndOpenSuccess
} from './board.action';

import { CardDetailDialogComponent } from '@boards/features/board/containers';
import { ShowSnackBar } from '@boards/store/ui';

@Injectable()
export class BoardCardsEffect {
  @Effect()
  archiveCard$ = this.actions$.pipe(
    ofType<ArchiveCard>(BoardActionTypes.ARCHIVE_CARD),
    map((action) => action.payload),
    switchMap(({ cardId, value }) => {
      return this.cardService.updateCardIsArchived(
        { cardId, value },
        {
          name: BoardActionTypes.ARCHIVE_CARD_SUCCESS_SIGNAL_R
        }
      );
    }),
    map((inner: ICard) => {
      return new ArchiveCardSuccess({ inner });
    })
  );

  @Effect()
  updateCardTitle$ = this.actions$.pipe(
    ofType<UpdateCardTitle>(BoardActionTypes.UPDATE_CARD_TITLE),
    map((action) => action.payload),
    switchMap(({ title, card }) => {
      return this.cardService.updateCardTitle(title, card, {
        name: BoardActionTypes.UPDATE_CARD_TITLE_SUCCESS
      });
    }),
    map((inner: ICard) => {
      return new UpdateCardTitleSuccess({ inner });
    })
  );

  @Effect()
  updateCardDescription$ = this.actions$.pipe(
    ofType<UpdateCardDescription>(BoardActionTypes.UPDATE_CARD_DESCRIPTION),
    map((action) => action.payload),
    switchMap(({ description, cardId }) => {
      return this.cardService.updateCardDescription(description, cardId, {
        name: BoardActionTypes.UPDATE_CARD_DESCRIPTION_SUCCESS
      });
    }),
    map((inner: ICard) => {
      return new UpdateCardDescriptionSuccess({ inner });
    })
  );

  @Effect()
  createCardDueDate$ = this.actions$.pipe(
    ofType<CreateCardDueDate>(BoardActionTypes.CREATE_CARD_DUE_DATE),
    map((action) => action.payload),
    switchMap(({ dueDate, card }) => {
      return this.cardService.createCardDueDate(dueDate, card, {
        name: BoardActionTypes.CREATE_CARD_DUE_DATE_SUCCESS
      });
    }),
    map((inner: ICard) => {
      return new CreateCardDueDateSuccess({ inner });
    })
  );

  @Effect()
  removeCardDueDate$ = this.actions$.pipe(
    ofType<RemoveCardDueDate>(BoardActionTypes.REMOVE_CARD_DUE_DATE),
    map((action) => action.payload),
    switchMap(({ cardId }) => {
      return this.cardService.removeCardDueDate(cardId, {
        name: BoardActionTypes.REMOVE_CARD_DUE_DATE_SUCCESS
      });
    }),
    map((inner: ICard) => {
      return new RemoveCardDueDateSuccess({ inner });
    })
  );

  @Effect()
  addCard$ = this.actions$.pipe(
    ofType<AddCard>(BoardActionTypes.ADD_CARD),
    map((action) => action.payload),
    switchMap(({ title, list }) => {
      return this.listService.createCard(title, list, {
        name: BoardActionTypes.ADD_CARD_SUCCESS
      });
    }),
    map((inner: ICard) => {
      return new AddCardSuccess({ inner });
    })
  );

  @Effect()
  addAndOpenCard$ = this.actions$.pipe(
    ofType<AddCardAndOpen>(BoardActionTypes.ADD_CARD_AND_OPEN),
    map((action) => action.payload),
    switchMap(({ title, list }) => {
      return this.listService.createCard(title, list, {
        name: BoardActionTypes.ADD_CARD_SUCCESS
      });
    }),
    map((inner: ICard) => {
      return new AddCardAndOpenSuccess({ inner });
    })
  );

  @Effect({ dispatch: false })
  openCard$ = this.actions$.pipe(
    ofType<AddCardAndOpenSuccess>(BoardActionTypes.ADD_CARD_AND_OPEN_SUCCESS),
    map((action) => action.payload),
    tap(({ inner }) => {
      this.router.navigate([
        `/board/${inner.list.board.businessId}/card/${inner.businessId}`
      ]);
    })
  );

  @Effect()
  getCard$ = this.actions$.pipe(
    ofType<GetCard>(BoardActionTypes.GET_CARD),
    map((action) => action.payload),
    switchMap(({ cardId }) => {
      return this.cardService.getCard(cardId);
    }),
    map((inner: ICard) => {
      return new GetCardSuccess({ inner });
    })
  );

  @Effect()
  getCards$ = this.actions$.pipe(
    ofType<GetCards>(BoardActionTypes.GET_CARDS),
    map((action) => action.payload),
    switchMap(({ boardId }) => {
      return this.boardService.getCards(boardId);
    }),
    map((inner: ICard[]) => {
      return new GetCardsSuccess({ inner });
    })
  );

  @Effect()
  moveCard$ = this.actions$.pipe(
    ofType<MoveCard>(BoardActionTypes.MOVE_CARD),
    map((action) => action.payload),
    switchMap(({ targetId, body }) => {
      return this.cardService.moveCard(targetId, body, {
        name: BoardActionTypes.MOVE_CARD_SUCCESS_SIGNAL_R
      });
    }),
    withLatestFrom(
      this.store$.pipe(
        select((state: IState): string => state.ui.currentCardId)
      )
    ),
    map(([inner, currentCardId]: [IMove, string]) => {
      const current = this.isCurrent(inner);
      if (currentCardId) {
        let cardDialog: MatDialogRef<CardDetailDialogComponent>;
        cardDialog = this.matDialog.getDialogById(currentCardId);

        if (cardDialog) {
          cardDialog.close({
            action: current
              ? BoardActions.MOVE_CARD
              : BoardActions.MOVE_CARD_OTHER,
            data: { inner }
          });
        }
      }
      return new MoveCardCurrentSuccess({ inner });
    })
    // todo: ignore elements
  );

  @Effect()
  moveCardSuccessSignalR = this.actions$.pipe(
    ofType<MoveCardSuccessSignalR>(BoardActionTypes.MOVE_CARD_SUCCESS_SIGNAL_R),
    map((action) => action.payload),
    withLatestFrom(this.store$.pipe(select((state: IState) => state))),
    filter(([{ inner }, state]) => {
      return inner.target.businessId === state.board.businessId;
    }),
    map(([{ inner }, state]) => {
      console.log('moveCardSuccessSignalR command dispatched', inner);

      const currentCardId = state.ui.currentCardId;
      if (currentCardId === inner.moved.businessId) {
        let cardDialog: MatDialogRef<CardDetailDialogComponent>;
        cardDialog = this.matDialog.getDialogById(currentCardId);
        if (cardDialog) {
          cardDialog.close({
            action: BoardActions.MOVE_CARD_SIGNAL_R,
            data: { inner }
          });
        }
      } else {
        return new MoveCardSuccess({ inner });
      }
    })
    // todo: ignore elements
  );

  @Effect()
  archiveCardSuccessSignalR$ = this.actions$.pipe(
    ofType<ArchiveCardSuccessSignalR>(
      BoardActionTypes.ARCHIVE_CARD_SUCCESS_SIGNAL_R
    ),
    map((action) => action.payload),
    withLatestFrom(
      this.store$.pipe(select((state: IState) => state.ui.currentCardId))
    ),
    map(([{ inner }, currentCardId]) => {
      if (currentCardId && inner.businessId === currentCardId) {
        let cardDialog: MatDialogRef<CardDetailDialogComponent>;
        cardDialog = this.matDialog.getDialogById(inner.businessId);
        if (cardDialog) {
          cardDialog.close({
            action: BoardActions.ARCHIVE_CARD_SUCCESS,
            data: inner
          });
        }
      } else {
        return new ArchiveCardSuccess({ inner });
      }
    })
    // todo: ignore elements
  );

  @Effect()
  copyCard$ = this.actions$.pipe(
    ofType<CopyCard>(BoardActionTypes.COPY_CARD),
    map((action) => action.payload),
    switchMap(({ targetId, body }) => {
      return this.cardService.copyCard(targetId, body, {
        name: BoardActionTypes.COPY_CARD_SUCCESS_SIGNAL_R
      });
    }),
    withLatestFrom(this.store$.pipe(select((state: IState) => state))),
    filter(([board, state]: [IBoard, IState]) => {
      return board.businessId === state.board.businessId;
    }),
    map(([inner, state]: [IBoard, IState]) => {
      return new CopyCardSuccess({ inner });
    })
  );

  @Effect()
  copyCardSuccessSignalR = this.actions$.pipe(
    ofType<CopyCardSuccessSignalR>(BoardActionTypes.COPY_CARD_SUCCESS_SIGNAL_R),
    map((action) => action.payload),
    withLatestFrom(this.store$.pipe(select((state: IState) => state))),
    filter(([{ inner }, state]) => {
      return inner.businessId === state.board.businessId;
    }),
    map(([{ inner }, state]) => {
      return new CopyCardSuccess({ inner });
    })
  );

  constructor(
    private actions$: Actions,
    private boardService: BoardService,
    private cardService: CardService,
    private listService: ListService,
    private matDialog: MatDialog,
    private store$: Store<IState>,
    private router: Router
  ) {}

  isCurrent(move: IMove) {
    return move.source.businessId === move.target.businessId;
  }
}
