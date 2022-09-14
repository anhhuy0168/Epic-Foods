import axios from "axios";
import { createContext, useReducer, useState } from "react";
import { chatReducer } from "../reducers/chatReducer";
import { apiChat, ADD_CONVERSATION, GET_CONVERSATION } from "./constants";
export const ChatContext = createContext();
const ChatContextProvider = ({ children }) => {
  // State
  const [conversationState, dispatch] = useReducer(chatReducer, {
    conversation: [],
    oneConversation: [],
  });
  const getConversation = async (userId) => {
    try {
      const response = await axios.get(`${apiChat}/conversations/${userId}`);
      if (response.data.success)
        dispatch({
          type: GET_CONVERSATION,
          payload: response.data.conversation,
        });
    } catch (error) {
      console.log(error);
    }
  };
  //get conversation
  const createConversation = async (newConversation) => {
    // console.log(newConversation);
    try {
      const response = await axios.post(
        `${apiChat}/conversations`,
        newConversation
      );
      if (response.data.success) {
        dispatch({
          type: ADD_CONVERSATION,
          payload: response.data.conversation,
        });
        return response.data;
      }
    } catch (error) {
      return error.response.data
        ? error.response.data
        : { success: false, message: "Server error" };
    }
  };
  //create conversation

  const chatContextData = {
    conversationState,
    createConversation,
    getConversation,
  };

  //return provide

  return (
    <ChatContext.Provider value={chatContextData}>
      {children}
    </ChatContext.Provider>
  );
};
export default ChatContextProvider;
