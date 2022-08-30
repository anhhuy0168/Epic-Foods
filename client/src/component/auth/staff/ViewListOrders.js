import React from "react";
import { useContext, useEffect } from "react";
import { OrderContext } from "../../../contexts/OrdersContext";
import Table from "react-bootstrap/Table";
import Card from "react-bootstrap/Card";

const ViewListOrders = () => {
  const {
    orderState: { orders },
    getAllOrders,
  } = useContext(OrderContext);
  console.log(orders);
  useEffect(() => {
    getAllOrders();
  }, []);
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
          {orders.map((item) => {
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
          {orders.map((item) => {
            if (!item.product) {
              return (
                <tr key={item._id}>
                  <td>{item.user.username}</td>
                  <td>{item.user.address}</td>
                  <td>{item.user.phoneNumber}</td>
                  <td>
                    {" "}
                    {item.cart.map((cart) => {
                      console.log(cart);
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

export default ViewListOrders;
