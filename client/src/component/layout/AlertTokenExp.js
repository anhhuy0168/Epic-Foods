import Wrapper from "./AlertTokenExpStyle";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Alert from "react-bootstrap/Alert";
import BeeSad from "../../assets/beeSad.png";
import "./AlertTokenExpStyle";
const AlertToken = () => {
  return (
    <Wrapper>
      <div className="alert">
        <Alert
          variant="success"
          style={{
            textAlign: "center",
            width: "29%",
            backgroundColor: "#FFFF33",
            marginLeft: "35%",
            marginTop: "5%",
            height: "10%",
          }}
        >
          <Alert.Heading>Hey, nice to see you</Alert.Heading>
          <img src={BeeSad} alt="BeeSad" className="img" />
          <hr />
          <p className="mb-0">
            Oh no !. Looks like the login session has expired, please login
            again !
            <Link to="/login" class="button-box">
              <h4 style={{ color: "red", marginTop: "20px" }}>Login</h4>
            </Link>
          </p>
        </Alert>
      </div>
    </Wrapper>
  );
};

export default AlertToken;
