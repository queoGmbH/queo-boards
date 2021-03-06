import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot
} from '@angular/router';

import { Observable } from 'rxjs';
import { filter, map, withLatestFrom } from 'rxjs/operators';

import { AppStoreService } from '@boards/store/app-store.service';

@Injectable()
export class BoardsGuard implements CanActivate {
  boardSummariesLoaded$ = this.appStoreService.boardSummariesLoaded$;
  boardSummariesLoading$ = this.appStoreService.boardSummariesLoading$;

  constructor(private appStoreService: AppStoreService) {}

  canActivate(
    activatedRouteSnapshot: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.boardSummariesLoading$.pipe(
      withLatestFrom(this.boardSummariesLoaded$),
      filter(([loading, loaded], index) => {
        if (!loading && !loaded && index === 0) {
          this.appStoreService.getBoardSummaries();
          return false;
        }
        return !loading;
      }),
      map(([, loaded]) => {
        return loaded;
      })
    );
  }
}
