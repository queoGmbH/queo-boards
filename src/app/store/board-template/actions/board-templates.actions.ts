import { Action } from '@ngrx/store';

import {
  IBoardSummary,
  IBreadcrumbBoard
} from '../../../core/interfaces/index';

export enum BoardTemplateActionTypes {
  GET_BOARD_TEMPLATES = '[TEMPLATE] Get Board Templates',
  GET_BOARD_TEMPLATES_FAIL = '[TEMPLATE] Get Board Templates Fail',
  GET_BOARD_TEMPLATES_SUCCESS = '[TEMPLATE] Get Board Templates Success',

  CREATE_BOARD_TEMPLATE = '[TEMPLATE] Create Board Template',
  CREATE_BOARD_TEMPLATE_SUCCESS = '[TEMPLATE] Create Board Template Success',

  REMOVE_BOARD_TEMPLATE = '[TEMPLATE] Remove Board Template',
  REMOVE_BOARD_TEMPLATE_SUCCESS = '[TEMPLATE] Remove Board Template Success'
}

export class GetBoardTemplates implements Action {
  readonly type = BoardTemplateActionTypes.GET_BOARD_TEMPLATES;
}

export class GetBoardTemplatesFail implements Action {
  readonly type = BoardTemplateActionTypes.GET_BOARD_TEMPLATES_FAIL;
  constructor(public payload: { error: any }) {}
}

export class GetBoardTemplatesSuccess implements Action {
  readonly type = BoardTemplateActionTypes.GET_BOARD_TEMPLATES_SUCCESS;
  constructor(public payload: { templates: IBoardSummary[] }) {}
}

export class CreateBoardTemplate implements Action {
  readonly type = BoardTemplateActionTypes.CREATE_BOARD_TEMPLATE;
  constructor(public payload: { template: IBoardSummary }) {}
}

export class CreateBoardTemplateSuccess implements Action {
  readonly type = BoardTemplateActionTypes.CREATE_BOARD_TEMPLATE_SUCCESS;
  constructor(public payload: { template: IBoardSummary }) {}
}

export class RemoveBoardTemplate implements Action {
  readonly type = BoardTemplateActionTypes.REMOVE_BOARD_TEMPLATE;
  constructor(public payload: { template: IBoardSummary }) {}
}

export class RemoveBoardTemplateSuccess implements Action {
  readonly type = BoardTemplateActionTypes.REMOVE_BOARD_TEMPLATE_SUCCESS;
  constructor(public payload: { breadcrumbBoard: IBreadcrumbBoard }) {}
}

export type BoardTemplateActionsUnion =
  | GetBoardTemplates
  | GetBoardTemplatesFail
  | GetBoardTemplatesSuccess
  | CreateBoardTemplate
  | CreateBoardTemplateSuccess
  | RemoveBoardTemplate
  | RemoveBoardTemplateSuccess;
