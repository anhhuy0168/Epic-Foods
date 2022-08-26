import axios from "axios";
import { createContext, useReducer, useState } from "react";
import { adminReducer } from "../reducers/adminReducer";
import {
  apiUrl,
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
} from "./constants";
export const AdminContext = createContext();
const AdminContextProvider = ({ children }) => {
  // State
  const [userState, dispatch] = useReducer(adminReducer, {
    users: [],
    userLoading: true,
    listUser: [],
    listCategory: [],
    category: {},
  });
  const [showAddCategoryModal, setShowAddCategoryModal] = useState(false);
  const [showUpdateCategoryModal, setShowUpdateCategoryModal] = useState(false);
  const [showToast, setShowToast] = useState({
    show: true,
    message: "",
    type: null,
  });

  //getall staff
  const getStaff = async () => {
    try {
      const response = await axios.get(`${apiUrl}/admin/getStaff`);
      if (response.data.success) {
        dispatch({ type: USER_LOADED_SUCCESS, payload: response.data.user });
      }
    } catch (error) {
      dispatch({ type: USER_LOADED_FAIL });
    }
  };
  const getUser = async () => {
    try {
      const response = await axios.get(`${apiUrl}/admin/getUser`);
      console.log("user", response);
      if (response.data.success) {
        dispatch({
          type: LIST_USER_LOADED_SUCCESS,
          payload: response.data.listUser,
        });
      }
    } catch (error) {
      dispatch({ type: LIST_USER_LOADED_FAIL });
    }
  };
  const deleteStaff = async (staffId) => {
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
  //find category
  const findCategory = (categoryId) => {
    const category = userState.listCategory.find(
      (category) => category._id === categoryId
    );
    dispatch({ type: FIND_CATEGORY, payload: category });
  };
  //category

  const getCategory = async () => {
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
  //create category
  const addCategory = async (newCategory) => {
    try {
      const response = await axios.post(
        `${apiUrl}/admin/createCategory`,
        newCategory
      );
      if (response.data.success) {
        dispatch({ type: ADD_CATEGORY, payload: response.data.category });
        return response.data;
      }
    } catch (error) {
      return error.response.data
        ? error.response.data
        : { success: false, message: "Server error" };
    }
  };

  // Delete category
  const deleteCategory = async (categoryId) => {
    try {
      const response = await axios.delete(
        `${apiUrl}/admin/deleteCategory/${categoryId}`
      );
      if (response.data.success)
        dispatch({ type: DELETE_CATEGORY, payload: categoryId });
    } catch (error) {
      console.log(error);
    }
  };
  //update category
  const updateCategory = async (updateCategory) => {
    try {
      const response = await axios.patch(
        `${apiUrl}/admin/updateCategory/${updateCategory._id}`,
        updateCategory,
        console.log("id ben context", updateCategory._id)
      );

      console.log(response.data);
      if (response.data.success) {
        dispatch({ type: UPDATE_CATEGORY, payload: response.data.category });
        return response.data;
      }
    } catch (error) {
      console.log(error.response.data);
      return error.response.data
        ? error.response.data
        : { success: false, message: "Server error" };
    }
  };

  const adminContextData = {
    findCategory,
    getUser,
    getStaff,
    userState,
    deleteStaff,
    getCategory,
    addCategory,
    updateCategory,
    deleteCategory,
    showAddCategoryModal,
    setShowAddCategoryModal,
    showUpdateCategoryModal,
    setShowUpdateCategoryModal,
    showToast,
    setShowToast,
  };

  //return provide

  return (
    <AdminContext.Provider value={adminContextData}>
      {children}
    </AdminContext.Provider>
  );
};
export default AdminContextProvider;
