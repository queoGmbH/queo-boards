import { ICardComment } from '@boards/core/interfaces';

import {
  CardCommentActionTypes,
  CardCommentActionsUnion
} from './card-comment.action';

const INITIAL_STATE: ICardComment[] = [];

export function cardCommentReducer(
  state: ICardComment[] = INITIAL_STATE,
  action: CardCommentActionsUnion
): ICardComment[] {
  switch (action.type) {
    case CardCommentActionTypes.GET_CARD_COMMENTS_SUCCESS: {
      const { cardComments } = action.payload;
      return [...cardComments];
    }

    case CardCommentActionTypes.CREATE_CARD_COMMENT_SUCCESS: {
      const { cardComment } = action.payload;
      return [...state, cardComment];
    }

    case CardCommentActionTypes.UPDATE_CARD_COMMENT_SUCCESS:
    case CardCommentActionTypes.REMOVE_CARD_COMMENT_SUCCESS: {
      const { cardComment } = action.payload;
      return [
        ...state.map((comment) => {
          if (comment.businessId === cardComment.businessId) {
            return cardComment;
          }
          return comment;
        })
      ];
    }

    default: {
      return state;
    }
  }
}
