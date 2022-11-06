import React from "react";
import { OrderContext } from "../../../contexts/OrdersContext";
import { useContext, useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Card from "react-bootstrap/Card";
import { BsTruck } from "react-icons/bs";
import { FaMoneyCheckAlt } from "react-icons/fa";
import NavbarMenu from "../../layout/Navbar/NavbarStaff";
import { AiOutlineSearch } from "react-icons/ai";
import Form from "react-bootstrap/Form";

import AOS from "aos";
import "aos/dist/aos.css";
const ViewHistoryOrder = () => {
  const {
    orderState: { historyOrders },
    getAllOrders,
    getOrdersHistory,
  } = useContext(OrderContext);
  useEffect(() => {
    getOrdersHistory();
  }, []);
  console.log(historyOrders);
  useEffect(() => {
    AOS.init({ duration: 700 });
    AOS.refresh();
  }, []);
  const [query, setQuery] = useState("");

  return (
    <>
      <NavbarMenu />
      <nav
        id="main-navbar"
        className="navbar navbar-expand-lg navbar-light  fixed-top"
        style={{
          height: "80px",
          backgroundColor: "white",
          width: "80rem",
          marginLeft: "15rem",
          borderRadius: "20px",
        }}
      >
        <Form.Control
          placeholder="Search by username..."
          style={{ position: "relative", left: 420, width: "17rem", top: 19 }}
          onChange={(e) => setQuery(e.target.value)}
        />
        <AiOutlineSearch
          style={{ position: "relative", left: 380, top: 20 }}
          size={25}
        />
      </nav>
      {historyOrders
        .filter((item) => item.deleted === true)
        .filter((item) => item.user.username.toLowerCase().includes(query))
        .map((item) => {
          if (item.product) {
            return (
              <>
                <div
                  data-aos="zoom-in"
                  className="singleProduct"
                  key={item._id}
                  style={{
                    height: "10rem",

                    boxShadow:
                      "0 2px 5px 0 rgb(0 0 0 / 16%), 0 2px 20px 0 rgb(0 0 0 / 20%)",
                    backgroundColor: "#CCCCCC",
                    display: "flex",
                    width: "62%",
                    position: "relative",
                    left: 400,
                    top: 150,
                    margin: " 0 0 20px 0rem",
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

      {historyOrders
        .filter((item) => item.deleted === true)
        .filter((item) => item.user.username.toLowerCase().includes(query))
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
                    height: "10rem",
                    boxShadow:
                      "0 2px 5px 0 rgb(0 0 0 / 16%), 0 2px 20px 0 rgb(0 0 0 / 20%)",
                    backgroundColor: "#CCCCCC",
                    display: "flex",
                    width: "62%",
                    position: "relative",
                    left: 400,
                    top: 150,
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
                            style={{ position: "absolute", left: 800, top: 50 }}
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
    </>
  );
};
export default ViewHistoryOrder;
