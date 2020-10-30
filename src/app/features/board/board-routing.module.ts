import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthNeededGuard } from '@boards/core/guards';

import { BoardResolver } from './resolvers';
import {
  boardGuards,
  BoardsGuard,
  CardAttachmentsGuard,
  RedirectForArchivedBoardGuard,
  RedirectForArchivedCardGuard
} from './guards';

import { BoardComponent, CardDetailComponent } from './containers';

const boardRoutes: Routes = [
  {
    path: '',
    component: BoardComponent,
    canActivate: [AuthNeededGuard, BoardsGuard, RedirectForArchivedBoardGuard],
    resolve: {
      board: BoardResolver
    },
    children: [
      {
        path: 'card/:cardId',
        component: CardDetailComponent,
        canActivate: [CardAttachmentsGuard, RedirectForArchivedCardGuard]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(boardRoutes)],
  exports: [RouterModule],
  providers: [BoardResolver, ...boardGuards]
})
export class BoardRoutingModule {}
