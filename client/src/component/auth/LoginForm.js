import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link, useHistory } from "react-router-dom";
import { useState, useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { FcGoogle } from "react-icons/fc";
import { BsFacebook } from "react-icons/bs";
import AlertMessage from "../layout/AlertToken/AlertMessage";
const LoginForm = () => {
  //alert
  const [alert, setAlert] = useState(null);
  //context
  const { loginUser } = useContext(AuthContext);

  // router
  const history = useHistory();

  //local state
  const [loginForm, setLoginForm] = useState({
    username: "",
    password: "",
  });
  const { username, password } = loginForm;
  const onChangeLoginForm = (event) =>
    setLoginForm({ ...loginForm, [event.target.name]: event.target.value });
  const login = async (event) => {
    event.preventDefault();
    try {
      const loginData = await loginUser(loginForm);
      if (!loginData.success) {
        setAlert({
          type: "danger",
          message: "Incorrect Passwords or User Name",
        });
        setTimeout(() => setAlert(null), 5000);
      }
      if (loginData.success) {
        // history.push('/homepage')
      } else {
      }
    } catch (err) {
      console.log(err);
    }
  };
  //

  return (
    <>
      <Form className="my-4" onSubmit={login}>
        <AlertMessage info={alert} />
        <Form.Group>
          <Form.Control
            type="text"
            placeholder="Username"
            name="username"
            required
            value={username}
            onChange={onChangeLoginForm}
          />
        </Form.Group>

        <Form.Group>
          <Form.Control
            type="password"
            placeholder="Password"
            name="password"
            required
            value={password}
            onChange={onChangeLoginForm}
          />
        </Form.Group>
        <Button variant="success" type="submit">
          Login
        </Button>
      </Form>
      <p>
        Don't have an account ?&nbsp;
        <Link style={{ color: "yellow" }} to="register">
          Register
        </Link>
      </p>
      <p className="my">Or log in with :</p>
      <div className="icon">
        <Link to="/auth/loginGoogle" style={{ marginRight: "6px" }}>
          <FcGoogle size={30} />
        </Link>
        <Link to="">
          <BsFacebook size={25} />
        </Link>
      </div>

      <Link to="forgot_password">Forgot Password ?</Link>
    </>
  );
};

export default LoginForm;
