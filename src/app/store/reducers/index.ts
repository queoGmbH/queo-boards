import {
  ActionReducerMap,
  createSelector,
  createFeatureSelector,
  MetaReducer
} from '@ngrx/store';

import { storeFreeze } from 'ngrx-store-freeze';

import { IState } from '../state.interface';

import { archiveReducer } from '../archive/archive.reducer';
import { authReducer } from '../auth/auth.reducer';
import {
  boardsArchiveAdapter,
  BoardsArchiveReducerState,
  boardsArchiveReducer
} from '../board-archive/board-archive.reducer';
import { boardChecklistReducer } from '../board-checklist/board-checklist.reducer';
import { boardCommentReducer } from '../board-comment/board-comment.reducer';
import { boardFilterReducer } from '../board-filter/board-filter.reducer';
import { boardReducer } from '../board/board.reducer';
import {
  boardSummariesAdapter,
  BoardSummariesReducerState,
  boardSummaryReducer
} from '../board-summary/board-summary.reducer';
import {
  boardTemplatesAdapter,
  BoardTemplatesReducerState,
  boardTemplatesReducer
} from '../board-template/board-template.reducer';
import { cardAttachmentReducer } from '../card-attachment/card-attachment.reducer';
import { cardChecklistReducer } from '../card-checklist/card-checklist.reducer';
import { cardCommentReducer } from '../card-comment/card-comment.reducer';
import { teamsReducer } from '../team/teams.reducer';
import { uiReducer } from '../ui/ui.reducer';
import { userReducer } from '../user/user.reducer';

import { environment } from '@env/environment';

export const reducers: ActionReducerMap<IState> = {
  archive: archiveReducer,
  auth: authReducer,
  board: boardReducer,
  boardsArchive: boardsArchiveReducer,
  boardChecklists: boardChecklistReducer,
  boardComments: boardCommentReducer,
  boardFilter: boardFilterReducer,
  boardSummaries: boardSummaryReducer,
  boardTemplates: boardTemplatesReducer,
  cardAttachments: cardAttachmentReducer,
  cardChecklists: cardChecklistReducer,
  cardComments: cardCommentReducer,
  teams: teamsReducer,
  ui: uiReducer,
  users: userReducer
};

export const metaReducers: MetaReducer<IState>[] = !environment.production
  ? [storeFreeze]
  : [];

export const getBoardSummariesFeatureState = createFeatureSelector<
  IState,
  BoardSummariesReducerState
>('boardSummaries');

export const getBoardsArchiveFeatureState = createFeatureSelector<
  IState,
  BoardsArchiveReducerState
>('boardsArchive');

export const getBoardTemplatesFeatureState = createFeatureSelector<
  IState,
  BoardTemplatesReducerState
>('boardTemplates');

export const {
  selectIds: getBoardSummariesIds,
  selectEntities: getBoardSummariesEntities,
  selectAll: getBoardSummaries,
  selectTotal: getBoardSummariesTotal
} = boardSummariesAdapter.getSelectors(getBoardSummariesFeatureState);

export const getSelectedBoardSummaryId = createSelector(
  getBoardSummariesFeatureState,
  (state) => state.selectedBoardSummaryId
);

export const getBoardSummariesLoaded = createSelector(
  getBoardSummariesFeatureState,
  (state) => state.loaded
);

export const getBoardSummariesLoading = createSelector(
  getBoardSummariesFeatureState,
  (state) => state.loading
);

// boards archive
export const {
  selectIds: getBoardsArchiveIds,
  selectEntities: getBoardsArchiveEntities,
  selectAll: getBoardsArchive,
  selectTotal: getBoardsArchiveTotal
} = boardsArchiveAdapter.getSelectors(getBoardsArchiveFeatureState);

export const getBoardsArchiveLoaded = createSelector(
  getBoardsArchiveFeatureState,
  (state) => state.loaded
);

export const getBoardsArchiveLoading = createSelector(
  getBoardsArchiveFeatureState,
  (state) => state.loading
);

// board templates
export const {
  selectIds: getBoardTemplatesIds,
  selectEntities: getBoardTemplatesEntities,
  selectAll: getBoardTemplates,
  selectTotal: getBoardTemplatesTotal
} = boardTemplatesAdapter.getSelectors(getBoardTemplatesFeatureState);

export const getBoardTemplatesLoaded = createSelector(
  getBoardTemplatesFeatureState,
  (state) => state.loaded
);

export const getBoardTemplatesLoading = createSelector(
  getBoardTemplatesFeatureState,
  (state) => state.loading
);
