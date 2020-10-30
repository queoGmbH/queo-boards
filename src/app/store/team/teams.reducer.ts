import { ITeam, ITeamState } from '@boards/core/interfaces';

import { TeamActions, TeamsActions } from './actions';

const INITIAL_TEAM_STATE: ITeamState = {
  currentTeam: undefined,
  all: []
};

export function teamsReducer(
  state: ITeamState = INITIAL_TEAM_STATE,
  action: TeamActions.TeamActionsUnion | TeamsActions.TeamsActionsUnion
): ITeamState {
  switch (action.type) {
    case TeamsActions.TeamsActionTypes.GET_TEAMS_SUCCESS: {
      const { teams } = action.payload;
      return {
        ...state,
        all: [...teams]
      };
    }

    case TeamActions.TeamActionTypes.GET_TEAM_SUCCESS: {
      const { team } = action.payload;
      return {
        ...state,
        currentTeam: {
          ...team
        }
      };
    }

    case TeamActions.TeamActionTypes.CREATE_TEAM_SUCCESS: {
      const { team } = action.payload;
      return {
        ...state,
        all: [...state.all, team]
      };
    }

    case TeamActions.TeamActionTypes.CREATE_TEAM_MEMBERS_SUCCESS:
    case TeamActions.TeamActionTypes.REMOVE_TEAM_MEMBER_SUCCESS: {
      const { members } = action.payload;
      return {
        ...state,
        currentTeam: {
          ...state.currentTeam,
          members: [...members]
        }
      };
    }

    case TeamActions.TeamActionTypes.UPDATE_TEAM_SUCCESS: {
      const { team } = action.payload;
      return {
        currentTeam: {
          ...team
        },
        all: [
          ...state.all.map((t: ITeam) => {
            if (t.businessId === team.businessId) {
              return {
                ...team
              };
            }

            return t;
          })
        ]
      };
    }

    default: {
      return state;
    }
  }
}
