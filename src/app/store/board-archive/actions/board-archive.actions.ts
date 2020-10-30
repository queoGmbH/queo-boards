import { Action } from '@ngrx/store';

import {
  IBoardSummary,
  IBreadcrumbBoard
} from '../../../core/interfaces/index';

export enum BoardArchiveActionTypes {
  GET_ARCHIVED_BOARDS = '[BOARD_ARCHIVE] Get Archived Boards',
  GET_ARCHIVED_BOARDS_SUCCESS = '[BOARD_ARCHIVE] Get Archived Boards Success',

  CREATE_ARCHIVED_BOARD = '[BOARD_ARCHIVE] Create Archived Board',
  CREATE_ARCHIVED_BOARD_SUCCESS = '[BOARD_ARCHIVE] Create Archived Board Success',

  RESTORE_ARCHIVED_BOARD = '[BOARD_ARCHIVE] Restore Archived Board',
  RESTORE_ARCHIVED_BOARD_SUCCESS = '[BOARD_ARCHIVE] Restore Archived Board Success',

  REMOVE_ARCHIVED_BOARD = '[BOARD_ARCHIVE] Remove Archived Board',
  REMOVE_ARCHIVED_BOARD_SUCCESS = '[BOARD_ARCHIVE] Remove Archived Board Success'
}

export class GetArchivedBoards implements Action {
  readonly type = BoardArchiveActionTypes.GET_ARCHIVED_BOARDS;
}

export class GetArchivedBoardsSuccess implements Action {
  readonly type = BoardArchiveActionTypes.GET_ARCHIVED_BOARDS_SUCCESS;
  constructor(public payload: { boardSummaries: IBoardSummary[] }) {}
}

export class CreateArchivedBoard implements Action {
  readonly type = BoardArchiveActionTypes.CREATE_ARCHIVED_BOARD;
  constructor(public payload: { boardSummary: IBoardSummary }) {}
}

export class CreateArchivedBoardSuccess implements Action {
  readonly type = BoardArchiveActionTypes.CREATE_ARCHIVED_BOARD_SUCCESS;
  constructor(public payload: { boardSummary: IBoardSummary }) {}
}

export class RestoreArchivedBoard implements Action {
  readonly type = BoardArchiveActionTypes.RESTORE_ARCHIVED_BOARD;
  constructor(public payload: { boardSummary: IBoardSummary }) {}
}

export class RestoreArchivedBoardSuccess implements Action {
  readonly type = BoardArchiveActionTypes.RESTORE_ARCHIVED_BOARD_SUCCESS;
  constructor(public payload: { boardSummary: IBoardSummary }) {}
}

export class RemoveArchivedBoard implements Action {
  readonly type = BoardArchiveActionTypes.REMOVE_ARCHIVED_BOARD;
  constructor(public payload: { boardSummary: IBoardSummary }) {}
}

export class RemoveArchivedBoardSuccess implements Action {
  readonly type = BoardArchiveActionTypes.REMOVE_ARCHIVED_BOARD_SUCCESS;
  // todo: check payload
  constructor(public payload: { breadcrumbBoard: IBreadcrumbBoard }) {}
}

export type BoardArchiveActionsUnion =
  | GetArchivedBoards
  | GetArchivedBoardsSuccess
  | CreateArchivedBoard
  | CreateArchivedBoardSuccess
  | RestoreArchivedBoard
  | RestoreArchivedBoardSuccess
  | RemoveArchivedBoard
  | RemoveArchivedBoardSuccess;
