import React, { useContext, useState, useEffect } from "react";
import { FoodContext } from "../../contexts/FoodsContext";
import { useParams, Link } from "react-router-dom";
import Button from "react-bootstrap/esm/Button";
import { AuthContext } from "../../contexts/AuthContext";
import NavbarAdmin from "../layout/Navbar/NavbarAdmin";
import Navbar from "../layout/Navbar/Navbar";
const DetailProduct = () => {
  const params = useParams();

  const {
    foodState: { oneFood },
    getOneFoods,
  } = useContext(FoodContext);

  const {
    authState: {
      user: { _id, role },
    },
  } = useContext(AuthContext);

  useEffect(() => getOneFoods(params.id), []);
  console.log(oneFood);
  let body = null;
  if (role === "admin") {
    body = (
      <>
        <NavbarAdmin />
        <div
          className="detail"
          style={{ marginLeft: "20rem", marginTop: "10rem", display: "flex" }}
        >
          <img
            src={oneFood.productImage}
            alt=""
            style={{
              width: "30rem",
              height: "32rem",
            }}
          />
          <div>
            <div style={{ fontSize: "40px", margin: "-18px 0 0 100px " }}>
              {oneFood.name}
            </div>
            <div
              style={{
                maxWidth: "30rem",
                marginTop: "5rem",
                position: "relative",
                left: 50,
              }}
            >
              {oneFood.description}
            </div>
          </div>

          <div
            style={{
              marginTop: "23rem",
              position: "absolute",
              right: 430,
              width: "10rem",
              color: "red",
              fontSize: "30px",
            }}
          >
            Price:$ {oneFood.price}
          </div>
        </div>
        <Button style={{ marginLeft: "60rem", marginTop: "-5rem" }}>
          Buy Now
        </Button>
      </>
    );
  }
  if (role === "user") {
    body = (
      <>
        <Navbar />
        <div
          className="detail"
          style={{ marginLeft: "10rem", marginTop: "10rem", display: "flex" }}
        >
          <img
            src={oneFood.productImage}
            alt=""
            style={{ width: "30rem", height: "32rem" }}
          />
          <div>
            <div style={{ fontSize: "40px", margin: "-18px 0 0 100px " }}>
              {oneFood.name}
            </div>
            <div
              style={{
                maxWidth: "30rem",
                marginTop: "2rem",
                position: "relative",
                left: 50,
              }}
            >
              {oneFood.description}
            </div>
          </div>

          <div
            style={{
              marginTop: "23rem",
              position: "absolute",
              right: 600,
              width: "10rem",
              color: "red",
              fontSize: "30px",
            }}
          >
            Price:$ {oneFood.price}
          </div>
        </div>
        <Button style={{ marginLeft: "50rem", marginTop: "-5rem" }}>
          Buy Now
        </Button>
      </>
    );
  }
  return <>{body}</>;
};

export default DetailProduct;
