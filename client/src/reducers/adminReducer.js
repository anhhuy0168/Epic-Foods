import {
  USER_LOADED_SUCCESS,
  USER_LOADED_FAIL,
  DELETE_STAFF,
  LIST_USER_LOADED_FAIL,
  LIST_USER_LOADED_SUCCESS,
} from "../contexts/constants";
export const adminReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case USER_LOADED_SUCCESS:
      return {
        ...state,
        users: payload,
        userLoading: false,
      };
    case USER_LOADED_FAIL:
      return {
        ...state,
        users: [],
        userLoading: false,
      };
    case LIST_USER_LOADED_SUCCESS:
      return {
        ...state,
        listUser: payload,
      };
    case LIST_USER_LOADED_FAIL:
      return {
        ...state,
        listUser: [],
      };

    case DELETE_STAFF:
      return {
        ...state,
        users: state.users.filter((user) => user._id !== payload),
      };
    default:
      return state;
  }
};
