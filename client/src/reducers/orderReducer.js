import {
  ORDER_LOADED_FAIL,
  ORDER_LOADED_SUCCESS,
  ORDER_USER_LOADED_SUCCESS,
  ORDER_USER_LOADED_FAIL,
  ORDER_HISTORY_LOADED_SUCCESS,
  ORDER_HISTORY_LOADED_FAIL,
  CHECK_ORDER,
} from "../contexts/constants";

export const orderReducer = (state, action) => {
  const { type, payload } = action;
  console.log(payload);
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
    case ORDER_HISTORY_LOADED_SUCCESS:
      return {
        ...state,
        historyOrders: payload,
      };
    case ORDER_HISTORY_LOADED_FAIL:
      return {
        ...state,
        historyOrders: [],
      };
    case ORDER_USER_LOADED_SUCCESS:
      return {
        ...state,
        orderUser: payload,
      };
    case ORDER_USER_LOADED_FAIL:
      return {
        ...state,
        orderUser: [],
      };
    case CHECK_ORDER:
      return {
        ...state,
        orders: state.orders.filter((order) => order._id !== payload),
      };
    default:
      return state;
  }
};
