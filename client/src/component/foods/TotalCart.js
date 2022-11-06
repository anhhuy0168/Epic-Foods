import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../../contexts/CartContext";
const TotalCart = () => {
  const {
    cartState: { cart },
    getCart,
    changeAmountCart,
  } = useContext(CartContext);
  const result = cart.length;
  // console.log(result);
  const [cartNumber, setCartNumber] = useState(cart);
  useEffect(() => {
    getCart(cartNumber);
  }, []);
  return (
    <div
      style={{
        position: "relative",
        right: 100,
        top: -10,
        width: "30px",
        backgroundColor: "red",
        borderRadius: "20px",
        padding: "5px 10px 5px 10px",
        color: "white",
        fontSize: "12px",
      }}
    >
      {result}
    </div>
  );
};

export default TotalCart;
