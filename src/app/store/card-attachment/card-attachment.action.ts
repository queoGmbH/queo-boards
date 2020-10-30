import { Action } from '@ngrx/store';

import { ICard, ICardAttachment } from '@boards/core/interfaces';

export enum CardAttachmentActionTypes {
  GET_CARD_ATTACHMENTS = '[CARD_ATTACHMENT] Get Card Attachments',
  GET_CARD_ATTACHMENTS_SUCCESS = '[CARD_ATTACHMENT] Get Card Attachments Success',

  CREATE_CARD_ATTACHMENT = '[CARD_ATTACHMENT] Create Card Attachment',
  CREATE_CARD_ATTACHMENT_SUCCESS = '[CARD_ATTACHMENT] Create Card Attachment Success',
  CREATE_CARD_ATTACHMENT_FAIL = '[CARD_ATTACHMENT] Create Card Attachment Fail',

  REMOVE_CARD_ATTACHMENT = '[CARD_ATTACHMENT] Remove Card Attachment',
  REMOVE_CARD_ATTACHMENT_SUCCESS = '[CARD_ATTACHMENT] Remove Card Attachment Success'
}

export class GetCardAttachments implements Action {
  readonly type = CardAttachmentActionTypes.GET_CARD_ATTACHMENTS;
  constructor(public payload: { cardId: string }) {}
}

export class GetCardAttachmentsSuccess implements Action {
  readonly type = CardAttachmentActionTypes.GET_CARD_ATTACHMENTS_SUCCESS;
  constructor(public payload: { cardAttachments: ICardAttachment[] }) {}
}

export class CreateCardAttachment implements Action {
  readonly type = CardAttachmentActionTypes.CREATE_CARD_ATTACHMENT;
  constructor(public payload: { card: ICard; formData: FormData }) {}
}

export class CreateCardAttachmentSuccess implements Action {
  readonly type = CardAttachmentActionTypes.CREATE_CARD_ATTACHMENT_SUCCESS;
  constructor(public payload: { cardAttachment: ICardAttachment }) {}
}

export class CreateCardAttachmentFail implements Action {
  readonly type = CardAttachmentActionTypes.CREATE_CARD_ATTACHMENT_FAIL;
  constructor(public payload: { error: string }) {}
}

export class RemoveCardAttachment implements Action {
  readonly type = CardAttachmentActionTypes.REMOVE_CARD_ATTACHMENT;
  constructor(public payload: { attachmentId: string }) {}
}

export class RemoveCardAttachmentSuccess implements Action {
  readonly type = CardAttachmentActionTypes.REMOVE_CARD_ATTACHMENT_SUCCESS;
  constructor(public payload: { cardAttachment: ICardAttachment }) {}
}

export type CardAttachmentActionsUnion =
  | GetCardAttachments
  | GetCardAttachmentsSuccess
  | CreateCardAttachment
  | CreateCardAttachmentSuccess
  | CreateCardAttachmentFail
  | RemoveCardAttachment
  | RemoveCardAttachmentSuccess;
