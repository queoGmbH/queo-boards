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
export class BoardTemplatesGuard implements CanActivate {
  boardTemplatesLoaded$ = this.appStoreService.boardTemplatesLoaded$;
  boardTemplatesLoading$ = this.appStoreService.boardTemplatesLoading$;

  constructor(private appStoreService: AppStoreService) {}

  canActivate(
    activatedRouteSnapshot: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.boardTemplatesLoading$.pipe(
      withLatestFrom(this.boardTemplatesLoaded$),
      switchMap(([loading, loaded], index) => {
        if (!loading && !loaded && index === 0) {
          this.appStoreService.getBoardTemplates();
        }
        return of(true);
      })
    );
  }
}
