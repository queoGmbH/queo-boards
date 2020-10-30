import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';

import { BoardTeamComponent } from './components/board-team/board-team.component';

import { BoardTeamsComponent } from './containers/board-teams/board-teams.component';

@NgModule({
  imports: [SharedModule],
  declarations: [BoardTeamComponent, BoardTeamsComponent],
  exports: [BoardTeamsComponent]
})
export class BoardTeamsModule {}
