import { ORDER_LOADED_FAIL, ORDER_LOADED_SUCCESS } from "../contexts/constants";

export const orderReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case ORDER_LOADED_SUCCESS:
      return {
        ...state,
        orders: payload,
      };
    case ORDER_LOADED_FAIL:
      return {
        ...state,
        orders: [],
      };
    // case DELETE_COMMENT:
    //   return {
    //     ...state,
    //     comments: state.comments.filter((comment) => comment._id !== payload),
    //   };
    default:
      return state;
  }
};
