import axios from "axios";
import { createContext, useReducer, useState } from "react";
import { chatReducer } from "../reducers/chatReducer";
import { apiChat, ADD_CONVERSATION } from "./constants";
export const ChatContext = createContext();
const ChatContextProvider = ({ children }) => {
  // State
  const [conversationState, dispatch] = useReducer(chatReducer, {
    conversation: [],
  });

  //create conversation
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

  const chatContextData = {
    conversationState,
    createConversation,
  };

  //return provide

  return (
    <ChatContext.Provider value={chatContextData}>
      {children}
    </ChatContext.Provider>
  );
};
export default ChatContextProvider;
