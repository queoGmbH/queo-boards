import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';

import { UserSearchComponent } from './container/user-search/user-search.component';

@NgModule({
  imports: [SharedModule],
  declarations: [UserSearchComponent],
  exports: [UserSearchComponent]
})
export class UserSearchModule {}
