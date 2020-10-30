import { Injectable } from '@angular/core';

import { select, Store } from '@ngrx/store';
import { Effect, Actions, ofType } from '@ngrx/effects';

import { map, switchMap } from 'rxjs/operators';

import { IBoardChecklist } from '@boards/core/interfaces';

import { BoardService } from '@boards/core/services';

import {
  BoardChecklistActionTypes,
  GetBoardChecklists,
  GetBoardChecklistsSuccess
} from './board-checklist.action';
import { CardChecklistActionTypes } from '../card-checklist';

@Injectable()
export class BoardChecklistEffect {
  @Effect()
  loadBoardChecklists$ = this.actions$.pipe(
    ofType<GetBoardChecklists>(BoardChecklistActionTypes.GET_BOARD_CHECKLISTS),
    map((action) => action.payload),
    switchMap(({ boardId }) => {
      return this.boardService.getBoardChecklists(boardId);
    }),
    map((boardChecklists: IBoardChecklist[]) => {
      return new GetBoardChecklistsSuccess({ boardChecklists });
    })
  );

  @Effect()
  updateBoardChecklists$ = this.actions$.pipe(
    ofType(
      CardChecklistActionTypes.CREATE_CARD_CHECKLIST_SUCCESS,
      CardChecklistActionTypes.CREATE_CARD_CHECKLIST_TASK_SUCCESS,
      CardChecklistActionTypes.REMOVE_CARD_CHECKLIST_SUCCESS,
      CardChecklistActionTypes.REMOVE_CARD_CHECKLIST_TASK_SUCCESS,
      CardChecklistActionTypes.UPDATE_CARD_CHECKLIST_TITLE_SUCCESS
    ),
    switchMap(() => this.store.pipe(select((state) => state.board.businessId))),
    map((boardId: string) => {
      return new GetBoardChecklists({ boardId });
    })
  );

  constructor(
    private actions$: Actions,
    private boardService: BoardService,
    private store: Store<any>
  ) {}
}
