import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot
} from '@angular/router';

import { Action, Store } from '@ngrx/store';
import { Actions, ofType } from '@ngrx/effects';

import { take } from 'rxjs/operators';

import { IState } from '@boards/store/state.interface';

import { TeamsActions } from '@boards/store/team';

@Injectable()
export class TeamsResolver implements Resolve<Action> {
  constructor(private actions$: Actions, private store: Store<IState>) {}

  resolve(
    activatedRouteSnapshot: ActivatedRouteSnapshot,
    routerStateSnapshot: RouterStateSnapshot
  ) {
    this.store.dispatch(new TeamsActions.GetTeams());

    return this.actions$.pipe(
      ofType(TeamsActions.TeamsActionTypes.GET_TEAMS_SUCCESS),
      take(1)
    );
  }
}
