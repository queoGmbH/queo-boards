import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { select, Store } from '@ngrx/store';

import { IState } from '@boards/store/state.interface';

@Component({
  selector: 'boards-team-boards',
  templateUrl: './team-boards.component.html',
  styleUrls: ['./team-boards.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TeamBoardsComponent implements OnInit {
  team$ = this.store.pipe(select((state: IState) => state.teams.currentTeam));

  constructor(private store: Store<IState>) {}

  ngOnInit() {}
}
