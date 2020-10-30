import { IAuthStore } from '@boards/core/interfaces';

import { AuthActionTypes, AuthActionsUnion } from './auth.action';

const INIT_AUTH: IAuthStore = {
  currentUser: null,
  currentAuthInfo: null
};

export function authReducer(
  state: IAuthStore = INIT_AUTH,
  action: AuthActionsUnion
): IAuthStore {
  switch (action.type) {
    case AuthActionTypes.AUTH_INFO_ADDED: {
      const { authInfo } = action.payload;
      return {
        ...state,
        currentAuthInfo: authInfo
      };
    }

    case AuthActionTypes.AUTH_INFO_REMOVED: {
      return {
        ...state,
        currentAuthInfo: null
      };
    }

    default: {
      return state;
    }
  }
}
