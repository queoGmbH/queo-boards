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

import { TeamActions } from '@boards/store/team';
import { GetUsers } from '@boards/store/user/user.action';

@Injectable()
export class TeamResolver implements Resolve<Action> {
  constructor(private actions$: Actions, private store: Store<IState>) {}

  resolve(
    activatedRouteSnapshot: ActivatedRouteSnapshot,
    routerStateSnapshot: RouterStateSnapshot
  ) {
    const teamId = activatedRouteSnapshot.params['id'];

    this.store.dispatch(new GetUsers());
    this.store.dispatch(new TeamActions.GetTeam({ teamId }));

    return this.actions$.pipe(
      ofType(TeamActions.TeamActionTypes.GET_TEAM_SUCCESS),
      take(1)
    );
  }
}
