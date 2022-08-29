import { UPDATE_PROFILE } from "../contexts/constants";
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

    default:
      return state;
  }
};
