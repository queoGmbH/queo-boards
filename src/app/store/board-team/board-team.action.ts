import { Action } from '@ngrx/store';

export enum BoardTeamActionTypes {
  CREATE_BOARD_TEAM = '[BOARD_TEAMS] Create Board Team',
  REMOVE_BOARD_TEAM = '[BOARD_TEAMS] Remove Board Team'
}

export class CreateBoardTeam implements Action {
  readonly type = BoardTeamActionTypes.CREATE_BOARD_TEAM;
  constructor(public payload: { boardId: string; teamId: string }) {}
}

export class RemoveBoardTeam implements Action {
  readonly type = BoardTeamActionTypes.REMOVE_BOARD_TEAM;
  constructor(public payload: { boardId: string; teamId: string }) {}
}

export type BoardTeamActionsUnion = CreateBoardTeam | RemoveBoardTeam;
