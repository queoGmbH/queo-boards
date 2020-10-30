import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

import { IBoardSummary } from '@boards/core';

import { BoardSummariesActions } from './actions';

export interface BoardSummariesReducerState extends EntityState<IBoardSummary> {
  selectedBoardSummaryId: string | null;
  loaded: boolean;
  loading: boolean;
}

export const boardSummariesAdapter: EntityAdapter<
  IBoardSummary
> = createEntityAdapter<IBoardSummary>({
  selectId: ({ businessId }: IBoardSummary) => businessId,
  sortComparer: false
});

export const initialState: BoardSummariesReducerState = boardSummariesAdapter.getInitialState(
  {
    selectedBoardSummaryId: null,
    loaded: false,
    loading: false
  }
);

export function boardSummaryReducer(
  state = initialState,
  action: BoardSummariesActions.BoardSummaryActionsUnion
): BoardSummariesReducerState {
  switch (action.type) {
    case BoardSummariesActions.BoardSummaryActionTypes.GET_BOARD_SUMMARIES: {
      return {
        ...state,
        loaded: false,
        loading: true
      };
    }
    case BoardSummariesActions.BoardSummaryActionTypes
      .GET_BOARD_SUMMARIES_FAIL: {
      return {
        ...state,
        loaded: false,
        loading: false
      };
    }
    case BoardSummariesActions.BoardSummaryActionTypes
      .GET_BOARD_SUMMARIES_SUCCESS: {
      const { boardSummaries } = action.payload;
      return boardSummariesAdapter.addAll(boardSummaries, {
        ...state,
        loaded: true,
        loading: false
      });
    }
    case BoardSummariesActions.BoardSummaryActionTypes
      .ADD_BOARD_SUMMARY_SUCCESS: {
      const { boardSummary } = action.payload;
      return boardSummariesAdapter.addOne(boardSummary, state);
    }
    // remove board from overview on archive success
    case BoardSummariesActions.BoardSummaryActionTypes.REMOVE_BOARD_SUMMARY: {
      const {
        boardSummary: { businessId }
      } = action.payload;
      return boardSummariesAdapter.removeOne(businessId, state);
    }
    default: {
      return state;
    }
  }
}
