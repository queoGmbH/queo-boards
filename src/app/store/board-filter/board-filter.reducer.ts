import { IBoardFilter } from '@boards/core/interfaces';

import {
  BoardFilterActionTypes,
  BoardFilterActionsUnion
} from './board-filter.action';

const INITIAL_BOARD_FILTER: IBoardFilter = {
  labels: [],
  boardUsers: []
};

export function boardFilterReducer(
  state: IBoardFilter = INITIAL_BOARD_FILTER,
  action: BoardFilterActionsUnion
): IBoardFilter {
  switch (action.type) {
    case BoardFilterActionTypes.SET_LABEL_FILTER: {
      const { labels } = action.payload;
      return {
        ...state,
        labels: [...labels]
      };
    }

    case BoardFilterActionTypes.SET_BOARD_USER_FILTER: {
      const { boardUsers } = action.payload;
      return {
        ...state,
        boardUsers: [...boardUsers]
      };
    }

    case BoardFilterActionTypes.RESET_FILTER: {
      return INITIAL_BOARD_FILTER;
    }

    default: {
      return state;
    }
  }
}
