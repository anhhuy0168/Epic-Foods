import React, { useEffect } from "react";
import { useContext, useState } from "react";
import { AdminContext } from "../../../contexts/AdminContext";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import AOS from "aos";
import ActionButtons from "./ActionButton";
import beeSad from "../../../assets/avatar.png";
import "aos/dist/aos.css";
import NavbarAdmin from "../../layout/Navbar/NavbarAdmin";
import Form from "react-bootstrap/Form";
import { AiOutlineSearch } from "react-icons/ai";

const ViewUser = () => {
  const {
    userState: { listUser },
    getUser,
  } = useContext(AdminContext);
  useEffect(() => {
    getUser();
  }, []);
  useEffect(() => {
    AOS.init({ duration: 1000 });
    AOS.refresh();
  });
  const [query, setQuery] = useState("");

  console.log(listUser);
  return (
    <>
      <NavbarAdmin />
      <nav
        id="main-navbar"
        className="navbar navbar-expand-lg navbar-light  fixed-top"
        style={{
          height: "80px",
          backgroundColor: "white",
          width: "60rem",
          marginLeft: "25rem",
          borderRadius: "20px",
        }}
      >
        <Form.Control
          placeholder="Search user..."
          style={{ position: "relative", left: 320, width: "17rem", top: 19 }}
          onChange={(e) => setQuery(e.target.value)}
        />
        <AiOutlineSearch
          style={{ position: "relative", left: 280, top: 20 }}
          size={25}
        />
      </nav>
      <div
        data-aos="fade-up"
        style={{
          position: "relative",
          width: "50%",
          top: 100,
          left: 350,
          padding: 0,
          display: "grid",
          gridTemplateColumns: "repeat(3,1fr)",
          gridColumnGap: "1px",
          gridRowGap: "10px",
        }}
      >
        {listUser
          .filter((item) => item.username.toLowerCase().includes(query))
          .map((item) => {
            return (
              <Card
                key={item._id}
                style={{
                  margin: "20px 10px 10px 10px",
                  borderRadius: "20px",
                  width: "21rem",
                  boxShadow:
                    "0 2px 5px 0 rgb(0 0 0 / 16%), 0 2px 20px 0 rgb(0 0 0 / 20%)",
                }}
              >
                <Card.Body style={{ width: "" }}>
                  <Card.Title style={{ marginLeft: "10px" }}>
                    Username: {item.username}
                  </Card.Title>
                  <Card.Img
                    variant="top"
                    style={{
                      borderRadius: "50px",
                      width: "5rem",
                      height: "5rem",
                      marginLeft: "6rem",
                    }}
                    src={!item.avatar ? beeSad : item.avatar}
                  />
                  <Card.Text style={{ marginLeft: "10px", marginTop: "20px" }}>
                    Address: {item.address}
                  </Card.Text>
                  <Card.Text style={{ marginLeft: "10px" }}>
                    Email: {item.email}
                  </Card.Text>
                  <Card.Text style={{ marginLeft: "10px" }}>
                    Role: {item.role}
                  </Card.Text>
                  <Col className="text-right">
                    <ActionButtons _id={item._id} />
                  </Col>
                </Card.Body>
              </Card>
            );
          })}
      </div>
    </>
  );
};

export default ViewUser;
