import {
  USER_LOADED_SUCCESS,
  USER_LOADED_FAIL,
  DELETE_STAFF,
  LIST_USER_LOADED_FAIL,
  LIST_USER_LOADED_SUCCESS,
  LIST_CATEGORY_LOADED_SUCCESS,
  LIST_CATEGORY_LOADED_FAIL,
  ADD_CATEGORY,
  DELETE_CATEGORY,
  UPDATE_CATEGORY,
  FIND_CATEGORY,
} from "../contexts/constants";
export const adminReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case USER_LOADED_SUCCESS:
      return {
        ...state,
        users: payload,
        userLoading: false,
      };
    case USER_LOADED_FAIL:
      return {
        ...state,
        users: [],
        userLoading: false,
      };
    case LIST_USER_LOADED_SUCCESS:
      return {
        ...state,
        listUser: payload,
      };
    case LIST_USER_LOADED_FAIL:
      return {
        ...state,
        listUser: [],
      };

    case DELETE_STAFF:
      return {
        ...state,
        users: state.users.filter((user) => user._id !== payload),
      };
    //category
    case LIST_CATEGORY_LOADED_SUCCESS:
      return {
        ...state,
        listCategory: payload,
      };
    case LIST_CATEGORY_LOADED_FAIL:
      return {
        ...state,
        listCategory: [],
      };
    case ADD_CATEGORY:
      return {
        ...state,
        listCategory: [...state.listCategory, payload],
      };

    case DELETE_CATEGORY:
      return {
        ...state,
        listCategory: state.listCategory.filter((food) => food._id !== payload),
      };
    case UPDATE_CATEGORY:
      const newCategory = state.listCategory.map((category) =>
        category._id === payload._id ? payload : category
      );

      return {
        ...state,
        listCategory: newCategory,
      };
    case FIND_CATEGORY:
      return { ...state, category: payload };
    default:
      return state;
  }
};
