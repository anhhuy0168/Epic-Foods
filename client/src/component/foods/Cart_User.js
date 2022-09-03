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
const Cart_User = () => {
  const history = useHistory();

  const [total, setTotal] = useState(0);
  const [cartProduct, setCartProduct] = useState();
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
      <Table style={{ marginTop: "5rem" }}>
        <thead>
          <tr>
            <th>Name Product</th>
            <th>Price</th>
            <th>Description</th>
            <th>Image Product</th>
            <th>Count</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {cart.map((item) => {
            return (
              <tr key={item.product._id}>
                <td>{item.product.name}</td>
                <td>{item.product.price}$</td>
                <td style={{ width: "44rem" }}>{item.product.description}</td>
                <td>
                  {" "}
                  <Card.Img
                    variant="top"
                    style={{
                      marginLeft: "20px",
                      borderRadius: "10px 10px 10px 10px",
                      width: "60px",
                      height: "63px",
                    }}
                    height={300}
                    width={70}
                    src={item.product.productImage}
                  />
                </td>
                <td>
                  <div className="amount">
                    <button onClick={() => decrement(item._id, item.amount)}>
                      {" "}
                      -{" "}
                    </button>
                    <span>{item.amount}</span>
                    <button onClick={() => increment(item._id, item.amount)}>
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
      <div className="total">
        <h3>Total: $ {total}</h3>
      </div>
      <Payment total={total} />
      <Link to="/homepage" style={{ marginLeft: "764px" }}>
        <Button>Back</Button>
      </Link>
      <OrderUserHistory />
    </>
  );
};

export default Cart_User;
