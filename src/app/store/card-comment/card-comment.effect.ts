import { Injectable } from '@angular/core';

import { Effect, Actions, ofType } from '@ngrx/effects';

import { map, switchMap } from 'rxjs/operators';

import { ICardComment } from '@boards/core/interfaces';

import {
  CardService,
  CommentService,
  SignalrService
} from '@boards/core/services';

import {
  CardCommentActionTypes,
  CreateCardComment,
  CreateCardCommentSuccess,
  GetCardComments,
  GetCardCommentsSuccess,
  RemoveCardComment,
  RemoveCardCommentSuccess,
  UpdateCardComment,
  UpdateCardCommentSuccess
} from './card-comment.action';

@Injectable()
export class CardCommentEffect {
  @Effect()
  getCardComments$ = this.actions$.pipe(
    ofType<GetCardComments>(CardCommentActionTypes.GET_CARD_COMMENTS),
    map((action) => action.payload),
    switchMap(({ card }) => {
      return this.cardService.getCardComments(card);
    }),
    map((cardComments: ICardComment[]) => {
      return new GetCardCommentsSuccess({ cardComments });
    })
  );

  @Effect()
  createCardComment$ = this.actions$.pipe(
    ofType<CreateCardComment>(CardCommentActionTypes.CREATE_CARD_COMMENT),
    map((action) => action.payload),
    switchMap(({ card, cardComment }) => {
      return this.cardService.createCardComment(card, cardComment, {
        name: CardCommentActionTypes.CREATE_CARD_COMMENT_SUCCESS,
        boardId: this.signalrService.boardID
      });
    }),
    map((cardComment: ICardComment) => {
      return new CreateCardCommentSuccess({ cardComment });
    })
  );

  @Effect()
  updateCardComment$ = this.actions$.pipe(
    ofType<UpdateCardComment>(CardCommentActionTypes.UPDATE_CARD_COMMENT),
    map((action) => action.payload),
    switchMap(({ cardComment }) => {
      return this.commentService.updateCardComment(cardComment, {
        name: CardCommentActionTypes.UPDATE_CARD_COMMENT_SUCCESS,
        boardId: this.signalrService.boardID
      });
    }),
    map((cardComment: ICardComment) => {
      return new UpdateCardCommentSuccess({ cardComment });
    })
  );

  @Effect()
  removeCardComment$ = this.actions$.pipe(
    ofType<RemoveCardComment>(CardCommentActionTypes.REMOVE_CARD_COMMENT),
    map((action) => action.payload),
    switchMap(({ cardComment }) => {
      return this.commentService.removeCardComment(cardComment, {
        name: CardCommentActionTypes.REMOVE_CARD_COMMENT_SUCCESS,
        boardId: this.signalrService.boardID
      });
    }),
    map((cardComment: ICardComment) => {
      return new RemoveCardCommentSuccess({ cardComment });
    })
  );

  constructor(
    private actions$: Actions,
    private cardService: CardService,
    private commentService: CommentService,
    private signalrService: SignalrService
  ) {}
}
