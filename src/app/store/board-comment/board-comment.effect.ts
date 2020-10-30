import { Injectable } from '@angular/core';

import { select, Store } from '@ngrx/store';
import { Effect, Actions, ofType } from '@ngrx/effects';

import { map, switchMap, withLatestFrom } from 'rxjs/operators';

import { ICardComment, IUser } from '@boards/core/interfaces';
import { IState } from '../state.interface';

import { BoardService } from '@boards/core/services';

import { CardCommentActionTypes } from '../card-comment';
import { BoardActionTypes } from '../board';

import {
  BoardCommentActionTypes,
  GetBoardComments,
  GetBoardCommentsSuccess
} from './board-comment.action';

@Injectable()
export class BoardCommentEffect {
  @Effect()
  getBoardComments$ = this.actions$.pipe(
    ofType<GetBoardComments>(BoardCommentActionTypes.GET_BOARD_COMMENTS),
    map((action) => action.payload),
    switchMap(({ boardId }) => {
      return this.boardService.getBoardComments(boardId);
    }),
    withLatestFrom(
      this.store.pipe(select((state: IState) => state.users.currentUser))
    ),
    map(([boardComments, currentUser]: [ICardComment[], IUser]) => {
      return new GetBoardCommentsSuccess({ boardComments, currentUser });
    })
  );

  @Effect()
  updateBoardComment$ = this.actions$.pipe(
    ofType(
      CardCommentActionTypes.CREATE_CARD_COMMENT_SUCCESS,
      CardCommentActionTypes.UPDATE_CARD_COMMENT_SUCCESS,
      CardCommentActionTypes.REMOVE_CARD_COMMENT_SUCCESS,
      // todo: check comments in card/list before updating comments?
      BoardActionTypes.COPY_CARD_SUCCESS,
      BoardActionTypes.COPY_LIST_SUCCESS,
      BoardActionTypes.COPY_LIST_SUCCESS,
      BoardActionTypes.MOVE_CARD_SUCCESS
    ),
    switchMap(() => this.store.pipe(select((state) => state.board.businessId))),
    map((boardId: string) => {
      return new GetBoardComments({ boardId });
    })
  );

  constructor(
    private actions$: Actions,
    private boardService: BoardService,
    private store: Store<IState>
  ) {}
}
