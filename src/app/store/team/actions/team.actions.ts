import { Action } from '@ngrx/store';

import { ITeam, IUser } from '@boards/core/interfaces';

export enum TeamActionTypes {
  GET_TEAM = '[TEAMS] Get Team',
  GET_TEAM_SUCCESS = '[TEAMS] Get Team Success',

  GET_TEAM_MEMBERS = '[TEAMS] Get Team Members',
  GET_TEAM_MEMBERS_SUCCESS = '[TEAMS] Get Team Members Success',

  CREATE_TEAM = '[TEAMS] Create Team',
  CREATE_TEAM_SUCCESS = '[TEAMS] Create Team Success',

  CREATE_TEAM_MEMBERS = '[TEAMS] Create Team Members',
  CREATE_TEAM_MEMBERS_SUCCESS = '[TEAMS] Create Team Members Success',

  UPDATE_TEAM = '[TEAMS] Update Team',
  UPDATE_TEAM_SUCCESS = '[TEAMS] Update Team Success',

  REMOVE_TEAM = '[TEAMS] Remove Team',
  REMOVE_TEAM_SUCCESS = '[TEAMS] Remove Team Success',

  REMOVE_TEAM_MEMBER = '[TEAMS] Remove Team Member',
  REMOVE_TEAM_MEMBER_SUCCESS = '[TEAMS] Remove Team Member Success'
}

export class GetTeam implements Action {
  readonly type = TeamActionTypes.GET_TEAM;
  constructor(public payload: { teamId: string }) {}
}

export class GetTeamSuccess implements Action {
  readonly type = TeamActionTypes.GET_TEAM_SUCCESS;
  constructor(public payload: { team: ITeam }) {}
}

export class GetTeamMembers implements Action {
  readonly type = TeamActionTypes.GET_TEAM_MEMBERS;
  // todo: teamId
  constructor(public payload: { team: ITeam }) {}
}

export class GetTeamMembersSuccess implements Action {
  readonly type = TeamActionTypes.GET_TEAM_MEMBERS_SUCCESS;
  constructor(public payload: { members: IUser[] }) {}
}

export class CreateTeam implements Action {
  readonly type = TeamActionTypes.CREATE_TEAM;
  constructor(public payload: { team: ITeam }) {}
}

export class CreateTeamSuccess implements Action {
  readonly type = TeamActionTypes.CREATE_TEAM_SUCCESS;
  constructor(public payload: { team: ITeam }) {}
}

export class CreateTeamMembers implements Action {
  readonly type = TeamActionTypes.CREATE_TEAM_MEMBERS;
  constructor(public payload: { teamId: string; members: IUser[] }) {}
}

export class CreateTeamMembersSuccess implements Action {
  readonly type = TeamActionTypes.CREATE_TEAM_MEMBERS_SUCCESS;
  constructor(public payload: { members: IUser[] }) {}
}

export class UpdateTeam implements Action {
  readonly type = TeamActionTypes.UPDATE_TEAM;
  constructor(public payload: { team: ITeam }) {}
}

export class UpdateTeamSuccess implements Action {
  readonly type = TeamActionTypes.UPDATE_TEAM_SUCCESS;
  constructor(public payload: { team: ITeam }) {}
}

export class RemoveTeam implements Action {
  readonly type = TeamActionTypes.REMOVE_TEAM;
  constructor(public payload: { teamId: string }) {}
}

export class RemoveTeamSuccess implements Action {
  readonly type = TeamActionTypes.REMOVE_TEAM_SUCCESS;
  constructor(public payload: { teams: ITeam[] }) {}
}

export class RemoveTeamMember implements Action {
  readonly type = TeamActionTypes.REMOVE_TEAM_MEMBER;
  // todo: userId
  constructor(public payload: { teamId: string; member: IUser }) {}
}

export class RemoveTeamMemberSuccess implements Action {
  readonly type = TeamActionTypes.REMOVE_TEAM_MEMBER_SUCCESS;
  constructor(public payload: { members: IUser[] }) {}
}

export type TeamActionsUnion =
  | GetTeam
  | GetTeamSuccess
  | GetTeamMembers
  | GetTeamMembersSuccess
  | CreateTeam
  | CreateTeamSuccess
  | CreateTeamMembers
  | CreateTeamMembersSuccess
  | UpdateTeam
  | UpdateTeamSuccess
  | RemoveTeam
  | RemoveTeamSuccess
  | RemoveTeamMember
  | RemoveTeamMemberSuccess;
