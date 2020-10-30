import {
  IArchive,
  IAuthStore,
  IBoard,
  IBoardFilter,
  ICardAttachment,
  ICardChecklist,
  ICardChecklistState,
  ICardComment,
  ITeamState,
  IUIState,
  IUserState
} from '@boards/core';

import { BoardSummariesReducerState } from './board-summary/board-summary.reducer';
import { BoardsArchiveReducerState } from './board-archive/board-archive.reducer';
import { BoardTemplatesReducerState } from './board-template/board-template.reducer';

export interface IState {
  archive: IArchive;
  auth: IAuthStore;
  board: IBoard;
  boardsArchive: BoardsArchiveReducerState;
  boardChecklists: ICardChecklist[];
  boardComments: ICardComment[];
  boardFilter: IBoardFilter;
  boardSummaries: BoardSummariesReducerState;
  boardTemplates: BoardTemplatesReducerState;
  cardAttachments: ICardAttachment[];
  cardChecklists: ICardChecklistState;
  cardComments: ICardComment[];
  teams: ITeamState;
  ui: IUIState;
  users: IUserState;
}
