import { Action } from '@ngrx/store';

import { ITeam } from '@boards/core/interfaces';

export enum TeamsActionTypes {
  GET_TEAMS = '[TEAMS] Get Teams',
  GET_TEAMS_FAIL = '[TEAMS] Get Teams Fail',
  GET_TEAMS_SUCCESS = '[TEAMS] Get Teams Success'
}

export class GetTeams implements Action {
  readonly type = TeamsActionTypes.GET_TEAMS;
}

export class GetTeamsFail implements Action {
  readonly type = TeamsActionTypes.GET_TEAMS_FAIL;
  constructor(public payload: { error: any }) {}
}

export class GetTeamsSuccess implements Action {
  readonly type = TeamsActionTypes.GET_TEAMS_SUCCESS;
  constructor(public payload: { teams: ITeam[] }) {}
}

export type TeamsActionsUnion = GetTeams | GetTeamsFail | GetTeamsSuccess;
