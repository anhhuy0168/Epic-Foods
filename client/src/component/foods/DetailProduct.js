import React, { useContext, useState, useEffect } from "react";
import { FoodContext } from "../../contexts/FoodsContext";
import { useParams, Link } from "react-router-dom";
import Button from "react-bootstrap/esm/Button";
import { AuthContext } from "../../contexts/AuthContext";
import NavbarAdmin from "../layout/Navbar/NavbarAdmin";
import Navbar from "../layout/Navbar/Navbar";
import { CartContext } from "../../contexts/CartContext";
import toast, { Toaster } from "react-hot-toast";
import { AdminContext } from "../../contexts/AdminContext";
const DetailProduct = () => {
  const params = useParams();
  const {
    userState: { listCategory },
    getCategory,
  } = useContext(AdminContext);

  const {
    foodState: { oneFood, category },
    getOneFoods,
    getFoods,
  } = useContext(FoodContext);
  const {
    authState: {
      user: { _id, role },
    },
  } = useContext(AuthContext);
  const {
    cartState: { cart },
    addProductCart,
  } = useContext(CartContext);
  useEffect(() => getOneFoods(params.id), []);
  console.log(oneFood.category);
  const addProductToCart = (value) => {
    const newProduct = {
      product: value,
      users_id: _id,
    };

    addProductCart(newProduct);
    toast.success("Add Product Successfully");
  };

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
            <div></div>

            <div
              style={{
                maxWidth: "30rem",
                marginTop: "5rem",
                position: "relative",
                left: 50,
              }}
            >
              {oneFood.description}
              <div style={{ marginTop: "20px", fontWeight: "600" }}>
                Category: {category.name}
              </div>
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
        <Toaster position="top-right" reverseOrder={false} />
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
        <Button
          style={{ marginLeft: "750px", marginTop: "-140px" }}
          onClick={() => addProductToCart(oneFood._id)}
          className="text-right"
        >
          Add to cart
        </Button>
        <Button style={{ marginLeft: "55rem", marginTop: "-11.7rem" }}>
          Buy Now
        </Button>
      </>
    );
  }
  return <>{body}</>;
};

export default DetailProduct;
