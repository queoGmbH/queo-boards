import { Action } from '@ngrx/store';

import { ICardComment, IUser } from '@boards/core/interfaces';

export enum BoardCommentActionTypes {
  GET_BOARD_COMMENTS = '[BOARD COMMENTS] Get Board Comments',
  GET_BOARD_COMMENTS_SUCCESS = '[BOARD COMMENTS] Get Board Comments Success'
}

export class GetBoardComments implements Action {
  readonly type = BoardCommentActionTypes.GET_BOARD_COMMENTS;
  constructor(public payload: { boardId: string }) {}
}

export class GetBoardCommentsSuccess implements Action {
  readonly type = BoardCommentActionTypes.GET_BOARD_COMMENTS_SUCCESS;
  constructor(
    public payload: { boardComments: ICardComment[]; currentUser: IUser }
  ) {}
}

export type BoardCommentActionsUnion =
  | GetBoardComments
  | GetBoardCommentsSuccess;
