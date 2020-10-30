import { Action } from '@ngrx/store';

import { ICard, IBoard } from '@boards/core/interfaces';

export enum UIActionTypes {
  SET_CURRENT_CARD = '[UI] Set Current Card',
  RESET_CURRENT_CARD = '[UI] Reset Current Card',

  SET_CURRENT_CARD_ID = '[UI] Set Current Card Id',
  RESET_CURRENT_CARD_ID = '[UI] Reset Current Card Id',

  SET_COPY_MOVE = '[UI] Set Copy Move',
  SET_COPY_MOVE_SUCCESS = '[UI] Set Copy Move Success',
  RESET_COPY_MOVE = '[UI] Reset Copy Move',

  SHOW_SNACK_BAR = '[UI] Show Snack bar',
  SHOW_SNACK_BAR_ERROR = '[UI] Show Snack bar Error'
}

export class SetCurrentCard implements Action {
  readonly type = UIActionTypes.SET_CURRENT_CARD;
  constructor(public payload: { currentCard: ICard }) {}
}

export class ResetCurrentCard implements Action {
  readonly type = UIActionTypes.RESET_CURRENT_CARD;
}

export class SetCurrentCardId implements Action {
  readonly type = UIActionTypes.SET_CURRENT_CARD_ID;
  constructor(public payload: { currentCardId: string }) {}
}

export class ResetCurrentCardId implements Action {
  readonly type = UIActionTypes.RESET_CURRENT_CARD_ID;
}

export class SetCopyMove implements Action {
  readonly type = UIActionTypes.SET_COPY_MOVE;
  constructor(public payload: { boardId: string }) {}
}

export class SetCopyMoveSuccess implements Action {
  readonly type = UIActionTypes.SET_COPY_MOVE_SUCCESS;
  constructor(public payload: { board: IBoard }) {}
}

export class ResetCopyMove implements Action {
  readonly type = UIActionTypes.RESET_COPY_MOVE;
}

export class ShowSnackBar implements Action {
  readonly type = UIActionTypes.SHOW_SNACK_BAR;
  constructor(public payload: { message: string }) {}
}

export class ShowSnackBarError implements Action {
  readonly type = UIActionTypes.SHOW_SNACK_BAR_ERROR;
  constructor(public payload: { message: string }) {}
}

export type UIActionsUnion =
  | SetCurrentCard
  | ResetCurrentCard
  | SetCurrentCardId
  | ResetCurrentCardId
  | SetCopyMove
  | SetCopyMoveSuccess
  | ResetCopyMove
  | ShowSnackBar
  | ShowSnackBarError;
