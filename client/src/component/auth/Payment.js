import React, { useState, useContext } from "react";
import StripeCheckout from "react-stripe-checkout";
import { CartContext } from "../../contexts/CartContext";
import { AuthContext } from "../../contexts/AuthContext";
import toast, { Toaster } from "react-hot-toast";

const Payment = (total) => {
  const {
    authState: { user },
  } = useContext(AuthContext);
  const {
    cartState: { cart },
  } = useContext(CartContext);
  const price = total.total;
  const handleToken = (token) => {
    fetch("http://localhost:5000/auth/order/payment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token, user, price, cart }),
    })
      .then((_) => {
        toast.success("Buy Successfully");
      })
      .catch((_) => window.alert("Transaction Failed."));
  };

  return (
    <div className="App">
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

export default Payment;
