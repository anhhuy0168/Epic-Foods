import {
  CART_LOADED_FAIL,
  CART_LOADED_SUCCESS,
  ADD_PRODUCT_CART,
  DELETE_PRODUCT_CART,
  FIND_CART_PRODUCT,
  CHANGE_AMOUNT_CART,
} from "../contexts/constants";

export const cartReducers = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case CART_LOADED_SUCCESS:
      return {
        ...state,
        cart: payload,
        cartLoading: false,
      };
    case CHANGE_AMOUNT_CART:
      return {
        ...state,
        cart: [],
      };
    case CART_LOADED_FAIL:
      return {
        ...state,
        cart: [],
        cartLoading: false,
      };
    case ADD_PRODUCT_CART:
      return {
        ...state,
        cart: [...state.cart, payload],
      };
    case DELETE_PRODUCT_CART:
      return {
        ...state,
        cart: state.cart.filter((product) => product._id !== payload),
      };
    case CHANGE_AMOUNT_CART: {
      return {
        ...state,
        cart: payload,
      };
    }
    case FIND_CART_PRODUCT:
      return { ...state, cartProduct: payload };
    default:
      return state;
  }
};
