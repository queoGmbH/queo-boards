import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

import { IBoardSummary } from '@boards/core/interfaces';

import { BoardsArchiveActions } from './actions';

export interface BoardsArchiveReducerState extends EntityState<IBoardSummary> {
  loaded: boolean;
  loading: boolean;
}

export const boardsArchiveAdapter: EntityAdapter<
  IBoardSummary
> = createEntityAdapter<IBoardSummary>({
  selectId: ({ businessId }: IBoardSummary) => businessId,
  sortComparer: false
});

export const initialState: BoardsArchiveReducerState = boardsArchiveAdapter.getInitialState(
  {
    loaded: false,
    loading: false
  }
);

export function boardsArchiveReducer(
  state = initialState,
  action: BoardsArchiveActions.BoardArchiveActionsUnion
): BoardsArchiveReducerState {
  switch (action.type) {
    case BoardsArchiveActions.BoardArchiveActionTypes
      .GET_ARCHIVED_BOARDS_SUCCESS: {
      const { boardSummaries } = action.payload;
      return boardsArchiveAdapter.addAll(boardSummaries, {
        ...state,
        loaded: true,
        loading: false
      });
    }

    case BoardsArchiveActions.BoardArchiveActionTypes
      .CREATE_ARCHIVED_BOARD_SUCCESS: {
      const { boardSummary } = action.payload;
      return boardsArchiveAdapter.addOne(boardSummary, state);
    }

    case BoardsArchiveActions.BoardArchiveActionTypes
      .RESTORE_ARCHIVED_BOARD_SUCCESS: {
      const {
        boardSummary: { businessId }
      } = action.payload;
      return boardsArchiveAdapter.removeOne(businessId, state);
    }

    case BoardsArchiveActions.BoardArchiveActionTypes
      .REMOVE_ARCHIVED_BOARD_SUCCESS: {
      const { breadcrumbBoard } = action.payload;
      return boardsArchiveAdapter.removeOne(breadcrumbBoard.businessId, state);
    }

    default: {
      return state;
    }
  }
}
