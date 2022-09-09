import { ADD_CONVERSATION } from "../contexts/constants";
export const chatReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case ADD_CONVERSATION:
      return {
        ...state,
        conversation: [...state.conversation, payload],
      };

    default:
      return state;
  }
};
