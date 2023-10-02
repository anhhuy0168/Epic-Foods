import React, { useState, useContext } from "react";
import StripeCheckout from "react-stripe-checkout";
import { CartContext } from "../../contexts/CartContext";
import { AuthContext } from "../../contexts/AuthContext";
import Toast from "react-bootstrap/Toast";
import toast, { Toaster } from "react-hot-toast";
const PaymentSingleFood = (total) => {
  console.log(total.total);
  const {
    authState: { user },
  } = useContext(AuthContext);
  const amount = total.number;
  const price = total.total;
  const product = total.product;
  const handleToken = (token) => {
    fetch("http://localhost:5000/auth/order/SinglePayment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token, amount, user, price, product }),
    })
      .then((_) => {
        toast.success("Buy Successfully", {
          duration: 4000,
          position: "top-right",
        });
      })
      .catch((_) => window.alert("Transaction Failed."));
  };

  return (
    <div className="App" style={{ margin: "20px 0 0 20rem" }}>
      <StripeCheckout
        stripeKey={
          "pk_test_51LbyNZFYvAR2okGPyqpV3A7965cBfOXkgkSBZTI2op80xFJdjHwHCOCsV2EGBdldK2jZMQS3mGHEhbCq9rSS8eLG00SEJdxO3x" ||
          ""
        }
        token={handleToken}
        name="Buy"
        currency="USD"
        amount={total.total * 100}
      ></StripeCheckout>
    </div>
  );
};

export default PaymentSingleFood;
