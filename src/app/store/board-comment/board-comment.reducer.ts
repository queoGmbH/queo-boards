import { ICardComment } from '@boards/core/interfaces';

import {
  BoardCommentActionTypes,
  BoardCommentActionsUnion
} from './board-comment.action';

export function boardCommentReducer(
  state: ICardComment[] = [],
  action: BoardCommentActionsUnion
): ICardComment[] {
  switch (action.type) {
    case BoardCommentActionTypes.GET_BOARD_COMMENTS_SUCCESS: {
      const { boardComments, currentUser } = action.payload;
      return [
        ...boardComments.map((comment: ICardComment) => {
          return {
            ...comment,
            isAuthor: comment.createdBy.businessId === currentUser.businessId
          };
        })
      ];
    }

    default: {
      return state;
    }
  }
}
