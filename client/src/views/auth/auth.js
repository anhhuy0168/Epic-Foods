import React from "react";
import LoginForm from "../../component/auth/LoginForm";
import RegisterForm from "../../component/auth/RegisterForm";
import { AuthContext } from "../../contexts/AuthContext";
import { useContext } from "react";
import { Redirect } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";
import "../auth/auth.css";
import Logo from "../../assets/icon.png";
const Auth = ({ authRoute }) => {
  const {
    authState: { authLoading, isAuthenticated },
  } = useContext(AuthContext);

  let body;

  if (authLoading)
    body = (
      <div className="d-flex justify-content-center mt-2">
        <Spinner animation="border" variant="info" />
      </div>
    );
  else if (isAuthenticated) return <Redirect to="/homepage" />;
  else
    body = (
      <>
        {authRoute === "login" && <LoginForm />}
        {authRoute === "register" && <RegisterForm />}
      </>
    );
  return (
    <div className="landing" style={{ overflow: "hidden" }}>
      <div className="dark-overlay">
        <div className="landing-inner">
          <div></div>
          <img
            src={Logo}
            alt="Logo"
            width="200px"
            height="130px"
            className="mr-2"
          />
          <h1 style={{ color: "yellow" }}>Foods Epic</h1>
          <h4>Bring the best food for you !</h4>
          {body}
        </div>
      </div>
    </div>
  );
};

export default Auth;
