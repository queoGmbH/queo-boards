import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot
} from '@angular/router';

import { Store } from '@ngrx/store';

import { Observable, of } from 'rxjs';

import { GetBoardComments } from '@boards/store/board-comment';
import { GetCardAttachments } from '@boards/store/card-attachment';
import { LoadCardChecklists } from '@boards/store/card-checklist';

@Injectable()
export class CardAttachmentsGuard implements CanActivate {
  constructor(private router: Router, private store: Store<any>) {}

  canActivate(
    activatedRouteSnapshot: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    const boardId = activatedRouteSnapshot.parent.params['boardId'];
    const cardId = activatedRouteSnapshot.params['cardId'];

    this.store.dispatch(new GetBoardComments({ boardId }));
    this.store.dispatch(new GetCardAttachments({ cardId }));
    this.store.dispatch(new LoadCardChecklists({ cardId }));

    return of(true);
  }
}
