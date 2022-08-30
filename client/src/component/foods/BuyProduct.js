import React from "react";
import { useContext, useEffect, useState } from "react";
import { FoodContext } from "../../contexts/FoodsContext";
import { useParams, Link } from "react-router-dom";
import { CartContext } from "../../contexts/CartContext";
import Table from "react-bootstrap/Table";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import PaymentSingleFood from "../auth/PaymentSingleFood";
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
      <div>{oneFood._id}</div>
      <div>{oneFood.name}</div>

      <div>{oneFood.description}</div>

      <div>{oneFood.productImage}</div>
      <div>{oneFood.price}</div>
      <div>Total{oneFood.price * amountProduct}</div>
      <div className="amount">
        <button onClick={() => decrement()}> - </button>
        <span>{amountProduct}</span>
        <button onClick={() => increment()}> + </button>
      </div>
      <PaymentSingleFood
        product={oneFood}
        total={oneFood.price * amountProduct}
        number={amountProduct}
      />
      {/* <Table>
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
            if (item.product._id == params.id) {
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
                  <td>total{item.amount * oneFood.price}</td>
               
                </tr>
              );
            }
          })}
        </tbody>
      </Table> */}

      <Link to="/homepage" style={{ marginLeft: "764px" }}>
        <Button>Back</Button>
      </Link>
    </>
  );
};

export default BuyProduct;
