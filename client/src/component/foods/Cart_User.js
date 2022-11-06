import React, { useEffect, useState } from "react";
import { CartContext } from "../../contexts/CartContext";
import { useContext } from "react";
import Table from "react-bootstrap/Table";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";
import DeleteProductCart from "./DeleteProductCart";
import OrderUserHistory from "../auth/OrderUserHistory";
import Payment from "../auth/Payment";
import TotalCart from "./TotalCart";
import NavbarMenu from "../layout/Navbar/Navbar";
import { AuthContext } from "../../contexts/AuthContext";
import MapBuyProductCart from "./MapBuyProductCart";
const Cart_User = () => {
  const history = useHistory();
  const [total, setTotal] = useState(0);
  const [cartProduct, setCartProduct] = useState();
  const {
    authState: {
      user: { username, phoneNumber, address },
    },
  } = useContext(AuthContext);
  const {
    cartState: { cart },
    getCart,
    changeAmountCart,
  } = useContext(CartContext);
  useEffect(() => {
    getCart();
  }, [total]);
  useEffect(() => {
    const getTotal = () => {
      const total = cart.reduce((prev, item) => {
        return prev + item.product.price * item.amount;
      }, 0);

      setTotal(total);
    };

    getTotal();
  }, [cart]);

  // add quantity product
  const increment = async (id, amount) => {
    changeAmountCart(id, {
      amount: (amount = amount + 1),
    });
  };

  const decrement = (id, amount) => {
    changeAmountCart(id, { amount: (amount = amount - 1) });
  };

  return (
    <>
      <NavbarMenu />
      <Table style={{ marginTop: "5rem", marginBottom: "5rem" }}>
        <thead>
          <tr>
            <th>Name Product</th>
            <th>Price</th>
            <th>Image Product</th>
            <th>Quantity</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {cart.map((item) => {
            return (
              <tr key={item.product._id}>
                <td>{item.product.name}</td>
                <td>{item.product.price}$</td>
                <td>
                  {" "}
                  <Card.Img
                    variant="top"
                    style={{
                      marginLeft: "20px",
                      marginTop: "20px",
                      borderRadius: "10px 10px 10px 10px",
                      width: "80px",
                      height: "70px",
                    }}
                    src={item.product.productImage}
                  />
                </td>
                <td>
                  <div className="amount" style={{ marginTop: "40px" }}>
                    <button
                      style={{
                        borderRadius: "10px",
                        margin: "0 2px 0 0px",
                        width: "27px",
                      }}
                      onClick={() => decrement(item._id, item.amount)}
                    >
                      {" "}
                      -{" "}
                    </button>
                    <span>{item.amount}</span>
                    <button
                      style={{ borderRadius: "10px", margin: "0 0 0 5px" }}
                      onClick={() => increment(item._id, item.amount)}
                    >
                      {" "}
                      +{" "}
                    </button>
                  </div>
                </td>
                <td>
                  <DeleteProductCart _id={item.product._id} cartId={item._id} />
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      <div style={{ marginTop: "20rem", marginLeft: "25rem" }}>
        <MapBuyProductCart customerAddress={address} />
      </div>

      <div className="total" style={{ textAlign: "center", marginTop: "2rem" }}>
        <h3>Total: $ {total}</h3>
        <Payment total={total} />
      </div>
      <div style={{ marginTop: "10rem" }}>
        {" "}
        <OrderUserHistory />
      </div>
    </>
  );
};

export default Cart_User;
