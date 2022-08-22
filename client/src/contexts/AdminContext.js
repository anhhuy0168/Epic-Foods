import axios from "axios";
import { createContext, useReducer } from "react";
import { adminReducer } from "../reducers/adminReducer";
import {
  apiUrl,
  USER_LOADED_SUCCESS,
  USER_LOADED_FAIL,
  DELETE_STAFF,
  LIST_USER_LOADED_FAIL,
  LIST_USER_LOADED_SUCCESS,
} from "./constants";
export const AdminContext = createContext();
const AdminContextProvider = ({ children }) => {
  // State
  const [userState, dispatch] = useReducer(adminReducer, {
    users: [],
    userLoading: true,
    listUser: [],
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

  const adminContextData = {
    getUser,
    getStaff,
    userState,
    deleteStaff,
  };

  //return provide

  return (
    <AdminContext.Provider value={adminContextData}>
      {children}
    </AdminContext.Provider>
  );
};
export default AdminContextProvider;
