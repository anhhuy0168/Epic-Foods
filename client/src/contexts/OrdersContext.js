import axios from "axios";
import { createContext, useReducer, useState } from "react";
import { orderReducer } from "../reducers/orderReducer";
import {
  apiUrlOrder,
  apiUrl,
  ORDER_LOADED_SUCCESS,
  ORDER_LOADED_FAIL,
  DELETE_STAFF,
  LIST_USER_LOADED_FAIL,
  LIST_USER_LOADED_SUCCESS,
  LIST_CATEGORY_LOADED_SUCCESS,
  LIST_CATEGORY_LOADED_FAIL,
  ORDER_USER_LOADED_SUCCESS,
  ORDER_USER_LOADED_FAIL,
  ADD_CATEGORY,
  DELETE_CATEGORY,
  UPDATE_CATEGORY,
  FIND_CATEGORY,
  ORDER_HISTORY_LOADED_SUCCESS,
  ORDER_HISTORY_LOADED_FAIL,
  CHECK_ORDER,
} from "./constants";
export const OrderContext = createContext();
const OrderContextProvider = ({ children }) => {
  // State
  const [orderState, dispatch] = useReducer(orderReducer, {
    orders: [],
    orderUser: [],
    historyOrders: [],
  });
  //getall staff
  const getAllOrders = async () => {
    try {
      const response = await axios.get(`${apiUrlOrder}/orders`);
      console.log(response);
      if (response.data.success) {
        dispatch({
          type: ORDER_LOADED_SUCCESS,
          payload: response.data.listOrder,
        });
      }
    } catch (error) {
      dispatch({ type: ORDER_LOADED_FAIL });
    }
  };
  const getOrdersHistory = async () => {
    try {
      const response = await axios.get(`${apiUrlOrder}/historyOrder`);
      console.log(response);
      if (response.data.success) {
        dispatch({
          type: ORDER_HISTORY_LOADED_SUCCESS,
          payload: response.data.listHistoryOrder,
        });
      }
    } catch (error) {
      dispatch({ type: ORDER_HISTORY_LOADED_FAIL });
    }
  };
  const getUserOrder = async () => {
    try {
      const response = await axios.get(`${apiUrlOrder}/orderUser`);
      if (response.data.success) {
        dispatch({
          type: ORDER_USER_LOADED_SUCCESS,
          payload: response.data.order,
        });
      }
    } catch (error) {
      dispatch({ type: ORDER_USER_LOADED_FAIL });
    }
  };
  const checkOrder = async (orderId) => {
    try {
      const response = await axios.delete(
        `${apiUrlOrder}/check_orderUser/${orderId}`
      );
      console.log(response);
      if (response.data.success)
        dispatch({ type: CHECK_ORDER, payload: orderId });
    } catch (error) {
      console.log(error);
    }
  };

  const orderContextData = {
    orderState,
    getOrdersHistory,
    checkOrder,
    getAllOrders,
    getUserOrder,
  };

  //return provide

  return (
    <OrderContext.Provider value={orderContextData}>
      {children}
    </OrderContext.Provider>
  );
};
export default OrderContextProvider;
