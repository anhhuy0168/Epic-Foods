import { UPDATE_PROFILE, UPDATE_AVATAR } from "../contexts/constants";
export const authReducer = (state, action) => {
  const {
    type,
    payload: { isAuthenticated, user },
    payload,
  } = action;

  switch (type) {
    case "SET_AUTH":
      return {
        ...state,
        authLoading: false,
        isAuthenticated,
        user,
      };
    case UPDATE_PROFILE:
      return {
        ...state,
        user: payload,
      };
    case UPDATE_AVATAR:
      return {
        ...state,
        user: payload,
      };

    default:
      return state;
  }
};
