import React, { useState } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import { apiUrl } from "../../../contexts/constants";
import {
  showErrMsg,
  showSuccessMsg,
} from "../../layout/NotificationEmail/NotificationEmail";
import "./ForgotPassword.css";
const initialState = {
  email: "",
  err: "",
  success: "",
};

function ForgotPassword() {
  const [data, setData] = useState(initialState);

  const { email, err, success } = data;

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value, err: "", success: "" });
  };

  const forgotPassword = async () => {
    try {
      const res = await axios.post(`${apiUrl}/auth/forgot`, {
        email,
      });

      return setData({ ...data, err: "", success: res.data.msg });
    } catch (err) {
      err.response.data.msg &&
        setData({ ...data, err: err.response.data.msg, success: "" });
    }
  };

  return (
    <>
      <div className="title">
        <div className="Left"></div>
        <div className="fg_pass">
          <div className="row">
            <div>{err && showErrMsg(err)}</div>
            <div>{success && showSuccessMsg(success)}</div>
            <div className="Enter">Please enter your email in form below</div>
            <input
              className="Input"
              placeholder="Enter your email"
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={handleChangeInput}
            />
            <Button
              onClick={forgotPassword}
              variant="outline-warning"
              className="button"
              size="sm"
              active
            >
              Verify
            </Button>{" "}
          </div>
        </div>
      </div>
    </>
  );
}

export default ForgotPassword;
