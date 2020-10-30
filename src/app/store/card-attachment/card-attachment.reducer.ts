import { ICardAttachment } from '@boards/core/interfaces';

import {
  CardAttachmentActionTypes,
  CardAttachmentActionsUnion
} from './card-attachment.action';

export function cardAttachmentReducer(
  state: ICardAttachment[] = [],
  action: CardAttachmentActionsUnion
): ICardAttachment[] {
  switch (action.type) {
    case CardAttachmentActionTypes.GET_CARD_ATTACHMENTS_SUCCESS: {
      const { cardAttachments } = action.payload;
      return [...cardAttachments];
    }

    case CardAttachmentActionTypes.CREATE_CARD_ATTACHMENT_SUCCESS: {
      const { cardAttachment } = action.payload;
      return [...state, cardAttachment];
    }

    case CardAttachmentActionTypes.REMOVE_CARD_ATTACHMENT_SUCCESS: {
      const { cardAttachment } = action.payload;
      return [
        ...state.filter((attachment: ICardAttachment) => {
          return attachment.businessId !== cardAttachment.businessId;
        })
      ];
    }

    default: {
      return state;
    }
  }
}
