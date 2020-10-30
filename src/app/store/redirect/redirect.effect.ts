import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Effect, Actions, ofType } from '@ngrx/effects';

import { map, tap } from 'rxjs/operators';

import { BoardArchiveActionTypes } from '../board-archive';
import {
  BoardSummaryActionTypes,
  AddBoardSummarySuccess
} from '../board-summary';

@Injectable()
export class RedirectEffect {
  @Effect({ dispatch: false })
  redirectToBoard$ = this.actions$.pipe(
    ofType<AddBoardSummarySuccess>(
      BoardSummaryActionTypes.ADD_BOARD_SUMMARY_SUCCESS
    ),
    map((action) => action.payload),
    tap(({ boardSummary }) =>
      this.router.navigate(['/board', boardSummary.businessId])
    )
  );

  @Effect({ dispatch: false })
  redirectToBoards$ = this.actions$.pipe(
    ofType(BoardArchiveActionTypes.CREATE_ARCHIVED_BOARD_SUCCESS),
    tap(() => this.router.navigate(['/boards']))
  );

  constructor(private actions$: Actions, private router: Router) {}
}
