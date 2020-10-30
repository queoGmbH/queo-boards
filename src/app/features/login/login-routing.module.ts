import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './container/login/login.component';
import {PasswordForgottenComponent} from "@boards/features/login/container/password-forgotten/password-forgotten.component";
import {PasswordResetComponent} from "@boards/features/login/container/password-reset/password-reset.component";

const loginRoutes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'password-forgotten',
    component: PasswordForgottenComponent
  },
  {
    path: 'password-reset',
    children: [
      {
        path: ':resetToken',
        component: PasswordResetComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(loginRoutes)],
  exports: [RouterModule]
})
export class LoginRoutingModule {}
