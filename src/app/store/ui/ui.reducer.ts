import { IUIState } from '@boards/core/interfaces';

import { UIActionTypes, UIActionsUnion } from './ui.action';

const INITIAL_STATE: IUIState = {
  currentCard: null,
  currentCardId: null,
  copyMove: null
};

export function uiReducer(
  state: IUIState = INITIAL_STATE,
  action: UIActionsUnion
): IUIState {
  switch (action.type) {
    case UIActionTypes.SET_CURRENT_CARD: {
      const { currentCard } = action.payload;
      return {
        ...state,
        currentCard
      };
    }

    case UIActionTypes.SET_CURRENT_CARD_ID: {
      const { currentCardId } = action.payload;
      return {
        ...state,
        currentCardId
      };
    }

    case UIActionTypes.RESET_CURRENT_CARD: {
      return {
        ...state,
        currentCard: null
      };
    }

    case UIActionTypes.RESET_CURRENT_CARD_ID: {
      return {
        ...state,
        currentCardId: null
      };
    }

    case UIActionTypes.SET_COPY_MOVE_SUCCESS: {
      const { board } = action.payload;
      return {
        ...state,
        copyMove: board
      };
    }

    case UIActionTypes.RESET_COPY_MOVE: {
      return {
        ...state,
        copyMove: null
      };
    }

    default: {
      return state;
    }
  }
}
