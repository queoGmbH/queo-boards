import { Title } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { select, Store } from '@ngrx/store';

import { Observable } from 'rxjs';

import { ITeam } from '@boards/core/interfaces';
import { IState } from '@boards/store/state.interface';

import { TeamActions } from '@boards/store/team';

@Component({
  selector: 'boards-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.scss']
})
export class TeamsComponent implements OnInit {
  teams$: Observable<any>;

  constructor(
    private router: Router,
    private store: Store<IState>,
    private titleService: Title
  ) {}

  ngOnInit() {
    this.titleService.setTitle('Teams');
    this.teams$ = this.store.pipe(select((state: IState) => state.teams.all));
  }

  createTeam(team: ITeam) {
    this.store.dispatch(new TeamActions.CreateTeam({ team }));
  }

  teamMembers(team: ITeam) {
    this.router.navigate([`teams/${team.businessId}/members`]);
  }

  teamSettings(team: ITeam) {
    this.router.navigate([`teams/${team.businessId}/settings`]);
  }

  teamBoards(team: ITeam) {
    this.router.navigate([`teams/${team.businessId}/boards`]);
  }
}
