export const apiUrl =
  process.env.NODE_ENV !== "production"
    ? "http://localhost:5000/api"
    : "somedeployed";
export const apiUrlComment =
  process.env.NODE_ENV !== "production"
    ? "http://localhost:5000/auth/comment"
    : "somedeployed";
export const apiUrlOrder =
  process.env.NODE_ENV !== "production"
    ? "http://localhost:5000/auth"
    : "somedeployed";
export const apiGoogleUrl =
  process.env.NODE_ENV !== "production"
    ? "http://localhost:5000"
    : "somedeployed";
export const apiChat =
  process.env.NODE_ENV !== "production"
    ? "http://localhost:5000/api"
    : "somedeployed";
export const apiChart =
  process.env.NODE_ENV !== "production"
    ? "http://localhost:5000/api/statistic"
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
export const UPDATE_PROFILE = "UPDATE_PROFILE";
export const ORDER_LOADED_SUCCESS = "ORDER_LOADED_SUCCESS";
export const ORDER_LOADED_FAIL = "ORDER_LOADED_FAIL";
export const ORDER_USER_LOADED_FAIL = "ORDER_USER_LOADED_FAIL";
export const ORDER_USER_LOADED_SUCCESS = "ORDER_USER_LOADED_SUCCESS";
export const CHECK_ORDER = "CHECK_ORDER";
export const ORDER_HISTORY_LOADED_SUCCESS = "ORDER_HISTORY_LOADED_SUCCESS";
export const ORDER_HISTORY_LOADED_FAIL = "ORDER_HISTORY_LOADED_FAIL";
export const DELETE_ORDER = "DELETE_ORDER";
export const UPDATE_AVATAR = "UPDATE_AVATAR";
export const ADD_CONVERSATION = "ADD_CONVERSATION";
export const CHART_LOADED_SUCCESS = "CHART_LOADED_SUCCESS";
export const CHART_LOADED_FAIL = "CHART_LOADED_FAIL";
export const CHART_MONTH_LOADED_SUCCESS = "CHART_MONTH_LOADED_SUCCESS";
export const CHART_MONTH_LOADED_FAIL = "CHART_MONTH_LOADED_FAIL";
export const GET_CONVERSATION = "GET_CONVERSATION";
