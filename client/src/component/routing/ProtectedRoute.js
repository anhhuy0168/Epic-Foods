import { React, useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { useContext } from "react";
import { Spinner } from "reactstrap";
import AlertToken from "../../component/layout/AlertToken/AlertTokenExp";
import Navbar from "../layout/Navbar/Navbar";
import Carousel from "../layout/Carousel";
import NavbarAdmin from "../layout/Navbar/NavbarAdmin";
const ProtectedRoute = ({ component: Component, ...rest }) => {
  const {
    authState: { user, authLoading, isAuthenticated },
  } = useContext(AuthContext);
  if (authLoading)
    return (
      <div className="spinner-container">
        <Spinner animation="border" variant="info" />
      </div>
    );

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated === false ? (
          <>
            <AlertToken />
          </>
        ) : user.role === "admin" && isAuthenticated ? (
          <>
            <Component {...rest} {...props} />
          </>
        ) : user.role === "staff" && isAuthenticated ? (
          <>
            <Component {...rest} {...props} />
          </>
        ) : user.role === "user" && isAuthenticated ? (
          <>
            <Component {...rest} {...props} />
          </>
        ) : (
          <>
            <Redirect to="/login" />)
          </>
        )
      }
    />
  );
};
export default ProtectedRoute;
