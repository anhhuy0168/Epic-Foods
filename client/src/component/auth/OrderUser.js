import React from "react";
import { useContext, useState, useEffect } from "react";
import { OrderContext } from "../../contexts/OrdersContext";
import Table from "react-bootstrap/Table";
import Card from "react-bootstrap/Card";
const OrderUser = () => {
  const {
    orderState: { orderUser },
    getUserOrder,
  } = useContext(OrderContext);
  const [order, setOrder] = useState(orderUser);
  console.log(orderUser);
  useEffect(() => {
    getUserOrder();
  }, [order]);
  return (
    <>
      <Table>
        <thead>
          <tr>
            <th>Name User</th>
            <th>Address Delivery</th>
            <th style={{ width: "311px" }}>Phone Number Customers</th>
            <th>Product</th>
            <th>Amount Product</th>
            <th>Price total</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {orderUser.map((item) => {
            if (item.product) {
              return (
                <tr key={item._id}>
                  <td>{item.user.username}</td>
                  <td>{item.user.address}</td>
                  <td>{item.user.phoneNumber}</td>
                  <td style={{ width: "40rem" }}>
                    <div style={{ maxWidth: "20rem" }}>
                      {" "}
                      {item.product.name}
                    </div>
                    <Card.Img
                      variant="top"
                      style={{
                        position: "relative",
                        left: 300,
                        top: -38,
                        borderRadius: "20px 20px 0px 0px",
                        width: "5rem",
                        height: "5rem",
                      }}
                      src={item.product.productImage}
                    />
                  </td>
                  <td>{item.amount}</td>
                  <td>{item.price}$</td>
                  <td>Checked</td>
                </tr>
              );
            }
          })}
        </tbody>
      </Table>
      <Table>
        <tbody>
          {orderUser.map((item) => {
            if (!item.product) {
              return (
                <tr key={item._id}>
                  <td>{item.user.username}</td>
                  <td>{item.user.address}</td>
                  <td>{item.user.phoneNumber}</td>
                  <td>
                    {" "}
                    {item.cart.map((cart) => {
                      return (
                        <>
                          <div>{cart.product.name}</div>
                        </>
                      );
                    })}
                  </td>
                  <td>
                    {item.cart.map((cart) => {
                      return (
                        <>
                          <div>{cart.amount}</div>
                        </>
                      );
                    })}
                  </td>
                  <td>{item.price}</td>
                  <td>Checked</td>
                </tr>
              );
            }
          })}
        </tbody>
      </Table>
    </>
  );
};

export default OrderUser;
