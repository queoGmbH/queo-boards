import { Injectable } from '@angular/core';

import { Effect, Actions, ofType } from '@ngrx/effects';

import { map, switchMap } from 'rxjs/operators';

import { ICard, ILabel } from '@boards/core/interfaces';

import { BoardService, CardService, LabelService } from '@boards/core/services';

import {
  BoardActionTypes,
  CreateBoardLabel,
  CreateBoardLabelSuccess,
  UpdateBoardLabel,
  UpdateBoardLabelSuccess,
  RemoveBoardLabel,
  RemoveBoardLabelSuccess,
  UpdateCardLabel,
  UpdateCardLabelSuccess,
  RemoveCardLabel,
  RemoveCardLabelSuccess
} from './board.action';

@Injectable()
export class BoardLabelsEffect {
  @Effect()
  createBoardLabel$ = this.actions$.pipe(
    ofType<CreateBoardLabel>(BoardActionTypes.CREATE_BOARD_LABEL),
    map((action) => action.payload),
    switchMap(({ label }) => {
      return this.boardService.createBoardLabel(label, {
        name: BoardActionTypes.CREATE_BOARD_LABEL_SUCCESS
      });
    }),
    map((label: ILabel) => {
      return new CreateBoardLabelSuccess({ inner: label });
    })
  );

  @Effect()
  updateBoardLabel$ = this.actions$.pipe(
    ofType<UpdateBoardLabel>(BoardActionTypes.UPDATE_BOARD_LABEL),
    map((action) => action.payload),
    switchMap(({ label }) => {
      return this.labelService.updateBoardLabel(label, {
        name: BoardActionTypes.UPDATE_BOARD_LABEL_SUCCESS
      });
    }),
    map((label: ILabel) => {
      return new UpdateBoardLabelSuccess({ inner: label });
    })
  );

  @Effect()
  removeBoardLabel$ = this.actions$.pipe(
    ofType<RemoveBoardLabel>(BoardActionTypes.REMOVE_BOARD_LABEL),
    map((action) => action.payload),
    switchMap(({ label }) => {
      return this.labelService.removeBoardLabel(label, {
        name: BoardActionTypes.REMOVE_BOARD_LABEL_SUCCESS
      });
    }),
    map((label: ILabel) => {
      return new RemoveBoardLabelSuccess({ inner: label });
    })
  );

  @Effect()
  updateCardLabel$ = this.actions$.pipe(
    ofType<UpdateCardLabel>(BoardActionTypes.UPDATE_CARD_LABEL),
    map((action) => action.payload),
    switchMap(({ label, card }) => {
      return this.cardService.updateCardLabel(label, card, {
        name: BoardActionTypes.UPDATE_CARD_LABEL_SUCCESS
      });
    }),
    map((card: ICard) => {
      return new UpdateCardLabelSuccess({ inner: card });
    })
  );

  @Effect()
  removeCardLabel$ = this.actions$.pipe(
    ofType<RemoveCardLabel>(BoardActionTypes.REMOVE_CARD_LABEL),
    map((action) => action.payload),
    switchMap(({ label, card }) => {
      return this.cardService.removeCardLabel(label, card, {
        name: BoardActionTypes.REMOVE_CARD_LABEL_SUCCESS
      });
    }),
    map((card: ICard) => {
      return new RemoveCardLabelSuccess({ inner: card });
    })
  );

  constructor(
    private actions$: Actions,
    private boardService: BoardService,
    private cardService: CardService,
    private labelService: LabelService
  ) {}
}
