import Wrapper from "./SingleFoodStyle";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Badge from "react-bootstrap/Badge";
import ActionButtons from "./ActionButtons";
import Button from "react-bootstrap/Button";
import React, { useEffect, useContext } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
const SingleFood = ({
  food: { _id, name, description, price, productImage },
}) => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
    AOS.refresh();
  });

  return (
    <Wrapper>
      <Card
        data-aos="fade-up"
        style={{
          position: "relative",
          left: 260,
          top: 110,
          margin: "20px 10px 10px 70px",
          flexWrap: "wrap",

          borderRadius: "20px",
        }}
      >
        <Card.Img
          variant="top"
          style={{ borderRadius: "20px 20px 0px 0px" }}
          height={300}
          width={180}
          src={productImage}
        />
        <Card.Body style={{ width: "300px" }}>
          <Card.Title style={{ marginLeft: "80px" }}>{name}</Card.Title>
          <Card.Text style={{ marginLeft: "120px" }}>{price}$</Card.Text>
          <Button style={{ marginLeft: "100px" }} variant="warning">
            Buy
          </Button>
          <Col className="text-right">
            <ActionButtons _id={_id} />
          </Col>
        </Card.Body>
      </Card>
    </Wrapper>
  );
};

export default SingleFood;
