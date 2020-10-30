import { Action } from '@ngrx/store';

import { ICard, ICardComment } from '@boards/core/interfaces';

export enum CardCommentActionTypes {
  GET_CARD_COMMENTS = '[CARD_COMMENT] Get Card Comments',
  GET_CARD_COMMENTS_SUCCESS = '[CARD_COMMENT] Get Card Comments Success',

  CREATE_CARD_COMMENT = '[CARD_COMMENT] Create Card Comment',
  CREATE_CARD_COMMENT_SUCCESS = '[CARD_COMMENT] Create Card Comment Success',

  UPDATE_CARD_COMMENT = '[CARD_COMMENT] Update Card Comment',
  UPDATE_CARD_COMMENT_SUCCESS = '[CARD_COMMENT] Update Card Comment Success',

  REMOVE_CARD_COMMENT = '[CARD_COMMENT] Remove Card Comment',
  REMOVE_CARD_COMMENT_SUCCESS = '[CARD_COMMENT] Remove Card Comment Success'
}

export class GetCardComments implements Action {
  readonly type = CardCommentActionTypes.GET_CARD_COMMENTS;
  // todo: cardId
  constructor(public payload: { card: ICard }) {}
}

export class GetCardCommentsSuccess implements Action {
  readonly type = CardCommentActionTypes.GET_CARD_COMMENTS_SUCCESS;
  constructor(public payload: { cardComments: ICardComment[] }) {}
}

export class CreateCardComment implements Action {
  readonly type = CardCommentActionTypes.CREATE_CARD_COMMENT;
  // todo: cardId
  constructor(public payload: { card: ICard; cardComment: ICardComment }) {}
}

export class CreateCardCommentSuccess implements Action {
  readonly type = CardCommentActionTypes.CREATE_CARD_COMMENT_SUCCESS;
  // todo: cardId
  constructor(public payload: { cardComment: ICardComment }) {}
}

export class UpdateCardComment implements Action {
  readonly type = CardCommentActionTypes.UPDATE_CARD_COMMENT;
  constructor(public payload: { cardComment: ICardComment }) {}
}

export class UpdateCardCommentSuccess implements Action {
  readonly type = CardCommentActionTypes.UPDATE_CARD_COMMENT_SUCCESS;
  constructor(public payload: { cardComment: ICardComment }) {}
}

export class RemoveCardComment implements Action {
  readonly type = CardCommentActionTypes.REMOVE_CARD_COMMENT;
  // todo: cardId
  constructor(public payload: { cardComment: ICardComment }) {}
}

export class RemoveCardCommentSuccess implements Action {
  readonly type = CardCommentActionTypes.REMOVE_CARD_COMMENT_SUCCESS;
  // todo: cardId???
  constructor(public payload: { cardComment: ICardComment }) {}
}

export type CardCommentActionsUnion =
  | GetCardComments
  | GetCardCommentsSuccess
  | CreateCardComment
  | CreateCardCommentSuccess
  | UpdateCardComment
  | UpdateCardCommentSuccess
  | RemoveCardComment
  | RemoveCardCommentSuccess;
