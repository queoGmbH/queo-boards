import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../../shared/shared.module';

import { LoginComponent } from './container/login/login.component';

import { LoginRoutingModule } from './login-routing.module';

@NgModule({
  imports: [ReactiveFormsModule, SharedModule, LoginRoutingModule],
  declarations: [LoginComponent]
})
export class LoginModule {}
