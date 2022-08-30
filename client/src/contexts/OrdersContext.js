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
} from "./constants";
export const OrderContext = createContext();
const OrderContextProvider = ({ children }) => {
  // State
  const [orderState, dispatch] = useReducer(orderReducer, {
    orders: [],
    orderUser: [],
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
  const checkOrder = async (staffId) => {
    try {
      const response = await axios.delete(
        `${apiUrl}/admin/delete_staff/${staffId}`
      );
      console.log(response);
      if (response.data.success)
        dispatch({ type: DELETE_STAFF, payload: staffId });
    } catch (error) {
      console.log(error);
    }
  };

  const orderContextData = {
    orderState,
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
