import { IBoardSummary } from '@boards/core/interfaces';

import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

import { BoardTemplatesActions } from './actions';

export interface BoardTemplatesReducerState extends EntityState<IBoardSummary> {
  loaded: boolean;
  loading: boolean;
}

export const boardTemplatesAdapter: EntityAdapter<
  IBoardSummary
> = createEntityAdapter<IBoardSummary>({
  selectId: ({ businessId }: IBoardSummary) => businessId,
  sortComparer: false
});

export const initialState: BoardTemplatesReducerState = boardTemplatesAdapter.getInitialState(
  {
    loaded: false,
    loading: false
  }
);

export function boardTemplatesReducer(
  state = initialState,
  action: BoardTemplatesActions.BoardTemplateActionsUnion
): BoardTemplatesReducerState {
  switch (action.type) {
    case BoardTemplatesActions.BoardTemplateActionTypes.GET_BOARD_TEMPLATES: {
      return {
        ...state,
        loaded: false,
        loading: true
      };
    }
    case BoardTemplatesActions.BoardTemplateActionTypes
      .GET_BOARD_TEMPLATES_FAIL: {
      return {
        ...state,
        loaded: false,
        loading: false
      };
    }
    case BoardTemplatesActions.BoardTemplateActionTypes
      .GET_BOARD_TEMPLATES_SUCCESS: {
      const { templates } = action.payload;
      return boardTemplatesAdapter.addAll(templates, {
        ...state,
        loaded: true,
        loading: false
      });
    }
    case BoardTemplatesActions.BoardTemplateActionTypes
      .CREATE_BOARD_TEMPLATE_SUCCESS: {
      const { template } = action.payload;
      return boardTemplatesAdapter.addOne(template, state);
    }
    case BoardTemplatesActions.BoardTemplateActionTypes
      .REMOVE_BOARD_TEMPLATE_SUCCESS: {
      const {
        breadcrumbBoard: { businessId }
      } = action.payload;
      return boardTemplatesAdapter.removeOne(businessId, state);
    }
    default: {
      return state;
    }
  }
}
