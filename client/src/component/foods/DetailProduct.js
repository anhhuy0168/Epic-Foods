import React, { useContext, useState, useEffect } from "react";
import { FoodContext } from "../../contexts/FoodsContext";
import { useParams, Link } from "react-router-dom";
import Button from "react-bootstrap/esm/Button";
import { AuthContext } from "../../contexts/AuthContext";
import NavbarAdmin from "../layout/Navbar/NavbarAdmin";
import Navbar from "../layout/Navbar/Navbar";
import { CartContext } from "../../contexts/CartContext";
import toast, { Toaster } from "react-hot-toast";
import { CommentContext } from "../../contexts/CommentContext";
import Card from "react-bootstrap/Card";
import CreateComment from "./CreateComment";
import DeleteComment from "./DeleteComment";
import { AiFillCar } from "react-icons/ai";
import EditComment from "./EditComment";
import Toast from "react-bootstrap/Toast";
import beeSad from "../../assets/avatar.png";
const DetailProduct = () => {
  const params = useParams();

  const {
    commentState: { comments, user },
    getComment,
    deleteComment,
  } = useContext(CommentContext);
  const [count, setCount] = useState(comments);
  const {
    foodState: { oneFood, category },
    getOneFoods,
    showToast: { show, message, type },
    setShowToast,
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
  useEffect(() => getComment(params.id), []);
  useEffect(() => setCount(comments), [comments]);
  console.log(count);

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

        <Card
          style={{
            width: "70rem",
            position: "relative",
            left: 300,
            top: 100,
            boxShadow:
              "0 2px 5px 0 rgb(0 0 0 / 5%), 0 2px 10px 0 rgb(0 0 0 / 5%)",
            padding: "0 0 10rem 0",
            marginBottom: "10rem",
          }}
        >
          <CreateComment idProduct={oneFood._id} />
          <Card.Body>
            {count.map((item) => {
              return (
                <>
                  <div
                    key={item._id}
                    style={{
                      height: "4.5rem",
                      marginBottom: "30px",
                      marginLeft: "60px",
                    }}
                  >
                    <div>
                      <p
                        style={{
                          backgroundColor: "#BBBBBB",
                          borderRadius: "20px",
                          height: "auto",
                          width: "25rem",
                          maxWidth: "30rem",
                          padding: "5px 20px 5px 20px",
                          wordWrap: "break-word",
                          fontSize: "16px",
                          position: "relative",
                          fontWeight: 450,
                        }}
                      >
                        <div style={{ fontSize: "16px", fontWeight: 650 }}>
                          {item.user_id.username}
                        </div>
                        {item.content}

                        <img
                          src={
                            !item.user_id.avatar ? beeSad : item.user_id.avatar
                          }
                          style={{
                            position: "absolute",
                            borderRadius: "30px",
                            left: -50,
                            top: 1,
                          }}
                          width="40px"
                          height="40px"
                          className="mr-3"
                        />
                      </p>

                      <div>
                        {item.user_id._id === _id ? (
                          <DeleteComment _id={item._id} />
                        ) : null}
                      </div>
                    </div>
                  </div>
                </>
              );
            })}
          </Card.Body>
        </Card>
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
                verticalAlign: "top",
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

        <Link
          to={`/buy_food/${params.id}`}
          style={{ marginLeft: "6.5rem" }}
          variant="warning"
        >
          <Button style={{ marginLeft: "50rem", marginTop: "-11.8rem" }}>
            Buy Now
          </Button>
        </Link>
        <Card
          style={{
            width: "70rem",
            position: "relative",
            left: 200,
            top: 100,
            boxShadow:
              "0 2px 5px 0 rgb(0 0 0 / 5%), 0 2px 10px 0 rgb(0 0 0 / 5%)",
            padding: "0 0 10rem 0",
            marginBottom: "10rem",
          }}
        >
          <CreateComment idProduct={oneFood._id} />
          <Card.Body>
            {count.map((item) => {
              return (
                <>
                  <div
                    key={item._id}
                    style={{
                      height: "4.5rem",
                      marginBottom: "30px",
                      marginLeft: "60px",
                    }}
                  >
                    <div>
                      <p
                        style={{
                          backgroundColor: "#BBBBBB",
                          borderRadius: "20px",
                          height: "auto",
                          width: "25rem",
                          maxWidth: "30rem",
                          padding: "5px 20px 5px 20px",
                          wordWrap: "break-word",
                          fontSize: "16px",
                          position: "relative",
                          fontWeight: 450,
                        }}
                      >
                        <div style={{ fontSize: "16px", fontWeight: 650 }}>
                          {item.user_id.username}
                        </div>
                        {item.content}

                        <img
                          src={
                            !item.user_id.avatar ? beeSad : item.user_id.avatar
                          }
                          style={{
                            position: "absolute",
                            borderRadius: "30px",
                            left: -50,
                            top: 1,
                          }}
                          width="40px"
                          height="40px"
                          className="mr-3"
                        />
                      </p>

                      <div>
                        {item.user_id._id === _id ? (
                          <DeleteComment _id={item._id} />
                        ) : null}
                      </div>
                    </div>
                  </div>
                </>
              );
            })}
          </Card.Body>
        </Card>
      </>
    );
  }
  return (
    <>
      {body}
      <EditComment />
      <Toast
        show={show}
        style={{ position: "fixed", top: "20%", right: "10px" }}
        className={`bg-${type} text-white`}
        onClose={setShowToast.bind(this, {
          show: false,
          message: "",
          type: null,
        })}
        delay={3000}
        autohide
      >
        <Toast.Body>
          <strong>{message}</strong>
        </Toast.Body>
      </Toast>
    </>
  );
};

export default DetailProduct;
