import { Injectable } from '@angular/core';

import { Effect, Actions, ofType } from '@ngrx/effects';

import { filter, map, switchMap, take, withLatestFrom } from 'rxjs/operators';

import { IBoard, ICard } from '@boards/core/interfaces';

import { BoardService, CardService } from '@boards/core/services';

import {
  BoardActionTypes,
  CreateBoardMember,
  CreateBoardMemberSuccess,
  CreateBoardOwner,
  CreateBoardOwnerSuccess,
  CreateCardMember,
  CreateCardMemberSuccess,
  RemoveBoardMember,
  RemoveBoardMemberSuccess,
  RemoveBoardOwner,
  RemoveBoardOwnerSuccess,
  RemoveCardMember,
  RemoveCardMemberSuccess
} from './board.action';

@Injectable()
export class BoardUsersEffect {
  @Effect()
  createBoardMember$ = this.actions$.pipe(
    ofType<CreateBoardMember>(BoardActionTypes.CREATE_BOARD_MEMBER),
    map((action) => action.payload),
    switchMap(({ boardId, userId }) => {
      return this.boardService.createBoardMember(
        { boardId, userId },
        {
          name: BoardActionTypes.CREATE_BOARD_MEMBER_SUCCESS
        }
      );
    }),
    map((board: IBoard) => {
      return new CreateBoardMemberSuccess({ inner: board });
    })
  );

  @Effect()
  createBoardOwner$ = this.actions$.pipe(
    ofType<CreateBoardOwner>(BoardActionTypes.CREATE_BOARD_OWNER),
    map((action) => action.payload),
    switchMap(({ boardId, userId }) => {
      return this.boardService.createBoardOwner(
        { boardId, userId },
        {
          name: BoardActionTypes.CREATE_BOARD_OWNER_SUCCESS
        }
      );
    }),
    map((board: IBoard) => {
      return new CreateBoardOwnerSuccess({ inner: board });
    })
  );

  @Effect()
  createCardMember$ = this.actions$.pipe(
    ofType<CreateCardMember>(BoardActionTypes.CREATE_CARD_MEMBER),
    map((action) => action.payload),
    switchMap(({ cardId, userId }) => {
      return this.cardService
        .createCardMember(
          { cardId, userId },
          {
            name: BoardActionTypes.CREATE_CARD_MEMBER_SUCCESS
          }
        )
        .pipe(
          map((card: ICard) => {
            return new CreateCardMemberSuccess({ inner: card });
          })
        );
    })
  );

  @Effect()
  removeCardMember$ = this.actions$.pipe(
    ofType<RemoveCardMember>(BoardActionTypes.REMOVE_CARD_MEMBER),
    map((action) => action.payload),
    switchMap(({ cardId, userId }) => {
      return this.cardService
        .removeCardMember(
          { cardId, userId },
          {
            name: BoardActionTypes.REMOVE_CARD_MEMBER_SUCCESS
          }
        )
        .pipe(
          map((card: ICard) => {
            return new RemoveCardMemberSuccess({ inner: card });
          })
        );
    })
  );

  @Effect()
  removeBoardMember$ = this.actions$.pipe(
    ofType<RemoveBoardMember>(BoardActionTypes.REMOVE_BOARD_MEMBER),
    map((action) => action.payload),
    switchMap(({ boardId, userId }) => {
      return this.boardService.removeBoardMember(
        { boardId, userId },
        {
          name: BoardActionTypes.REMOVE_BOARD_MEMBER_SUCCESS
        }
      );
    }),
    map((board: IBoard) => {
      return new RemoveBoardMemberSuccess({ inner: board });
    })
  );

  @Effect()
  removeBoardOwner$ = this.actions$.pipe(
    ofType<RemoveBoardOwner>(BoardActionTypes.REMOVE_BOARD_OWNER),
    map((action) => action.payload),
    switchMap(({ boardId, userId }) => {
      return this.boardService
        .removeBoardOwner(
          { boardId, userId },
          {
            name: BoardActionTypes.REMOVE_BOARD_OWNER_SUCCESS
          }
        )
        .pipe(
          map((board: IBoard) => {
            return new RemoveBoardOwnerSuccess({ inner: board });
          })
        );
    })
  );

  constructor(
    private actions$: Actions,
    private boardService: BoardService,
    private cardService: CardService
  ) {}
}
