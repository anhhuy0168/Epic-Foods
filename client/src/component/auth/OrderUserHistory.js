import React from "react";
import { useContext, useState, useEffect } from "react";
import { OrderContext } from "../../contexts/OrdersContext";
import Table from "react-bootstrap/Table";
import Card from "react-bootstrap/Card";
import { BsTruck } from "react-icons/bs";
import { FaMoneyCheckAlt } from "react-icons/fa";
import Wrapper from "../auth/staff/Styled";
import AOS from "aos";
import "aos/dist/aos.css";
const OrderUserHistory = () => {
  const {
    orderState: { orderUser },
    getUserOrder,
  } = useContext(OrderContext);
  const [order, setOrder] = useState(orderUser);
  useEffect(() => {
    getUserOrder();
  }, [order]);
  useEffect(() => {
    AOS.init({ duration: 800 });
    AOS.refresh();
  }, []);
  console.log(orderUser);
  return (
    <>
      <Wrapper>
        <div
          style={{
            fontWeight: 600,
            fontSize: "30px",
            marginLeft: "6rem",
            marginTop: "40px",
            marginBottom: "-80px",
          }}
        >
          History Order
          <div
            style={{
              width: "90%",
              backgroundColor: "black",
              height: "1px",
              margin: "1rem 0 0rem 0px ",
            }}
          ></div>
        </div>
        {orderUser
          .filter((item) => item.deleted === true)
          .map((item) => {
            console.log(item);
            if (item.product) {
              console.log(item);
              return (
                <>
                  <div
                    data-aos="zoom-in"
                    className="singleProduct"
                    key={item._id}
                    style={{
                      backgroundColor: "#FFCC00",
                      display: "flex",
                      width: "65%",
                      position: "relative",
                      left: 300,
                      top: 150,
                      margin: " 0 0 10px 0rem",
                      borderRadius: "20px",
                      padding: "10px 0 10px 0",
                      height: "10rem",
                    }}
                  >
                    <div
                      style={{
                        display: "block",
                        maxWidth: "20rem",
                        minWidth: "20rem",
                        fontWeight: 500,
                        margin: "0 0 0 30px",
                      }}
                    >
                      <BsTruck />
                      <div>{item.user.username}</div>
                      <div>Address: {item.user.address}</div>
                      <div>Phone: {item.user.phoneNumber}</div>
                      <FaMoneyCheckAlt
                        size={20}
                        style={{ margin: "-2px 5px 0 0px" }}
                      />{" "}
                      {item.price}$
                    </div>

                    <div
                      style={{
                        width: "40rem",
                        margin: "50px 0 0 10rem",
                        fontWeight: 500,
                      }}
                    >
                      <div style={{ maxWidth: "20rem" }}>
                        {" "}
                        <Card.Img
                          variant="top"
                          style={{
                            margin: "0 20px 0 0",
                            borderRadius: "20px 20px 20px 20px",
                            width: "2.5rem",
                            height: "2.5rem",
                          }}
                          src={item.product.productImage}
                        />
                        {item.product.name} x{item.amount}{" "}
                      </div>
                    </div>
                  </div>
                </>
              );
            }
          })}
        {orderUser
          .filter((item) => item.deleted === true)
          .map((item) => {
            if (!item.product) {
              return (
                <>
                  <div
                    data-aos="zoom-in"
                    className="singleProduct"
                    key={item._id}
                    style={{
                      maxHeight: "30rem",

                      backgroundColor: "#FFCC00",
                      display: "flex",
                      width: "65%",
                      position: "relative",
                      left: 300,
                      top: 150,
                      margin: " 0 0 10px 0rem",
                      borderRadius: "20px",
                      padding: "10px 0 10px 0",
                      height: "10rem",
                    }}
                  >
                    <div
                      style={{
                        display: "block",
                        maxWidth: "20rem",
                        minWidth: "20rem",
                        fontWeight: 500,
                        margin: "0 0 0 30px",
                      }}
                    >
                      <BsTruck />
                      <div>{item.user.username}</div>
                      <div>Address: {item.user.address}</div>
                      <div>Phone: {item.user.phoneNumber}</div>
                      <FaMoneyCheckAlt
                        size={20}
                        style={{ margin: "0px 5px 0 0px" }}
                      />{" "}
                      {item.price}$
                    </div>

                    <div>
                      {" "}
                      {item.cart.map((cart) => {
                        console.log(cart);
                        return (
                          <>
                            <div
                              style={{
                                position: "relative",
                                left: 160,
                                top: 10,
                                fontWeight: 500,
                              }}
                            >
                              {" "}
                              <Card.Img
                                variant="top"
                                style={{
                                  margin: "0 20px 10px 0",
                                  borderRadius: "20px 20px 20px 20px",
                                  width: "2.5rem",
                                  height: "2.5rem",
                                }}
                                src={cart.product.productImage}
                              />
                              {cart.product.name} x{cart.amount}
                            </div>
                            <div
                              style={{
                                position: "absolute",
                                left: 800,
                                top: 50,
                              }}
                            >
                              {" "}
                            </div>
                          </>
                        );
                      })}
                    </div>
                  </div>
                </>
              );
            }
          })}
      </Wrapper>
    </>
  );
};

export default OrderUserHistory;
