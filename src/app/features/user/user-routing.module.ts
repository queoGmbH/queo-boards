import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthNeededGuard } from '@boards/core/guards/auth-needed.guard';

import { ProfileComponent, SettingsComponent } from './container';

const userRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'profile',
        component: ProfileComponent,
        canActivate: [AuthNeededGuard]
      },
      {
        path: 'settings',
        component: SettingsComponent,
        canActivate: [AuthNeededGuard]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(userRoutes)],
  exports: [RouterModule]
})
export class UserRoutingModule {}
