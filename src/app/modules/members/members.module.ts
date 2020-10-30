import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../../shared/shared.module';

import { UserSearchModule } from '../user-search/user-search.module';

import { BoardMembersComponent } from './containers/board-members/board-members.component';
import { CardMembersComponent } from './containers/card-members/card-members.component';
import { MemberComponent } from './components/member/member.component';

@NgModule({
  imports: [ReactiveFormsModule, SharedModule, UserSearchModule],
  declarations: [BoardMembersComponent, CardMembersComponent, MemberComponent],
  exports: [BoardMembersComponent, CardMembersComponent]
})
export class MembersModule {}
