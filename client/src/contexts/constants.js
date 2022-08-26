export const apiUrl =
  process.env.NODE_ENV !== "production"
    ? "http://localhost:5000/api"
    : "somedeployed";
export const apiUrlComment =
  process.env.NODE_ENV !== "production"
    ? "http://localhost:5000/auth/comment"
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
export const USER_LOADED_SUCCESS = "USER_LOADED_SUCCESS";
export const USER_LOADED_FAIL = "USER_LOADED_FAIL";
export const DELETE_STAFF = "DELETE_STAFF";
export const LIST_USER_LOADED_SUCCESS = "LIST_USER_LOADED_SUCCESS";
export const LIST_USER_LOADED_FAIL = "LIST_USER_LOADED_FAIL";
export const LIST_CATEGORY_LOADED_SUCCESS = "LIST_CATEGORY_LOADED_SUCCESS";
export const LIST_CATEGORY_LOADED_FAIL = "LIST_CATEGORY_LOADED_FAIL";
export const ADD_CATEGORY = "ADD_CATEGORY";
export const DELETE_CATEGORY = "DELETE_CATEGORY";
export const UPDATE_CATEGORY = "UPDATE_CATEGORY";
export const FIND_CATEGORY = "FIND_CATEGORY";
export const COMMENT_LOADED_SUCCESS = "COMMENT_LOADED_SUCCESS";
export const COMMENT_LOADED_FAIL = "COMMENT_LOADED_FAIL";
export const CREATE_COMMENT = "CREATE_COMMENT";
export const DELETE_COMMENT = "DELETE_COMMENT";
export const UPDATE_COMMENT = "UPDATE_COMMENT";
export const FIND_COMMENT = "FIND_COMMENT";
