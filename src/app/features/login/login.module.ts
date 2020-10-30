import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../../shared/shared.module';

import { LoginComponent } from './container/login/login.component';

import { LoginRoutingModule } from './login-routing.module';
import { PasswordForgottenComponent } from './container/password-forgotten/password-forgotten.component';
import { PasswordResetComponent } from './container/password-reset/password-reset.component';

@NgModule({
  imports: [ReactiveFormsModule, SharedModule, LoginRoutingModule],
  declarations: [LoginComponent, PasswordForgottenComponent, PasswordResetComponent]
})
export class LoginModule {}
