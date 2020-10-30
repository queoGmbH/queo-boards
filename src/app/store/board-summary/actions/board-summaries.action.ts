import { Action } from '@ngrx/store';

import { IBoardSummary } from '@boards/core';

export enum BoardSummaryActionTypes {
  GET_BOARD_SUMMARIES = '[BOARD SUMMARY] Get Board Summaries',
  GET_BOARD_SUMMARIES_FAIL = '[BOARD SUMMARY] Get Board Summaries Fail',
  GET_BOARD_SUMMARIES_SUCCESS = '[BOARD SUMMARY] Get Board Summaries Success',

  ADD_BOARD_SUMMARY = '[BOARD SUMMARY] Add Board Summary',
  ADD_BOARD_SUMMARY_SUCCESS = '[BOARD SUMMARY] Add Board Summary Success',

  REMOVE_BOARD_SUMMARY = '[BOARD SUMMARY] Remove Board Summary'
}

export class GetBoardSummaries implements Action {
  readonly type = BoardSummaryActionTypes.GET_BOARD_SUMMARIES;
}

export class GetBoardSummariesFail implements Action {
  readonly type = BoardSummaryActionTypes.GET_BOARD_SUMMARIES_FAIL;
  constructor(public payload: { error: any }) {}
}

export class GetBoardSummariesSuccess implements Action {
  readonly type = BoardSummaryActionTypes.GET_BOARD_SUMMARIES_SUCCESS;
  constructor(public payload: { boardSummaries: IBoardSummary[] }) {}
}

export class AddBoardSummary implements Action {
  readonly type = BoardSummaryActionTypes.ADD_BOARD_SUMMARY;
  constructor(public payload: { boardSummary: IBoardSummary }) {}
}

export class AddBoardSummarySuccess implements Action {
  readonly type = BoardSummaryActionTypes.ADD_BOARD_SUMMARY_SUCCESS;
  constructor(public payload: { boardSummary: IBoardSummary }) {}
}

export class RemoveBoardSummary implements Action {
  readonly type = BoardSummaryActionTypes.REMOVE_BOARD_SUMMARY;
  // todo: boardSummaryId
  constructor(public payload: { boardSummary: IBoardSummary }) {}
}

export type BoardSummaryActionsUnion =
  | GetBoardSummaries
  | GetBoardSummariesFail
  | GetBoardSummariesSuccess
  | AddBoardSummary
  | AddBoardSummarySuccess
  | RemoveBoardSummary;
