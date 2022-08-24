import axios from "axios";
import { createContext, useReducer, useState } from "react";
import { commentReducer } from "../reducers/commentReducer";
import {
  apiUrlComment,
  COMMENT_LOADED_SUCCESS,
  COMMENT_LOADED_FAIL,
} from "./constants";
export const CommentContext = createContext();
const CommentContextProvider = ({ children }) => {
  // State
  const [commentState, dispatch] = useReducer(commentReducer, {
    comments: [],
    commentLoading: true,
    comment: null,
    user: {},
  });
  //getall comment
  const getComment = async (productId) => {
    try {
      const response = await axios.get(
        `${apiUrlComment}/getComment/${productId}`
      );
      console.log(response);
      if (response.data.success) {
        dispatch({
          type: COMMENT_LOADED_SUCCESS,
          payload: response.data.comment,
        });
      }
    } catch (error) {
      dispatch({ type: COMMENT_LOADED_FAIL });
    }
  };

  const commentContextData = { getComment, commentState };

  //return provide

  return (
    <CommentContext.Provider value={commentContextData}>
      {children}
    </CommentContext.Provider>
  );
};
export default CommentContextProvider;
