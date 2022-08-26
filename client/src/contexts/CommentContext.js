import axios from "axios";
import { createContext, useReducer, useState } from "react";
import { commentReducer } from "../reducers/commentReducer";
import {
  apiUrlComment,
  COMMENT_LOADED_SUCCESS,
  COMMENT_LOADED_FAIL,
  CREATE_COMMENT,
  DELETE_COMMENT,
  UPDATE_COMMENT,
  FIND_COMMENT,
} from "./constants";
export const CommentContext = createContext();
const CommentContextProvider = ({ children }) => {
  // State
  const [commentState, dispatch] = useReducer(commentReducer, {
    comments: [],
    commentLoading: true,
    comment: {},
    user: {},
  });
  const [showUpdateCommentModal, setShowUpdateCommentModal] = useState(false);
  const [showToast, setShowToast] = useState({
    show: true,
    message: "",
    type: null,
  });
  //getall comment
  const getComment = async (productId) => {
    try {
      const response = await axios.get(
        `${apiUrlComment}/getComment/${productId}`
      );
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
        `${apiUrlComment}/deleteComment/${commentId}`
      );
      console.log("res cua delete", response);
      if (response.data.success)
        dispatch({ type: DELETE_COMMENT, payload: commentId });
    } catch (error) {
      console.log(error);
    }
  };
  const updateComment = async (updateComment) => {
    try {
      const response = await axios.patch(
        `${apiUrlComment}/editComment/${updateComment._id}`,
        updateComment
      );
      if (response.data.success) {
        dispatch({ type: UPDATE_COMMENT, payload: response.data.comment });
        return response.data;
      }
    } catch (error) {
      console.log(error.response.data);
      return error.response.data
        ? error.response.data
        : { success: false, message: "Server error" };
    }
  };
  const findComment = (commentId) => {
    const comment = commentState.comments.find(
      (comment) => comment._id === commentId
    );
    console.log(comment);

    dispatch({ type: FIND_COMMENT, payload: comment });
  };
  const commentContextData = {
    showUpdateCommentModal,
    setShowUpdateCommentModal,
    showToast,
    setShowToast,
    findComment,
    getComment,
    commentState,
    createComment,
    deleteComment,
    updateComment,
  };

  //return provide

  return (
    <CommentContext.Provider value={commentContextData}>
      {children}
    </CommentContext.Provider>
  );
};
export default CommentContextProvider;
