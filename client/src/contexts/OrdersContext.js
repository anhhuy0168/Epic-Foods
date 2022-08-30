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
  const getOrderUser = async () => {
    try {
      const response = await axios.get(`${apiUrl}/admin/getCategory`);
      if (response.data.success) {
        dispatch({
          type: LIST_CATEGORY_LOADED_SUCCESS,
          payload: response.data.category,
        });
      }
    } catch (error) {
      dispatch({ type: LIST_CATEGORY_LOADED_FAIL });
    }
  };

  const orderContextData = {
    orderState,
    getOrderUser,
    checkOrder,
    getAllOrders,
  };

  //return provide

  return (
    <OrderContext.Provider value={orderContextData}>
      {children}
    </OrderContext.Provider>
  );
};
export default OrderContextProvider;
