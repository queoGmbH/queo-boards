import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TeamComponent } from './container/team/team.component';
import { TeamsComponent } from './container/teams/teams.component';

import { TeamSettingsComponent } from './container/team-settings/team-settings.component';
import { TeamMembersComponent } from './container/team-members/team-members.component';
import { TeamBoardsComponent } from './container/team-boards/team-boards.component';

import { TeamResolver } from './resolver/team.resolver';
import { TeamsResolver } from './resolver/teams.resolver';

import { AuthNeededGuard } from '@boards/core/guards';

const teamsRoutes: Routes = [
  {
    path: '',
    component: TeamsComponent,
    canActivate: [AuthNeededGuard],
    resolve: [TeamsResolver]
  },
  {
    path: ':id',
    component: TeamComponent,
    // canActivate: [AuthNeededGuard],
    resolve: [TeamResolver],
    children: [
      {
        path: 'boards',
        component: TeamBoardsComponent
      },
      {
        path: 'members',
        component: TeamMembersComponent
      },
      {
        path: 'settings',
        component: TeamSettingsComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(teamsRoutes)],
  exports: [RouterModule],
  providers: [TeamResolver, TeamsResolver]
})
export class TeamsRoutingModule {}
