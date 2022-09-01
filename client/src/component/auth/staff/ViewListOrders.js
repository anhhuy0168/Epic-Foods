import React from "react";
import Wrapper from "./Styled";
import { useContext, useEffect } from "react";
import { OrderContext } from "../../../contexts/OrdersContext";
import Table from "react-bootstrap/Table";
import Card from "react-bootstrap/Card";
import CheckOrder from "./CheckOrder";
import NavbarStaff from "../../layout/Navbar/NavbarStaff";
import { BsTruck } from "react-icons/bs";
import { FaMoneyCheckAlt } from "react-icons/fa";
import { AiOutlineCheckCircle } from "react-icons/ai";
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
      <NavbarStaff />
      <Wrapper>
        {orders.map((item) => {
          if (item.product) {
            return (
              <>
                <div
                  className="singleProduct"
                  key={item._id}
                  style={{
                    backgroundColor: "#FFCC00",
                    display: "flex",
                    width: "75%",
                    position: "relative",
                    left: 300,
                    top: 150,
                    margin: " 0 0 -20px 0rem",
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
                  </div>

                  <div style={{ width: "40rem", margin: "30px 0 0 10rem" }}>
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
                    <FaMoneyCheckAlt
                      size={20}
                      style={{ margin: "-2px 5px 0 60px" }}
                    />{" "}
                    {item.price}$
                  </div>
                </div>
                <div>
                  <CheckOrder _id={item._id} />
                </div>
              </>
            );
          }
        })}

        {orders.map((item) => {
          if (!item.product) {
            return (
              <>
                <div
                  className="singleProduct"
                  key={item._id}
                  style={{
                    maxHeight: "30rem",

                    backgroundColor: "#FFCC00",
                    display: "flex",
                    width: "75%",
                    position: "relative",
                    left: 300,
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
                  </div>

                  <div>
                    {" "}
                    {item.cart.map((cart) => {
                      console.log(cart);
                      return (
                        <>
                          <div
                            style={{ position: "relative", left: 160, top: 10 }}
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
                            <FaMoneyCheckAlt
                              size={20}
                              style={{ margin: "0px 5px 0 0px" }}
                            />{" "}
                            {item.price}$
                          </div>
                        </>
                      );
                    })}
                  </div>
                </div>
                <div>
                  <CheckOrder _id={item._id} />
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
