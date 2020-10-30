import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { select, Store } from '@ngrx/store';

import { Observable } from 'rxjs';

import { ITeam } from '@boards/core/interfaces';

import { IState } from '@boards/store/state.interface';

import { TeamActions } from '@boards/store/team';

@Component({
  selector: 'boards-team-settings',
  templateUrl: './team-settings.component.html',
  styleUrls: ['./team-settings.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TeamSettingsComponent implements OnInit {
  team$: Observable<ITeam>;

  teamCopy: ITeam;

  updatedTeam: ITeam;

  constructor(private store: Store<IState>) {}

  ngOnInit() {
    this.team$ = this.store.pipe(
      select((state: IState) => state.teams.currentTeam)
    );
  }

  updateTeam(team: ITeam) {
    this.store.dispatch(new TeamActions.UpdateTeam({ team }));
  }

  handleRemoveTeam(team: ITeam) {
    this.store.dispatch(
      new TeamActions.RemoveTeam({ teamId: team.businessId })
    );
  }
}
