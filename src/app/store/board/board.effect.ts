import { Injectable } from '@angular/core';

import { Effect, Actions, ofType } from '@ngrx/effects';

import { map, switchMap } from 'rxjs/operators';

import { IBoard, IBoardSummary } from '@boards/core/interfaces';

import { BoardService } from '@boards/core/services';

import {
  BoardActionTypes,
  GetBoard,
  GetBoardSuccess,
  UpdateBoardSummary,
  UpdateBoardSummarySuccess
} from './board.action';

@Injectable()
export class BoardEffect {
  @Effect()
  loadBoard$ = this.actions$.pipe(
    ofType<GetBoard>(BoardActionTypes.GET_BOARD),
    map((action) => action.payload),
    switchMap(({ boardId }) => {
      return this.boardService.getBoard(boardId);
    }),
    map((board: IBoard) => {
      return new GetBoardSuccess({ inner: board });
    })
  );

  @Effect()
  updateBoard$ = this.actions$.pipe(
    ofType<UpdateBoardSummary>(BoardActionTypes.UPDATE_BOARD_SUMMARY),
    map((action) => action.payload),
    switchMap(({ boardSummary, boardId }) => {
      return this.boardService.updateBoard(boardSummary, boardId, {
        name: BoardActionTypes.UPDATE_BOARD_SUMMARY_SUCCESS
      });
    }),
    map((boardSummary: IBoardSummary) => {
      return new UpdateBoardSummarySuccess({ inner: boardSummary });
    })
  );

  constructor(private actions$: Actions, private boardService: BoardService) {}
}
