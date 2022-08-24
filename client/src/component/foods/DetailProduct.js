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
import { CommentContext } from "../../contexts/CommentContext";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import { AiOutlineSend } from "react-icons/ai";

const DetailProduct = () => {
  const params = useParams();
  const {
    userState: { listCategory },
    getCategory,
  } = useContext(AdminContext);
  const {
    commentState: { comments },
    getComment,
  } = useContext(CommentContext);
  const {
    foodState: { oneFood, category },
    getOneFoods,
    getFoods,
  } = useContext(FoodContext);
  console.log("day la comment", comments);
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
  useEffect(() => getComment(params.id), []);

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
  return (
    <>
      {body}
      <Card
        style={{ width: "70rem", position: "relative", left: 300, top: 100 }}
      >
        <Card.Header
          style={{
            fontSize: "30px",
            textAlign: "center",
            backgroundColor: "yellow",
          }}
        >
          Comments
        </Card.Header>
        <Form style={{ display: "flex" }}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control
              type="text"
              placeholder="Comment..."
              style={{
                height: "3rem",
                width: "60rem",
                marginTop: "50px",
                marginLeft: "80px",
                borderRadius: "30px",
              }}
            />
          </Form.Group>

          <AiOutlineSend
            variant="primary"
            type="submit"
            size={30}
            style={{ position: "relative", top: 58, right: 60 }}
          ></AiOutlineSend>
        </Form>
        <Card.Body>
          {comments.map((item) => {
            return (
              <>
                <blockquote className="blockquote mb-0" key={item._id}>
                  <p key={item._id}>{item.content}</p>
                </blockquote>
              </>
            );
          })}
        </Card.Body>
      </Card>
    </>
  );
};

export default DetailProduct;
