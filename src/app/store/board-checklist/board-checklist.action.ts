import { Action } from '@ngrx/store';

import { IBoardChecklist } from '@boards/core/interfaces';

export enum BoardChecklistActionTypes {
  GET_BOARD_CHECKLISTS = '[BOARD CHECKLIST] Load Board Checklists',
  GET_BOARD_CHECKLISTS_SUCCESS = '[BOARD CHECKLIST] Load Board Checklists Success'
}

export class GetBoardChecklists implements Action {
  readonly type = BoardChecklistActionTypes.GET_BOARD_CHECKLISTS;
  constructor(public payload: { boardId: string }) {}
}

export class GetBoardChecklistsSuccess implements Action {
  readonly type = BoardChecklistActionTypes.GET_BOARD_CHECKLISTS_SUCCESS;
  constructor(public payload: { boardChecklists: IBoardChecklist[] }) {}
}

export type BoardChecklistActionsUnion =
  | GetBoardChecklists
  | GetBoardChecklistsSuccess;
