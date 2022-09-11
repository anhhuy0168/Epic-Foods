import React, { useState } from "react";
import Wrapper from "./Styled";
import { useContext, useEffect } from "react";
import { OrderContext } from "../../../contexts/OrdersContext";
import Card from "react-bootstrap/Card";
import CheckOrder from "./CheckOrder";
import NavbarStaff from "../../layout/Navbar/NavbarStaff";
import { BsTruck } from "react-icons/bs";
import { FaMoneyCheckAlt } from "react-icons/fa";
import { format } from "timeago.js";
import AOS from "aos";
import "aos/dist/aos.css";
const ViewListOrders = () => {
  const {
    orderState: { orders },
    getAllOrders,
  } = useContext(OrderContext);
  const [listOrder, setListOrder] = useState(orders);
  useEffect(() => {
    getAllOrders();
  }, [listOrder]);
  useEffect(() => {
    AOS.init({ duration: 500 });
    AOS.refresh();
  }, [listOrder]);
  return (
    <>
      <NavbarStaff />
      <Wrapper>
        {orders
          .filter((item) => item.deleted === false)
          .map((item) => {
            if (item.product) {
              return (
                <>
                  <div
                    data-aos="zoom-in"
                    className="singleProduct"
                    key={item._id}
                    style={{
                      backgroundColor: "#FFCC00",
                      display: "flex",
                      height: "9rem",
                      width: "60%",
                      position: "relative",
                      left: 440,
                      top: 80,
                      margin: " 0 0 1rem 0rem",
                      borderRadius: "20px",
                      padding: "10px 0 10px 0",
                      boxShadow:
                        "0 2px 5px 0 rgb(0 0 0 / 16%), 0 2px 20px 0 rgb(0 0 0 / 20%)",
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
                        margin: "5px 0 0 5rem",
                        padding: "20px 0 50px 0",
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
                        {item.product.name}x {item.amount}{" "}
                      </div>

                      <div
                        style={{
                          fontSize: "13px",
                          fontWeight: 500,
                          margin: "10px 0 0 60px",
                        }}
                      >
                        {" "}
                        {format(item.createdAt)}
                      </div>
                    </div>
                    <div>
                      <CheckOrder _id={item._id} />
                    </div>
                  </div>
                </>
              );
            }
          })}

        {orders
          .filter((item) => item.deleted === false)
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
                      height: "9rem",
                      boxShadow:
                        "0 2px 5px 0 rgb(0 0 0 / 16%), 0 2px 20px 0 rgb(0 0 0 / 20%)",
                      backgroundColor: "#FFCC00",
                      display: "flex",
                      width: "60%",
                      position: "relative",
                      left: 440,
                      top: 80,
                      margin: " 0 0 1rem 0rem",
                      borderRadius: "20px",
                      padding: "10px 0 10px 0",
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
                        return (
                          <>
                            <div
                              style={{
                                position: "relative",
                                left: 80,
                                top: 10,
                              }}
                            >
                              {" "}
                              <Card.Img
                                variant="top"
                                style={{
                                  margin: "5px 20px 10px 0",
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
                                left: 650,
                                top: 20,
                              }}
                            >
                              <div
                                style={{
                                  position: "relative",
                                  top: 73,
                                  fontSize: "13px",
                                  margin: "20px 0 0 -10rem",
                                  fontWeight: 500,
                                }}
                              >
                                {" "}
                                {format(item.createdAt)}
                              </div>{" "}
                            </div>
                          </>
                        );
                      })}
                    </div>
                    <div style={{ position: "relative", left: 320 }}>
                      <CheckOrder _id={item._id} />
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

export default ViewListOrders;
