import { IBoardChecklist } from '@boards/core/interfaces';

import {
  BoardChecklistActionTypes,
  BoardChecklistActionsUnion
} from './board-checklist.action';

export function boardChecklistReducer(
  state: IBoardChecklist[] = [],
  action: BoardChecklistActionsUnion
): IBoardChecklist[] {
  switch (action.type) {
    case BoardChecklistActionTypes.GET_BOARD_CHECKLISTS_SUCCESS: {
      const { boardChecklists } = action.payload;
      return [...boardChecklists];
    }

    default: {
      return state;
    }
  }
}
