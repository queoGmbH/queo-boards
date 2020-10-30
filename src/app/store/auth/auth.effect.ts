import { Injectable } from '@angular/core';

import { map } from 'rxjs/operators';

import { Effect, Actions, ofType } from '@ngrx/effects';

import { AddAuthInfo, AuthActionTypes, AuthInfoAdded } from './auth.action';

@Injectable()
export class AuthEffect {
  // COMMAND ADD_AUTH_INFO emits EVENT AUTH_INFO_ADDED
  @Effect()
  addAuthInfo$ = this.actions$.pipe(
    ofType<AddAuthInfo>(AuthActionTypes.ADD_AUTH_INFO),
    map((action) => action.payload),
    map(({ authInfo }) => {
      return new AuthInfoAdded({ authInfo });
    })
  );

  constructor(private actions$: Actions) {}
}
