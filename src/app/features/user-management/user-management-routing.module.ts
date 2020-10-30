import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserManagementComponent } from './containers';
import {AuthNeededGuard} from "@boards/core/guards";

const routes: Routes = [
  {
    path: '',
    component: UserManagementComponent,
    canActivate: [AuthNeededGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserManagementRoutingModule {}
