import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '@boards/shared/shared.module';

import { userComponents } from './components';
import { userContainers } from './container';
import { userServices } from './services';

import { UserRoutingModule } from './user-routing.module';

@NgModule({
  imports: [CommonModule, UserRoutingModule, SharedModule],
  declarations: [...userComponents, ...userContainers],
  providers: [...userServices]
})
export class UserModule {}
