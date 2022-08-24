import {
  COMMENT_LOADED_FAIL,
  COMMENT_LOADED_SUCCESS,
} from "../contexts/constants";

export const commentReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case COMMENT_LOADED_SUCCESS:
      return {
        ...state,
        comments: payload,
        commentLoading: false,
        user: payload.user_id,
      };
    case COMMENT_LOADED_FAIL:
      return {
        ...state,
        comments: [],
        commentLoading: false,
      };
    default:
      return state;
  }
};
