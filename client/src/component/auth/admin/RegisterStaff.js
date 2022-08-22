import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useContext, useState } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";
import AlertMessage from "../../layout/AlertToken/AlertMessage";
import { isEmail } from "../../../utils/Validation";
import ViewStaff from "./ViewStaff";
import toast, { Toaster } from "react-hot-toast";

const RegisterStaff = () => {
  const history = useHistory();
  // Context
  const { registerUser, showAddStaffModal, setShowAddStaffModal } =
    useContext(AuthContext);
  // Local state
  const [registerForm, setRegisterForm] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
    address: "",
    phoneNumber: "",
    role: "staff",
  });
  const [alert, setAlert] = useState(null);
  const {
    address,
    phoneNumber,
    email,
    role,
    username,
    password,
    confirmPassword,
  } = registerForm;
  const onChangeRegisterForm = (event) =>
    setRegisterForm({
      ...registerForm,
      [event.target.name]: event.target.value,
    });
  const resetAddStaffData = () => {
    setRegisterForm({
      address: "",
      phoneNumber: "",
      email: "",
      username: "",
      password: "",
      confirmPassword: "",
      role: "",
    });
    setShowAddStaffModal(false);
  };
  const closeDialog = () => {
    resetAddStaffData();
  };
  const register = async (event) => {
    event.preventDefault();
    resetAddStaffData();

    if (password !== confirmPassword) {
      setAlert({ type: "danger", message: "Passwords do not match" });
      setTimeout(() => setAlert(null), 5000);
      return;
    }
    if (!isEmail(email))
      return setRegisterForm({
        ...registerForm,
        err: "Invalid emails.",
        success: "",
      });
    try {
      const registerData = await registerUser(registerForm);
      if (!registerData.success) {
        setAlert({ type: "danger", message: registerData.message });
        setTimeout(() => setAlert(null), 5000);
      } else if (registerData.success) {
        toast.success("Successfully ! Please check Email to active");
      }
    } catch (error) {
      // toast.error(`Create Account Fail`);
      console.log(error);
    }
  };

  return (
    <>
      <div>
        <div
          style={{ position: "relative", top: 150, left: 480, width: "40rem" }}
        >
          <h3 style={{ marginLeft: "15rem", width: "27rem" }}>
            {" "}
            Create Account Staff
          </h3>
          <Form
            className="my-4"
            style={{ marginLeft: "10rem" }}
            onSubmit={register}
          >
            <AlertMessage info={alert} />
            <Form.Group>
              <Form.Control
                type="text"
                placeholder="Email"
                name="email"
                required
                value={email}
                onChange={onChangeRegisterForm}
              />
            </Form.Group>
            <Form.Group>
              <Form.Control
                type="text"
                placeholder="Address"
                name="address"
                required
                value={address}
                onChange={onChangeRegisterForm}
              />
            </Form.Group>
            <Form.Group>
              <Form.Control
                type="text"
                placeholder="Phone Number"
                name="phoneNumber"
                required
                value={phoneNumber}
                onChange={onChangeRegisterForm}
              />
            </Form.Group>

            <Form.Group>
              <Form.Control
                type="text"
                placeholder="Username"
                name="username"
                required
                value={username}
                onChange={onChangeRegisterForm}
              />
            </Form.Group>

            <Form.Group>
              <Form.Control
                type="password"
                placeholder="Password"
                name="password"
                required
                value={password}
                onChange={onChangeRegisterForm}
              />
            </Form.Group>
            <Form.Group>
              <Form.Control
                type="password"
                placeholder="Confirm Password"
                name="confirmPassword"
                required
                value={confirmPassword}
                onChange={onChangeRegisterForm}
              />
            </Form.Group>

            <Button style={{ width: "30rem" }} variant="warning" type="submit">
              Create
            </Button>
            <hr
              width="100%"
              size="50px"
              align="center"
              color="black"
              height="20px"
              style={{
                height: "2px",
                color: "black",
                position: "relative",
                top: 50,
              }}
            />
          </Form>
        </div>
        <ViewStaff />
      </div>
    </>
  );
};

export default RegisterStaff;
