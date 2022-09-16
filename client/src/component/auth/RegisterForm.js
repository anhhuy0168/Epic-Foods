import React, { useRef } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useContext, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";
import AlertMessage from "../layout/AlertToken/AlertMessage";
const RegisterForm = () => {
  const history = useHistory();
  // Context
  const { registerUser } = useContext(AuthContext);
  // Local state
  const [registerForm, setRegisterForm] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
    address: "",
    role: "user",
    phoneNumber: "",
  });
  //uncontrolled
  const inputRef = useRef(null);
  const [alert, setAlert] = useState(null);
  const {
    address,
    phoneNumber,
    email,
    username,
    password,
    confirmPassword,
    role,
  } = registerForm;
  const onChangeRegisterForm = (event) =>
    setRegisterForm({
      ...registerForm,
      [event.target.name]: event.target.value,
    });

  const register = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      setAlert({ type: "danger", message: "Passwords do not match" });
      setTimeout(() => setAlert(null), 5000);
      return;
    }
    try {
      const registerData = await registerUser(registerForm);
      if (!registerData.success) {
        setAlert({ type: "danger", message: registerData.message });
        setTimeout(() => setAlert(null), 5000);
      } else if (registerData.success) {
        history.push("/confirmEmail");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Form className="my-4" onSubmit={register}>
        <AlertMessage info={alert} />
        <Form.Group>
          <Form.Control
            type="text"
            placeholder="Email"
            name="email"
            required
            value={email}
            ref={inputRef}
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
            ref={inputRef}
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
            ref={inputRef}
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
            ref={inputRef}
            onChange={onChangeRegisterForm}
          />
        </Form.Group>

        <Button variant="success" type="submit">
          Register
        </Button>
      </Form>

      <p>
        Already have an account ? &nbsp;
        <Link style={{ color: "yellow" }} to="login">
          Login
        </Link>
      </p>
    </>
  );
};

export default RegisterForm;
