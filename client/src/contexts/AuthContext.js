import { createContext, useReducer, useEffect, useState } from "react";
import { authReducer } from "../reducers/authReducer";
import {
  apiUrl,
  LOCAL_STORAGE_TOKEN_NAME,
  UPDATE_PROFILE,
  UPDATE_AVATAR,
} from "./constants";
import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
export const AuthContext = createContext();
const AuthContextProvider = ({ children }) => {
  const [authState, dispatch] = useReducer(authReducer, {
    authLoading: true,
    isAuthenticated: false,
    user: null,
    avatarUser: null,
  });
  const [showAddStaffModal, setShowAddStaffModal] = useState(false);
  const [showToast, setShowToast] = useState({
    show: false,
    message: "",
    type: null,
  });

  //authenticated user
  const loadUser = async () => {
    if (localStorage[LOCAL_STORAGE_TOKEN_NAME]) {
      setAuthToken(localStorage[LOCAL_STORAGE_TOKEN_NAME]);
    }

    try {
      const response = await axios.get(`${apiUrl}/auth/`);
      console.log(response);
      if (response.data.success) {
        dispatch({
          type: "SET_AUTH",
          payload: { isAuthenticated: true, user: response.data.user },
        });
      }
    } catch (error) {
      localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME);
      setAuthToken(null);
      dispatch({
        type: "SET_AUTH",
        payload: { isAuthenticated: false, user: null },
      });
    }
  };
  useEffect(() => loadUser(), []);
  //login

  const loginUser = async (userForm) => {
    try {
      const response = await axios.post(`${apiUrl}/auth/login`, userForm);
      if (response.data.success)
        localStorage.setItem(
          LOCAL_STORAGE_TOKEN_NAME,
          response.data.accessToken
        );
      await loadUser();
      return response.data;
    } catch (error) {
      //send req in back-end
      if (error.response.data) return error.response.data;
      else return { success: false, message: error.message };
    }
  };
  //register
  const registerUser = async (userForm) => {
    console.log(userForm);
    try {
      const response = await axios.post(`${apiUrl}/auth/register`, userForm);
      if (response.data.success)
        localStorage.setItem(
          LOCAL_STORAGE_TOKEN_NAME,
          response.data.accessToken
        );

      return response.data;
    } catch (error) {
      if (error.response.data) return error.response.data;
      else return { success: false, message: error.message };
    }
  };
  const registerStaff = async (userForm) => {
    console.log(userForm);
    try {
      const response = await axios.post(`${apiUrl}/auth/register`, userForm);
      if (response.data.success) {
        return response.data;
      }
    } catch (error) {
      if (error.response.data) return error.response.data;
      else return { success: false, message: error.message };
    }
  };
  //logout
  const logoutUser = () => {
    localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME);
    dispatch({
      type: "SET_AUTH",
      payload: { isAuthenticated: false, user: null },
    });
  };
  //update profile
  const updateProfile = async (updateProfile) => {
    try {
      for (var pair of updateProfile.entries()) {
        console.log(pair[0] + ", " + pair[1]);
      }
      const response = await axios.patch(
        `${apiUrl}/auth/updateUser/${updateProfile.get("_id")}`,
        updateProfile,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      if (response.data.success) {
        dispatch({ type: UPDATE_PROFILE, payload: response.data.user });
        return response.data;
      }
    } catch (error) {
      return error.response.data
        ? error.response.data
        : { success: false, message: "Server error" };
    }
  };
  //update avatar
  const updateAvatar = async (updateAvatar) => {
    try {
      for (var pair of updateAvatar.entries()) {
        console.log(pair[0] + ", " + pair[1]);
      }
      const response = await axios.patch(
        `${apiUrl}/auth/updateAvatar/${updateAvatar.get("_id")}`,
        updateAvatar,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      if (response.data.success) {
        dispatch({ type: UPDATE_AVATAR, payload: response.data.avatar });
        return response.data;
      }
    } catch (error) {
      console.log(error);
      return error.response.data
        ? error.response.data
        : { success: false, message: "Server error" };
    }
  };
  //context data
  const authContextData = {
    showToast,
    setShowToast,
    loadUser,
    registerStaff,
    updateAvatar,
    updateProfile,
    showAddStaffModal,
    setShowAddStaffModal,
    loginUser,
    registerUser,
    logoutUser,
    authState,
  };

  //return provide

  return (
    <AuthContext.Provider value={authContextData}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
