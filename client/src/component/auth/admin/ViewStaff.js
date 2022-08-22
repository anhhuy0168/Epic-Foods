import React, { useEffect } from "react";
import { useContext } from "react";
import { AdminContext } from "../../../contexts/AdminContext";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import AOS from "aos";
import beeSad from "../../../assets/avatar.png";
import "aos/dist/aos.css";
import NavbarAdmin from "../../layout/Navbar/NavbarAdmin";
import ActionButtons from "./ActionButton";
const ViewStaff = () => {
  const {
    userState: { users },
    getStaff,
  } = useContext(AdminContext);
  useEffect(() => getStaff(), []);
  useEffect(() => {
    AOS.init({ duration: 1000 });
    AOS.refresh();
  });

  return (
    <>
      <NavbarAdmin />
      <div
        data-aos="fade-up"
        style={{
          position: "relative",
          width: "50%",
          top: 200,
          left: 350,
          padding: 0,
          display: "grid",
          gridTemplateColumns: "repeat(3,1fr)",
          gridColumnGap: "1px",
          gridRowGap: "10px",
        }}
      >
        {users.map((item) => {
          return (
            <Card
              key={item._id}
              style={{
                margin: "20px 10px 10px 10px",
                borderRadius: "20px",
                width: "20rem",
                boxShadow:
                  "0 2px 5px 0 rgb(0 0 0 / 16%), 0 2px 20px 0 rgb(0 0 0 / 20%)",
              }}
            >
              <Card.Body style={{ width: "" }}>
                <Card.Title style={{ marginLeft: "50px" }}>
                  Username: {item.username}
                </Card.Title>
                <Card.Img
                  variant="top"
                  style={{
                    borderRadius: "20px 20px 0px 0px",
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

export default ViewStaff;
