import React, { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { apiUrl } from "../../../contexts/constants";
import {
  showErrMsg,
  showSuccessMsg,
} from "../../layout/NotificationEmail/NotificationEmail";
import { isLength, isMatch } from "../../../utils/Validation";
import "./Reset.css";
const initialState = {
  password: "",
  cf_password: "",
  err: "",
  success: "",
};

function ResetPassword() {
  const [data, setData] = useState(initialState);
  const { token } = useParams();
  console.log(token);
  const { password, cf_password, err, success } = data;

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value, err: "", success: "" });
  };

  const handleResetPass = async () => {
    if (isLength(password))
      return setData({
        ...data,
        err: "Password must be at least 6 characters.",
        success: "",
      });

    if (!isMatch(password, cf_password))
      return setData({ ...data, err: "Password did not match.", success: "" });
    else {
    }
    try {
      const res = await axios.post(
        `${apiUrl}/auth/reset`,
        { password },
        {
          headers: { Authorization: token },
        }
      );

      return setData({ ...data, err: "", success: res.data.msg });
    } catch (err) {
      err.response.data.msg &&
        setData({ ...data, err: err.response.data.msg, success: "" });
    }
  };

  return (
    <div
      className="fg_pass"
      style={{
        marginLeft: "35%",
        width: "30%",

        border: "1px",
        boxShadow:
          "0 2px 5px 0 rgb(0 0 0 / 16%), 0 2px 20px 0 rgb(0 0 0 / 20%)",
        borderRadius: "10px",
      }}
    >
      <h2
        style={{
          color: "black",
          fontSize: "25px",
          margin: "90px 0 20px 0",
          marginLeft: "20px",
          paddingTop: "20px",
        }}
      >
        Reset Your Password
      </h2>

      <div className="row">
        {err && showErrMsg(err)}
        {success && showSuccessMsg(success)}

        <input
          style={{
            margin: "20px 0 20px 210px",
            width: "60%",
            borderRadius: "5px",
            height: "40px",
          }}
          placeholder="Password"
          className="input"
          type="password"
          name="password"
          id="password"
          value={password}
          onChange={handleChangeInput}
        />

        <input
          style={{
            margin: "20px 0 20px 210px",
            width: "60%",
            borderRadius: "5px",
            height: "40px",
          }}
          placeholder="Confirm Password"
          className="input"
          type="password"
          name="cf_password"
          id="cf_password"
          value={cf_password}
          onChange={handleChangeInput}
        />
      </div>
      <button
        style={{
          marginTop: "40px",
          borderRadius: "10px",
          backgroundColor: "yellow",
          marginLeft: "110px",
          width: "50%",
          height: "40px",
        }}
        className="buttonReset"
        onClick={handleResetPass}
      >
        Reset Password
      </button>
    </div>
  );
}

export default ResetPassword;
