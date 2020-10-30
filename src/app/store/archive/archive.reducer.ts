import { IArchive } from '@boards/core/interfaces';

import { ArchiveActionTypes, ArchiveActionsUnion } from './archive.action';

const INIT_ARCHIVE: IArchive = {
  boards: [],
  cards: [],
  lists: []
};

export function archiveReducer(
  state: IArchive = INIT_ARCHIVE,
  action: ArchiveActionsUnion
): IArchive {
  switch (action.type) {
    case ArchiveActionTypes.GET_ARCHIVED_CARDS_SUCCESS: {
      const { cards } = action.payload;
      return {
        ...state,
        cards: [...cards]
      };
    }

    case ArchiveActionTypes.RESTORE_CARD_SUCCESS: {
      const { card } = action.payload;
      return {
        ...state,
        cards: [
          ...state.cards.filter((archivedCard) => {
            return archivedCard.businessId !== card.businessId;
          })
        ]
      };
    }

    case ArchiveActionTypes.GET_ARCHIVED_LISTS_SUCCESS: {
      const { lists } = action.payload;
      return {
        ...state,
        lists: [...lists]
      };
    }

    case ArchiveActionTypes.RESTORE_LIST_SUCCESS: {
      const { list } = action.payload;

      const {
        archivedAt,
        board,
        businessId,
        cards,
        positionOnBoard,
        title
      } = list;

      const newList = {
        archivedAt,
        board,
        businessId,
        positionOnBoard,
        title
      };

      return {
        ...state,
        lists: [
          ...state.lists.filter((archivedList) => {
            return archivedList.businessId !== newList.businessId;
          })
        ]
      };
    }

    default: {
      return state;
    }
  }
}
