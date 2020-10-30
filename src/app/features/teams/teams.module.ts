import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';

import { BoardLinkModule } from '@boards/modules/board-link/board-link.module';
import { UserSearchModule } from '@boards/modules/user-search/user-search.module';

import { TeamBoardsComponent } from './container/team-boards/team-boards.component';
import { TeamComponent } from './container/team/team.component';
import { TeamMembersComponent } from './container/team-members/team-members.component';
import { TeamsComponent } from './container/teams/teams.component';
import { TeamSettingsComponent } from './container/team-settings/team-settings.component';

import { TeamFormComponent } from './components/team-form/team-form.component';
import { TeamMemberListComponent } from './components/team-member-list/team-member-list.component';

import { TeamsRoutingModule } from './teams-routing.module';

@NgModule({
  imports: [
    SharedModule,
    BoardLinkModule,
    UserSearchModule,
    TeamsRoutingModule
  ],
  declarations: [
    TeamsComponent,
    TeamComponent,
    TeamMembersComponent,
    TeamBoardsComponent,
    TeamSettingsComponent,
    TeamFormComponent,
    TeamMemberListComponent
  ]
})
export class TeamsModule {}
