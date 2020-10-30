import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Effect, Actions, ofType } from '@ngrx/effects';

import { map, switchMap, tap } from 'rxjs/operators';

import { ITeam, IUser } from '@boards/core/interfaces';

import { TeamService } from '@boards/core/services';

import { TeamActions, TeamsActions } from './actions';

@Injectable()
export class TeamsEffects {
  @Effect()
  getTeams$ = this.actions$.pipe(
    ofType(TeamsActions.TeamsActionTypes.GET_TEAMS),
    switchMap(() => {
      return this.teamService.getAll();
    }),
    map((teams: ITeam[]) => {
      return new TeamsActions.GetTeamsSuccess({ teams });
    })
  );

  @Effect()
  getTeam$ = this.actions$.pipe(
    ofType<TeamActions.GetTeam>(TeamActions.TeamActionTypes.GET_TEAM),
    map((action) => action.payload),
    switchMap(({ teamId }) => {
      return this.teamService.get(teamId);
    }),
    map((team: ITeam) => {
      return new TeamActions.GetTeamSuccess({ team });
    })
  );

  @Effect()
  getTeamMembers$ = this.actions$.pipe(
    ofType<TeamActions.GetTeamMembers>(
      TeamActions.TeamActionTypes.GET_TEAM_MEMBERS
    ),
    map((action) => action.payload),
    switchMap(({ team }) => {
      return this.teamService.getTeamMembers(team);
    }),
    map((members: IUser[]) => {
      return new TeamActions.GetTeamMembersSuccess({ members });
    })
  );

  @Effect()
  createTeam$ = this.actions$.pipe(
    ofType<TeamActions.CreateTeam>(TeamActions.TeamActionTypes.CREATE_TEAM),
    map((action) => action.payload),
    switchMap(({ team }) => {
      return this.teamService.createTeam(team);
    }),
    map((team: ITeam) => {
      return new TeamActions.CreateTeamSuccess({ team });
    })
  );

  @Effect()
  createTeamMembers$ = this.actions$.pipe(
    ofType<TeamActions.CreateTeamMembers>(
      TeamActions.TeamActionTypes.CREATE_TEAM_MEMBERS
    ),
    map((action) => action.payload),
    switchMap(({ teamId, members }) => {
      return this.teamService.createTeamMembers(teamId, members);
    }),
    map((members: IUser[]) => {
      return new TeamActions.CreateTeamMembersSuccess({ members });
    })
  );

  @Effect()
  updateTeam$ = this.actions$.pipe(
    ofType<TeamActions.UpdateTeam>(TeamActions.TeamActionTypes.UPDATE_TEAM),
    map((action) => action.payload),
    switchMap(({ team }) => {
      const { businessId, name, description } = team;
      return this.teamService.updateTeam(businessId, {
        name,
        description
      });
    }),
    map((team: ITeam) => {
      return new TeamActions.UpdateTeamSuccess({ team });
    })
  );

  @Effect()
  removeTeam$ = this.actions$.pipe(
    ofType<TeamActions.RemoveTeam>(TeamActions.TeamActionTypes.REMOVE_TEAM),
    map((action) => action.payload),
    switchMap(({ teamId }) => {
      return this.teamService.removeTeam(teamId);
    }),
    map((teams: ITeam[]) => {
      return new TeamActions.RemoveTeamSuccess({ teams });
    })
  );

  @Effect()
  removeTeamMember$ = this.actions$.pipe(
    ofType<TeamActions.RemoveTeamMember>(
      TeamActions.TeamActionTypes.REMOVE_TEAM_MEMBER
    ),
    map((action) => action.payload),
    switchMap(({ teamId, member }) => {
      return this.teamService.removeTeamMember(teamId, member);
    }),
    map((members: IUser[]) => {
      return new TeamActions.RemoveTeamMemberSuccess({ members });
    })
  );

  @Effect({ dispatch: false })
  redirectToTeams = this.actions$.pipe(
    ofType(TeamActions.TeamActionTypes.REMOVE_TEAM_SUCCESS),
    tap(() => this.router.navigate(['/teams']))
  );

  constructor(
    private actions$: Actions,
    private router: Router,
    private teamService: TeamService
  ) {}
}
