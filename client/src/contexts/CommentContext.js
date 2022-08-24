import axios from "axios";
import { createContext, useReducer, useState } from "react";
import { commentReducer } from "../reducers/commentReducer";
import {
  apiUrlComment,
  COMMENT_LOADED_SUCCESS,
  COMMENT_LOADED_FAIL,
  CREATE_COMMENT,
  DELETE_COMMENT,
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

  //create
  const createComment = async (newComment) => {
    try {
      const response = await axios.post(
        `${apiUrlComment}/createComment`,
        newComment
      );
      if (response.data.success) {
        dispatch({ type: CREATE_COMMENT, payload: response.data.comment });
        return response.data;
      }
    } catch (error) {
      return error.response.data
        ? error.response.data
        : { success: false, message: "Server error" };
    }
  };
  //delete
  const deleteComment = async (commentId) => {
    try {
      const response = await axios.delete(
        `${apiGoogleUrl}/auth/cart/cart_product/${commentId}`
      );
      console.log("res cua delete", response);
      if (response.data.success)
        dispatch({ type: DELETE_COMMENT, payload: commentId });
    } catch (error) {
      console.log(error);
    }
  };
  const commentContextData = {
    getComment,
    commentState,
    createComment,
    deleteComment,
  };

  //return provide

  return (
    <CommentContext.Provider value={commentContextData}>
      {children}
    </CommentContext.Provider>
  );
};
export default CommentContextProvider;
