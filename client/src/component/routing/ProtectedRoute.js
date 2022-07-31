import { React, useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { useContext } from "react";
import { Spinner } from "reactstrap";
import AlertToken from "../../component/layout/AlertTokenExp";
import Navbar from "../layout/Navbar";
import Carousel from "../layout/Carousel";
const ProtectedRoute = ({ component: Component, ...rest }) => {
  const {
    authState: { authLoading, isAuthenticated },
  } = useContext(AuthContext);
  useEffect(() => AlertToken(), []);

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
        isAuthenticated ? (
          <>
            <Navbar />
            <Carousel />
            <Component {...rest} {...props} />
          </>
        ) : (
          <AlertToken />
        )
      }
    />
  );
};

export default ProtectedRoute;
