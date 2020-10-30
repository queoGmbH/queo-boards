import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { select, Store } from '@ngrx/store';

import { Observable } from 'rxjs';

import { ITeam } from '@boards/core/interfaces';

import { IState } from '@boards/store/state.interface';

import { RemoveBoardTeam } from '@boards/store/board-team';

@Component({
  selector: 'boards-board-teams',
  templateUrl: './board-teams.component.html',
  styleUrls: ['./board-teams.component.scss']
})
export class BoardTeamsComponent implements OnInit {
  boardId: string;

  boardTeams$: Observable<ITeam[]>;

  constructor(
    private activatedRoute: ActivatedRoute,
    private store: Store<IState>
  ) {}

  ngOnInit() {
    this.boardId = this.activatedRoute.snapshot.params['boardId'];

    this.boardTeams$ = this.store.pipe(
      select((state: IState) => state.board.teams)
    );
  }

  handleRemoveBoardTeam(team: ITeam) {
    this.store.dispatch(
      new RemoveBoardTeam({ boardId: this.boardId, teamId: team.businessId })
    );
  }
}
