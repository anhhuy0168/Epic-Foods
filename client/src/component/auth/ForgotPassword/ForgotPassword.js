import React, { useState } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import { apiUrl } from "../../../contexts/constants";
import dribble from "../../../assets/dribbble.jpg";
import { Link, useHistory } from "react-router-dom";

import "./ForgotPassword.css";
import Form from "react-bootstrap/Form";
import {
  showErrMsg,
  showSuccessMsg,
} from "../../layout/NotificationEmail/NotificationEmail";
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
      <div
        style={{
          width: "40%",
          height: "20%",
          marginLeft: "30%",
          marginTop: "50px",
          borderRadius: "20px",
          boxShadow:
            "0 2px 5px 0 rgb(0 0 0 / 16%), 0 2px 20px 0 rgb(0 0 0 / 20%)",
        }}
      >
        <div className="title" style={{ height: "20%" }}>
          <div className="Left"></div>
          <div className="fg_pass">
            <div className="row">
              <div>{err && showErrMsg(err)}</div>
              <div>{success && showSuccessMsg(success)}</div>
              <div className="Enter" style={{ marginLeft: "70px" }}>
                Please enter your email in form below
              </div>
              <Form>
                <Form.Group
                  style={{
                    width: "300px",
                    marginLeft: "100px",
                    marginTop: "50px",
                  }}
                  className="mb-3"
                  controlId="formBasicEmail"
                >
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    name="email"
                    id="email"
                    value={email}
                    onChange={handleChangeInput}
                  />
                </Form.Group>
              </Form>
              <Button
                onClick={forgotPassword}
                variant="outline-warning"
                style={{
                  width: "80px",
                  position: "relative",
                  top: "-70px",
                  left: "420px",
                }}
                className="button"
                size="sm"
                active
              >
                Verify
              </Button>{" "}
              <p style={{ fontSize: "13px" }}>
                Back to login page ?&nbsp;
                <Link style={{ color: "blue" }} to="login">
                  back
                </Link>
              </p>
              {/* <input
              className="Input"
              placeholder="Enter your email"
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={handleChangeInput}
            /> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ForgotPassword;
