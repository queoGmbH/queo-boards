import { Injectable } from '@angular/core';

import { Store, select } from '@ngrx/store';

import { IBoardSummary } from '@boards/core';

import { IState } from './state.interface';

import { BoardSummariesActions } from './board-summary/actions';
import { BoardsArchiveActions } from './board-archive/actions';
import { BoardTemplatesActions } from './board-template/actions';
import {
  getBoardSummaries,
  getBoardSummariesLoaded,
  getBoardSummariesLoading,
  getBoardsArchive,
  getBoardsArchiveLoaded,
  getBoardsArchiveLoading,
  getBoardTemplates,
  getBoardTemplatesLoaded,
  getBoardTemplatesLoading
} from './reducers';

@Injectable()
export class AppStoreService {
  boardSummaries$ = this.store.pipe<IBoardSummary[]>(select(getBoardSummaries));
  boardSummariesLoaded$ = this.store.pipe<boolean>(
    select(getBoardSummariesLoaded)
  );
  boardSummariesLoading$ = this.store.pipe<boolean>(
    select(getBoardSummariesLoading)
  );

  boardsArchive$ = this.store.pipe<IBoardSummary[]>(select(getBoardsArchive));
  boardsArchiveLoaded$ = this.store.pipe<boolean>(
    select(getBoardsArchiveLoaded)
  );
  boardsArchiveLoading$ = this.store.pipe<boolean>(
    select(getBoardsArchiveLoading)
  );

  boardTemplates$ = this.store.pipe<IBoardSummary[]>(select(getBoardTemplates));
  boardTemplatesLoaded$ = this.store.pipe<boolean>(
    select(getBoardTemplatesLoaded)
  );
  boardTemplatesLoading$ = this.store.pipe<boolean>(
    select(getBoardTemplatesLoading)
  );

  constructor(private store: Store<IState>) {}

  getBoardSummaries() {
    this.store.dispatch(new BoardSummariesActions.GetBoardSummaries());
  }

  getBoardsArchive() {
    this.store.dispatch(new BoardsArchiveActions.GetArchivedBoards());
  }

  getBoardTemplates() {
    this.store.dispatch(new BoardTemplatesActions.GetBoardTemplates());
  }

  createBoardTemplate({ template }) {
    this.store.dispatch(
      new BoardTemplatesActions.CreateBoardTemplate({ template })
    );
  }

  removeBoardTemplate({ template }) {
    this.store.dispatch(
      new BoardTemplatesActions.RemoveBoardTemplate({ template })
    );
  }
}
