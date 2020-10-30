import { Injectable } from '@angular/core';

import { Effect, Actions, ofType } from '@ngrx/effects';

import { map, mergeMap, switchMap } from 'rxjs/operators';

import { IBoardSummary, IBreadcrumbBoard } from '@boards/core/interfaces';

import { BoardTemplateService } from '@boards/core/services';

import { BoardTemplatesActions } from './actions';

@Injectable()
export class BoardTemplateEffect {
  @Effect()
  getBoardTemplates$ = this.actions$.pipe(
    ofType(BoardTemplatesActions.BoardTemplateActionTypes.GET_BOARD_TEMPLATES),
    switchMap(() => {
      return this.boardTemplateService.getAll().pipe(
        map((templates: IBoardSummary[]) => {
          return new BoardTemplatesActions.GetBoardTemplatesSuccess({
            templates
          });
        })
      );
    })
  );

  @Effect()
  createBoardTemplate$ = this.actions$.pipe(
    ofType<BoardTemplatesActions.CreateBoardTemplate>(
      BoardTemplatesActions.BoardTemplateActionTypes.CREATE_BOARD_TEMPLATE
    ),
    map((action) => action.payload),
    mergeMap(({ template }) => {
      return this.boardTemplateService.create(template).pipe(
        map((t: IBoardSummary) => {
          return new BoardTemplatesActions.CreateBoardTemplateSuccess({
            template: t
          });
        })
      );
    })
  );

  @Effect()
  removeBoardTemplate$ = this.actions$.pipe(
    ofType<BoardTemplatesActions.RemoveBoardTemplate>(
      BoardTemplatesActions.BoardTemplateActionTypes.REMOVE_BOARD_TEMPLATE
    ),
    map((action) => action.payload),
    mergeMap(({ template }) => {
      return this.boardTemplateService.remove(template).pipe(
        map((breadcrumbBoard: IBreadcrumbBoard) => {
          return new BoardTemplatesActions.RemoveBoardTemplateSuccess({
            breadcrumbBoard
          });
        })
      );
    })
  );

  constructor(
    private actions$: Actions,
    private boardTemplateService: BoardTemplateService
  ) {}
}
