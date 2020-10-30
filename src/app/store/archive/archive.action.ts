import { Action } from '@ngrx/store';

import { ICard, IList } from '@boards/core/interfaces';

export enum ArchiveActionTypes {
  GET_ARCHIVED_CARDS = '[ARCHIVE] Get Archived Cards',
  GET_ARCHIVED_CARDS_SUCCESS = '[ARCHIVE] Get Archived Cards Success',
  RESTORE_CARD = '[ARCHIVE] Restore Card',
  RESTORE_CARD_SUCCESS = '[ARCHIVE] Restore Card Success',

  GET_ARCHIVED_LISTS = '[ARCHIVE] Get Archived Lists',
  GET_ARCHIVED_LISTS_SUCCESS = '[ARCHIVE] Get Archived Lists Success',
  RESTORE_LIST = '[ARCHIVE] Restore List',
  RESTORE_LIST_SUCCESS = '[ARCHIVE] Restore List Success'
}

export class GetArchivedCards implements Action {
  readonly type = ArchiveActionTypes.GET_ARCHIVED_CARDS;
  constructor(public payload: { boardId: string }) {}
}

export class GetArchivedCardsSuccess implements Action {
  readonly type = ArchiveActionTypes.GET_ARCHIVED_CARDS_SUCCESS;
  constructor(public payload: { cards: ICard[] }) {}
}

export class RestoreCard implements Action {
  readonly type = ArchiveActionTypes.RESTORE_CARD;
  constructor(public payload: { cardId: string }) {}
}

export class RestoreCardSuccess implements Action {
  readonly type = ArchiveActionTypes.RESTORE_CARD_SUCCESS;
  constructor(public payload: { card: ICard }) {}
}

export class GetArchivedLists implements Action {
  readonly type = ArchiveActionTypes.GET_ARCHIVED_LISTS;
  constructor(public payload: { boardId: string }) {}
}

export class GetArchivedListsSuccess implements Action {
  readonly type = ArchiveActionTypes.GET_ARCHIVED_LISTS_SUCCESS;
  constructor(public payload: { lists: IList[] }) {}
}

export class RestoreList implements Action {
  readonly type = ArchiveActionTypes.RESTORE_LIST;
  constructor(public payload: { listId: string }) {}
}

export class RestoreListSuccess implements Action {
  readonly type = ArchiveActionTypes.RESTORE_LIST_SUCCESS;
  constructor(public payload: { list: IList }) {}
}

export type ArchiveActionsUnion =
  | GetArchivedCards
  | GetArchivedCardsSuccess
  | RestoreCard
  | RestoreCardSuccess
  | GetArchivedLists
  | GetArchivedListsSuccess
  | RestoreList
  | RestoreListSuccess;
