import { ADD_CONVERSATION, GET_CONVERSATION } from "../contexts/constants";
export const chatReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case ADD_CONVERSATION:
      return {
        ...state,
        conversation: [...state.conversation, payload],
      };
    case GET_CONVERSATION:
      return {
        ...state,
        oneConversation: payload,
      };
    default:
      return state;
  }
};
