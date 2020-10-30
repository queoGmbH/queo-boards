import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthNeededGuard } from '@boards/core/guards';

import { BoardsArchiveGuard, BoardsGuard, BoardTemplatesGuard } from './guards';

import { BoardsComponent } from './container/boards/boards.component';

const boardsRoutes: Routes = [
  {
    path: '',
    component: BoardsComponent,
    canActivate: [
      AuthNeededGuard,
      BoardsArchiveGuard,
      BoardsGuard,
      BoardTemplatesGuard
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(boardsRoutes)],
  exports: [RouterModule],
  providers: [BoardsArchiveGuard, BoardsGuard, BoardTemplatesGuard]
})
export class BoardsRoutingModule {}
