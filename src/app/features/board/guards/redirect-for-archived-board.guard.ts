import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot
} from '@angular/router';

// this guard will redirect to the boards summary if the requested board has been archived
// otherwise it will allow activation of the route...

import { Observable, of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { BoardService } from '@boards/core/services';

@Injectable()
export class RedirectForArchivedBoardGuard implements CanActivate {
  constructor(private router: Router, private boardService: BoardService) {}

  canActivate(
    activatedRouteSnapshot: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    const boardId = activatedRouteSnapshot.params['boardId'];
    return this.boardService.getBoard(boardId).pipe(
      // if the response succeeds, that board is available and thus it is not archived
      map(() => false),
      // if there is an error, look whether it is a 404 and map to true
      catchError((errorResponse: HttpErrorResponse) => {
        if (
          errorResponse instanceof HttpErrorResponse &&
          errorResponse.status === 404
        ) {
          return of(true);
        } else {
          // simply rethrow error
          return throwError(errorResponse);
        }
      }),
      map((isBoardArchived) => {
        // for archived boards redirect to board summary
        if (isBoardArchived) {
          // TODO: do not hard-code route for board summary
          this.router.navigate(['/boards']);
        }
        return !isBoardArchived;
      })
    );
  }
}
