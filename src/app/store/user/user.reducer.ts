import { IUserState } from '@boards/core/interfaces';

import { UserActionTypes, UserActionsUnion } from './user.action';

const INITIAL_USER_STATE: IUserState = {
  currentUser: {
    firstname: null,
    lastname: null,
    businessId: null,
    name: null,
    isEnabled: false,
    roles: []
  },
  currentBoardRoles: [],
  all: []
};

export function userReducer(
  state: IUserState = INITIAL_USER_STATE,
  action: UserActionsUnion
): IUserState {
  switch (action.type) {
    case UserActionTypes.GET_CURRENT_USER_SUCCESS: {
      const { user } = action.payload;
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          ...user
        }
      };
    }

    case UserActionTypes.GET_CURRENT_USER_ROLES_SUCCESS: {
      const { roles } = action.payload;
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          roles: [...roles]
        }
      };
    }

    case UserActionTypes.GET_CURRENT_BOARD_ROLES_SUCCESS: {
      const { boardRoles } = action.payload;
      return {
        ...state,
        currentBoardRoles: [...boardRoles]
      };
    }

    case UserActionTypes.GET_USERS_SUCCESS: {
      const { users } = action.payload;
      return {
        ...state,
        all: [...users]
      };
    }

    default: {
      return state;
    }
  }
}
