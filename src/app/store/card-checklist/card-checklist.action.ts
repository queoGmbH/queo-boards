import { Action } from '@ngrx/store';

import { ICardChecklist, ICardChecklistTask } from '@boards/core/interfaces';

export enum CardChecklistActionTypes {
  LOAD_CARD_CHECKLISTS = '[CARD_CHECKLIST] Load Card Checklists',
  LOAD_CARD_CHECKLISTS_SUCCESS = '[CARD_CHECKLIST] Load Card Checklists Success',

  CREATE_CARD_CHECKLIST = '[CARD_CHECKLIST] Create Card Checklist',
  CREATE_CARD_CHECKLIST_SUCCESS = '[CARD_CHECKLIST] Create Card Checklist Success',

  UPDATE_CARD_CHECKLIST_TITLE = '[CARD_CHECKLIST] Update Card Checklist',
  UPDATE_CARD_CHECKLIST_TITLE_SUCCESS = '[CARD_CHECKLIST] Update Card Checklist Success',

  REMOVE_CARD_CHECKLIST = '[CARD_CHECKLIST] Remove Card Checklist',
  REMOVE_CARD_CHECKLIST_SUCCESS = '[CARD_CHECKLIST] Remove Card Checklist Success',

  CREATE_CARD_CHECKLIST_TASK = '[CARD_CHECKLIST] Create Card Checklist Task',
  CREATE_CARD_CHECKLIST_TASK_SUCCESS = '[CARD_CHECKLIST] Create Card Checklist Task Success',

  UPDATE_CARD_CHECKLIST_TASK = '[CARD_CHECKLIST] Update Card Checklist Task',
  UPDATE_CARD_CHECKLIST_TASK_SUCCESS = '[CARD_CHECKLIST] Update Card Checklist Task Success',

  REMOVE_CARD_CHECKLIST_TASK = '[CARD_CHECKLIST] Remove Card Checklist Task',
  REMOVE_CARD_CHECKLIST_TASK_SUCCESS = '[CARD_CHECKLIST] Remove Card Checklist Task Success'
}

export class LoadCardChecklists implements Action {
  readonly type = CardChecklistActionTypes.LOAD_CARD_CHECKLISTS;
  constructor(public payload: { cardId: string }) {}
}

export class LoadCardChecklistsSuccess implements Action {
  readonly type = CardChecklistActionTypes.LOAD_CARD_CHECKLISTS_SUCCESS;
  constructor(public payload: { cardChecklists: ICardChecklist[] }) {}
}

export class CreateCardChecklist implements Action {
  readonly type = CardChecklistActionTypes.CREATE_CARD_CHECKLIST;
  constructor(
    public payload: { cardChecklist: ICardChecklist; cardId: string }
  ) {}
}

export class CreateCardChecklistSuccess implements Action {
  readonly type = CardChecklistActionTypes.CREATE_CARD_CHECKLIST_SUCCESS;
  constructor(public payload: { inner: ICardChecklist }) {}
}

export class UpdateCardChecklistTitle implements Action {
  readonly type = CardChecklistActionTypes.UPDATE_CARD_CHECKLIST_TITLE;
  constructor(
    public payload: { cardChecklistId: string; cardChecklistTitle: string }
  ) {}
}

export class UpdateCardChecklistTitleSuccess implements Action {
  readonly type = CardChecklistActionTypes.UPDATE_CARD_CHECKLIST_TITLE_SUCCESS;
  constructor(public payload: { inner: ICardChecklist }) {}
}

export class RemoveCardChecklist implements Action {
  readonly type = CardChecklistActionTypes.REMOVE_CARD_CHECKLIST;
  constructor(public payload: { cardChecklist: ICardChecklist }) {}
}

export class RemoveCardChecklistSuccess implements Action {
  readonly type = CardChecklistActionTypes.REMOVE_CARD_CHECKLIST_SUCCESS;
  constructor(public payload: { inner: ICardChecklist }) {}
}

export class CreateCardChecklistTask implements Action {
  readonly type = CardChecklistActionTypes.CREATE_CARD_CHECKLIST_TASK;
  constructor(
    public payload: {
      cardChecklistId: string;
      cardChecklistTask: ICardChecklistTask;
    }
  ) {}
}

export class CreateCardChecklistTaskSuccess implements Action {
  readonly type = CardChecklistActionTypes.CREATE_CARD_CHECKLIST_TASK_SUCCESS;
  constructor(public payload: { inner: ICardChecklistTask }) {}
}

export class UpdateCardChecklistTask implements Action {
  readonly type = CardChecklistActionTypes.UPDATE_CARD_CHECKLIST_TASK;
  constructor(public payload: { cardChecklistTask: ICardChecklistTask }) {}
}

export class UpdateCardChecklistTaskSuccess implements Action {
  readonly type = CardChecklistActionTypes.UPDATE_CARD_CHECKLIST_TASK_SUCCESS;
  constructor(public payload: { inner: ICardChecklistTask }) {}
}

export class RemoveCardChecklistTask implements Action {
  readonly type = CardChecklistActionTypes.REMOVE_CARD_CHECKLIST_TASK;
  constructor(
    public payload: { cardChecklistTask: ICardChecklistTask; cardId: string }
  ) {}
}

export class RemoveCardChecklistTaskSuccess implements Action {
  readonly type = CardChecklistActionTypes.REMOVE_CARD_CHECKLIST_TASK_SUCCESS;
  constructor(public payload: { inner: ICardChecklistTask }) {}
}

export type CardChecklistActionsUnion =
  | LoadCardChecklists
  | LoadCardChecklistsSuccess
  | CreateCardChecklist
  | CreateCardChecklistSuccess
  | UpdateCardChecklistTitle
  | UpdateCardChecklistTitleSuccess
  | RemoveCardChecklist
  | RemoveCardChecklistSuccess
  | CreateCardChecklistTask
  | CreateCardChecklistTaskSuccess
  | UpdateCardChecklistTask
  | UpdateCardChecklistTaskSuccess
  | RemoveCardChecklistTask
  | RemoveCardChecklistTaskSuccess;
