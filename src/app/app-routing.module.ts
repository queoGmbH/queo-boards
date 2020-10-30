import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

import { PageNotFoundComponent } from './core/components/page-not-found/page-not-found.component';

const appRoutes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'boards'
  },
  {
    path: 'board',
    pathMatch: 'full',
    redirectTo: 'boards'
  },
  {
    path: 'board/:boardId',
    loadChildren: () => import('./features/board/board.module').then(m => m.BoardModule)
  },
  {
    path: 'boards',
    loadChildren: () => import('./features/boards/boards.module').then(m => m.BoardsModule)
  },
  {
    path: 'teams',
    loadChildren: () => import('./features/teams/teams.module').then(m => m.TeamsModule)
  },
  {
    path: 'user',
    loadChildren: () => import('./features/user/user.module').then(m => m.UserModule)
  },
  {
    path: 'user-management',
    loadChildren:
      () => import('./features/user-management/user-management.module').then(m => m.UserManagementModule)
  },
  {
    path: '404',
    component: PageNotFoundComponent
  },
  {
    path: '**',
    redirectTo: '/404'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, {
      enableTracing: false,
      preloadingStrategy: PreloadAllModules,
      useHash: true
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
