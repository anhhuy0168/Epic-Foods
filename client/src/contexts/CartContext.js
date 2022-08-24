import axios from "axios";
import { createContext, useReducer } from "react";
import { cartReducers } from "../reducers/cartReducer";

import {
  apiGoogleUrl,
  CART_LOADED_FAIL,
  CART_LOADED_SUCCESS,
  ADD_PRODUCT_CART,
  DELETE_PRODUCT_CART,
  FIND_CART_PRODUCT,
  CHANGE_AMOUNT_CART,
} from "../contexts/constants";
export const CartContext = createContext();
const CartContextProvider = ({ children }) => {
  // State
  const [cartState, dispatch] = useReducer(cartReducers, {
    cartProduct: null,
    cart: [],
    cartLoading: true,
  });

  // get all cart
  const getCart = async () => {
    try {
      const response = await axios.get(`${apiGoogleUrl}/auth/cart`);
      if (response.data.success) {
        dispatch({ type: CART_LOADED_SUCCESS, payload: response.data.cart });
      }
    } catch (error) {
      dispatch({ type: CART_LOADED_FAIL });
    }
  };
  // add product to cart
  const addProductCart = async (newCart) => {
    try {
      const response = await axios.patch(
        `${apiGoogleUrl}/auth/cart/cart_user`,
        newCart
      );
      if (response.data.success) {
        dispatch({ type: ADD_PRODUCT_CART, payload: response.data.cart });
        return response.data;
      }
    } catch (error) {
      return error.response.data
        ? error.response.data
        : { success: false, message: "Server error" };
    }
  };
  //change amount cart
  const changeAmountCart = async (productId, amount) => {
    console.log("id context", productId, amount);
    try {
      const response = await axios.patch(
        `${apiGoogleUrl}/auth/cart/cart_product/${productId}`,
        amount
      );
      console.log("res cua change amount", response);
      if (response.data.success)
        dispatch({ type: CHANGE_AMOUNT_CART, payload: response.data.cart });
    } catch (error) {
      console.log(error);
    }
  };

  // delete product in cart
  const deleteProductCart = async (productId) => {
    try {
      const response = await axios.delete(
        `${apiGoogleUrl}/auth/cart/cart_product/${productId}`
      );
      console.log("res cua delete", response);
      if (response.data.success)
        dispatch({ type: DELETE_PRODUCT_CART, payload: productId });
    } catch (error) {
      console.log(error);
    }
  };
  // find product
  const findProduct = (productId) => {
    const cartProduct = cartState.cart.find(
      (product) => product._id === productId
    );
    dispatch({ type: FIND_CART_PRODUCT, payload: cartProduct });
  };

  const cartContextData = {
    cartState,
    findProduct,
    getCart,
    addProductCart,
    deleteProductCart,
    changeAmountCart,
  };

  //return provide

  return (
    <CartContext.Provider value={cartContextData}>
      {children}
    </CartContext.Provider>
  );
};
export default CartContextProvider;
