import React from "react";
import { useContext, useEffect, useState } from "react";
import { FoodContext } from "../../contexts/FoodsContext";
import { useParams, Link } from "react-router-dom";
import { CartContext } from "../../contexts/CartContext";
import Table from "react-bootstrap/Table";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import PaymentSingleFood from "../auth/PaymentSingleFood";
import NavbarMenu from "../layout/Navbar/Navbar";
import Logo from "../../assets/logox2.png";
import BeeHappy from "../../assets/happyBee.png";
import { AuthContext } from "../../contexts/AuthContext";
import MapDelivery from "./MapDelivery";
import { BiHome } from "react-icons/bi";
const BuyProduct = () => {
  const params = useParams();
  const [total, setTotal] = useState(0);
  const [amountProduct, setAmountProduct] = useState(1);
  const {
    cartState: { cart },
    getCart,
    changeAmountCart,
  } = useContext(CartContext);
  const {
    authState: {
      user: { username, phoneNumber, address },
    },
  } = useContext(AuthContext);
  console.log(address);
  const {
    foodState: { oneFood, category },
    getOneFoods,
  } = useContext(FoodContext);
  useEffect(() => getOneFoods(params.id), []);
  useEffect(() => {
    getCart();
  }, [total]);
  useEffect(() => {
    const getTotal = () => {
      const total = cart.reduce((prev, item) => {
        return prev + item.product.price * item.amount;
      }, 0);
      console.log();

      setTotal(total);
    };

    getTotal();
  }, [cart]);
  console.log(amountProduct);
  const increment = async () => {
    setAmountProduct(amountProduct + 1);
  };
  const decrement = () => {
    setAmountProduct(amountProduct - 1);
  };
  return (
    <>
      <NavbarMenu />
      <div
        style={{
          width: "60%",
          position: "relative",
          backgroundColor: "#FFFF66",
          left: 300,
          top: 150,
          padding: "2rem 0 0 0 ",
          boxShadow:
            "0 2px 5px 0 rgb(0 0 0 / 5%), 0 2px 10px 0 rgb(0 0 0 / 5%)",
        }}
      >
        <Card.Img
          variant="top"
          style={{
            borderRadius: "20px 20px 20px 20px",
            width: "16.9rem",
            height: "15rem",
            margin: "-3rem 0 -100px -2rem",
          }}
          src={Logo}
        />
        <div style={{ textAlign: "center", fontSize: "30px" }}>
          {oneFood.name}
        </div>
        <div style={{ display: "flex" }}>
          <Card.Img
            variant="top"
            style={{
              borderRadius: "20px 20px 20px 20px",
              width: "27rem",
              height: "17rem",
              margin: "20px 0 20px 5rem",
            }}
            src={oneFood.productImage}
          />
          <div
            className="amount"
            style={{ position: "relative", top: 100, right: -160 }}
          >
            <button
              style={{
                borderRadius: "5px",
                width: "30px",
                height: "30px",
                backgroundColor: "#FFFF99",
                margin: "0 10px 0 0",
              }}
              onClick={() => decrement()}
            >
              {" "}
              -{" "}
            </button>
            <span style={{ fontSize: "25px", padding: "0px" }}>
              {amountProduct}
            </span>
            <button
              style={{
                borderRadius: "5px",
                width: "30px",
                height: "30px",
                backgroundColor: "#FFFF99",
                margin: "0 0 0 10px",
              }}
              onClick={() => increment()}
            >
              {" "}
              +{" "}
            </button>
          </div>
          <div
            style={{
              color: "#FF0000",
              fontSize: "25px",
              position: "relative",
              right: 20,
              top: 160,
            }}
          >
            Total Price Order :{oneFood.price * amountProduct} $
          </div>
        </div>

        <div style={{ margin: "0px 0 0 5rem", maxWidth: "20rem" }}>
          <div style={{ margin: "0 0 30px 0px", fontWeight: 500 }}>
            Your Information.
            <div style={{ fontSize: "12px", margin: "0 0 0 0px" }}>
              Change? <Link to="/editProfile">Click here</Link>
            </div>
          </div>
          <div style={{ position: "relative", top: 0 }}>
            <BiHome size={30} />
          </div>
          <div style={{ fontWeight: 500, margin: "-30px 0 0 3rem" }}>
            <div>Name : {username}</div>
            <div>Phone Number : {phoneNumber}</div>
            <div>Transport to : {address}</div>
          </div>
        </div>
        <div style={{ padding: "15rem" }}>
          <MapDelivery customerAddress={address} />
        </div>
        <div style={{ margin: "-20px 0 0 50px" }}>
          <PaymentSingleFood
            product={oneFood}
            total={oneFood.price * amountProduct}
            number={amountProduct}
          />
        </div>

        <div style={{ fontSize: "15px", margin: "0 0 0 18rem" }}>
          Thanks for buying !{" "}
          <Card.Img
            variant="top"
            style={{
              borderRadius: "20px 20px 20px 20px",
              width: "4rem",
              height: "3.5rem",
              margin: "20px 0 20px 10px",
            }}
            src={BeeHappy}
          />
        </div>
      </div>
    </>
  );
};

export default BuyProduct;
