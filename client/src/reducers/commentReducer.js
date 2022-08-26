import {
  COMMENT_LOADED_FAIL,
  COMMENT_LOADED_SUCCESS,
  CREATE_COMMENT,
  DELETE_COMMENT,
  UPDATE_COMMENT,
  FIND_COMMENT,
} from "../contexts/constants";

export const commentReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case COMMENT_LOADED_SUCCESS:
      return {
        ...state,
        comments: payload,
        commentLoading: false,
        user: payload,
      };
    case COMMENT_LOADED_FAIL:
      return {
        ...state,
        comments: [],
        commentLoading: false,
      };
    case CREATE_COMMENT:
      return {
        ...state,
        comments: [...state.comments, payload],
      };
    case DELETE_COMMENT:
      return {
        ...state,
        comments: state.comments.filter((comment) => comment._id !== payload),
      };
    case UPDATE_COMMENT:
      const newComment = state.comments.map((comment) =>
        comment._id === payload._id ? payload : comment
      );
      return {
        ...state,
        comments: newComment,
      };
    case FIND_COMMENT:
      return { ...state, comment: payload };
    default:
      return state;
  }
};
