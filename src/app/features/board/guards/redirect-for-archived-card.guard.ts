import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot
} from '@angular/router';

// this guard will redirect to the board if the requested card has been archived
// otherwise it will allow activation of the route...

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { CardService } from '@boards/core/services';

@Injectable()
export class RedirectForArchivedCardGuard implements CanActivate {
  constructor(private router: Router, private cardService: CardService) {}

  canActivate(
    activatedRouteSnapshot: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    const cardId = activatedRouteSnapshot.params['cardId'];
    const boardId = activatedRouteSnapshot.parent.params['boardId'];
    return this.cardService.getCard(cardId).pipe(
      // a card is archived when archiveAt is not null
      map((card) => card.archivedAt !== null),
      map((isCardArchived) => {
        // for archived card redirect to actual board
        if (isCardArchived) {
          // TODO: do not hard-code board route
          this.router.navigate(['/board', boardId]);
        }
        return !isCardArchived;
      })
    );
  }
}
