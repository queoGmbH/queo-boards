import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot
} from '@angular/router';

import { Observable, of } from 'rxjs';
import { switchMap, withLatestFrom } from 'rxjs/operators';

import { AppStoreService } from '@boards/store/app-store.service';

@Injectable()
export class BoardsArchiveGuard implements CanActivate {
  boardsArchiveLoaded$ = this.appStoreService.boardsArchiveLoaded$;
  boardsArchiveLoading$ = this.appStoreService.boardsArchiveLoading$;

  constructor(private appStoreService: AppStoreService) {}

  canActivate(
    activatedRouteSnapshot: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.boardsArchiveLoading$.pipe(
      withLatestFrom(this.boardsArchiveLoaded$),
      switchMap(([loading, loaded], index) => {
        if (!loading && !loaded && index === 0) {
          this.appStoreService.getBoardsArchive();
        }
        return of(true);
      })
    );
  }
}
