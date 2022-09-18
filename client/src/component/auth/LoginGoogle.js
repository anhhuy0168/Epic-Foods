import React, { useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";
import { GoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode";
import { AuthContext } from "../../contexts/AuthContext";
import { LOCAL_STORAGE_TOKEN_NAME } from "../../contexts/constants";
import { FcGoogle } from "react-icons/fc";
import axios from "axios";
const LoginGoogle = () => {
  const { loadUser } = useContext(AuthContext);

  const history = useHistory();
  const login = useGoogleLogin({
    onSuccess: async (respose) => {
      try {
        const res = await axios.get(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          {
            headers: {
              Authorization: `Bearer ${respose.access_token}`,
            },
          }
        );
        const information = await axios.post(
          "http://localhost:5000/google/user",
          {
            body: res.data,
          }
        );

        if (information.data.success) {
          localStorage.setItem(
            LOCAL_STORAGE_TOKEN_NAME,
            information.data.accessToken
          );
          await loadUser();
          history.push("/homepage");
          return information.data;
        }
      } catch (err) {
        console.log(err);
      }
    },
  });

  return <FcGoogle onClick={login} size={30} />;
};

export default LoginGoogle;
