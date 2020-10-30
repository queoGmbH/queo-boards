import { Action } from '@ngrx/store';

import { ILabel, IUser } from '@boards/core/interfaces';

export enum BoardFilterActionTypes {
  SET_LABEL_FILTER = '[FILTER] Set Label Filter',
  SET_BOARD_USER_FILTER = '[FILTER] Set Board User Filter',

  RESET_FILTER = '[FILTER] Reset Filter'
}

export class SetLabelFilter implements Action {
  readonly type = BoardFilterActionTypes.SET_LABEL_FILTER;
  constructor(public payload: { labels: ILabel[] }) {}
}

export class SetBoardUserFilter implements Action {
  readonly type = BoardFilterActionTypes.SET_BOARD_USER_FILTER;
  constructor(public payload: { boardUsers: IUser[] }) {}
}

export class ResetFilter implements Action {
  readonly type = BoardFilterActionTypes.RESET_FILTER;
}

export type BoardFilterActionsUnion =
  | SetLabelFilter
  | SetBoardUserFilter
  | ResetFilter;
