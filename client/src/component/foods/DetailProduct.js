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
import { BsCart3 } from "react-icons/bs";
import CommitmentProduct from "./CommitmentProduct";
import NavbarStaff from "../layout/Navbar/NavbarStaff";
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
  const result = count.length;
  const addProductToCart = (value) => {
    const newProduct = {
      product: value,
      users_id: _id,
    };

    addProductCart(newProduct);
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  let body = null;
  if (role === "staff") {
    body = (
      <>
        <NavbarStaff />
        <div
          className="detail"
          style={{ marginLeft: "20rem", marginTop: "10rem", display: "flex" }}
        >
          <img
            src={oneFood.productImage}
            alt=""
            style={{
              width: "36rem",
              borderRadius: "20px",
              height: "26rem",
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
                marginTop: "20px",
                position: "relative",
                padding: "0 20px 0 0",
                left: 50,
              }}
            >
              {oneFood.description}
              <div
                style={{
                  marginTop: "20px",
                  fontWeight: "600",
                  display: "flex",
                }}
              >
                Category:{" "}
                <p
                  style={{
                    margin: "-5px 0 0 10px",
                    backgroundColor: "yellow",
                    borderRadius: "20px",
                    height: "35px",
                    width: "60px",
                    padding: "5px 20px 0 10px",
                  }}
                >
                  {category?.name}
                </p>
              </div>
            </div>
          </div>
          <div
            style={{
              marginTop: "23rem",
              position: "absolute",
              right: 300,
              width: "10rem",
              color: "red",
              fontSize: "30px",
            }}
          >
            Price:$ {oneFood.price}
          </div>
        </div>

        <CommitmentProduct />

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
          <CreateComment idProduct={oneFood._id} result={result} />
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
              width: "36rem",
              borderRadius: "20px",
              height: "26rem",
            }}
          />
          <div>
            <div style={{ fontSize: "40px", margin: "-18px 0 0 150px " }}>
              {oneFood.name}
            </div>
            <div></div>

            <div
              style={{
                maxWidth: "30rem",
                marginTop: "1rem",
                position: "relative",
                left: 50,
              }}
            >
              {oneFood.description}
              <div
                style={{
                  marginTop: "20px",
                  fontWeight: "600",
                  display: "flex",
                }}
              >
                Category:{" "}
                <p
                  style={{
                    margin: "-5px 0 0 10px",
                    backgroundColor: "yellow",
                    borderRadius: "20px",
                    height: "35px",
                    width: "60px",
                    padding: "5px 20px 0 10px",
                  }}
                >
                  {category?.name}
                </p>
              </div>
            </div>
          </div>
          <div
            style={{
              marginTop: "23rem",
              position: "absolute",
              right: 250,
              top: 90,
              width: "10rem",
              color: "red",
              fontSize: "30px",
            }}
          >
            Price:$ {oneFood.price}
          </div>
        </div>

        <CommitmentProduct />

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
          <CreateComment idProduct={oneFood._id} result={result} />
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
        <Navbar />
        <div
          className="detail"
          style={{ marginLeft: "10rem", marginTop: "10rem", display: "flex" }}
        >
          <img
            src={oneFood.productImage}
            alt=""
            style={{ width: "39rem", borderRadius: "20px", height: "29rem" }}
          />
          <div>
            <div style={{ fontSize: "40px", margin: "-18px 0 0 100px " }}>
              {oneFood.name}
            </div>
            <div
              style={{
                maxWidth: "30rem",
                marginTop: "1rem",
                position: "relative",
                left: 50,
                verticalAlign: "top",
              }}
            >
              {oneFood.description}
              <div
                style={{
                  marginTop: "20px",
                  fontWeight: "600",
                  display: "flex",
                }}
              >
                Category:{" "}
                <p
                  style={{
                    margin: "-5px 0 0 10px",
                    backgroundColor: "yellow",
                    borderRadius: "20px",
                    height: "35px",
                    width: "60px",
                    padding: "5px 20px 0 10px",
                  }}
                >
                  {category?.name}
                </p>
              </div>
            </div>
          </div>

          <div
            style={{
              marginTop: "20rem",
              position: "absolute",
              right: 400,
              width: "10rem",
              color: "red",
              fontSize: "30px",
            }}
          >
            Price:$ {oneFood.price}
          </div>
        </div>
        <BsCart3
          size={40}
          style={{
            marginLeft: "950px",
            marginTop: "-130px",
            cursor: "pointer",
          }}
          onClick={() => addProductToCart(oneFood._id)}
          className="text-right"
        >
          Add to cart
        </BsCart3>

        <Link to={`/buy_food/${params.id}`} style={{ marginLeft: "6.5rem" }}>
          <Button
            variant="success"
            style={{ marginLeft: "57rem", marginTop: "-11.2rem" }}
          >
            Buy Now
          </Button>
        </Link>

        <CommitmentProduct />
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
          <CreateComment idProduct={oneFood._id} result={result} />
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
                          {console.log(item.user)}
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
