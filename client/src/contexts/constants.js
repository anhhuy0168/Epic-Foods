export const apiUrl =
  process.env.NODE_ENV !== "production"
    ? "http://localhost:5000/api"
    : "somedeployed";

export const apiGoogleUrl =
  process.env.NODE_ENV !== "production"
    ? "http://localhost:5000"
    : "somedeployed";
export const LOCAL_STORAGE_TOKEN_NAME = "epic-food";

export const FOODS_LOADED_SUCCESS = "FOODS_LOADED_SUCCESS";
export const FOODS_LOADED_FAIL = "FOODS_LOADED_FAIL";
export const ADD_FOOD = "ADD_FOOD";
export const DELETE_FOOD = "DELETE_FOOD";
export const UPDATE_FOOD = "UPDATE_FOOD";
export const FIND_FOOD = "FIND_FOOD";
export const GET_ONE_FOOD = " GET_ONE_FOOD";
export const CART_LOADED_SUCCESS = "CART_LOADED_SUCCESS";
export const CART_LOADED_FAIL = "CART_LOADED_FAIL";
export const ADD_PRODUCT_CART = "ADD_PRODUCT_CART";
export const DELETE_PRODUCT_CART = "DELETE_PRODUCT_CART";
export const FIND_CART_PRODUCT = "FIND_CART_PRODUCT";
export const CHANGE_AMOUNT_CART = "CHANGE_AMOUNT_CART";
