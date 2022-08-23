import Wrapper from "./SingleFoodStyle";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import ActionButtons from "./ActionButtons";
import Button from "react-bootstrap/Button";
import React, { useEffect, useContext } from "react";
import { FoodContext } from "../../contexts/FoodsContext";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
const SingleFood = () => {
  const {
    foodState: { foods },
    getFoods,
  } = useContext(FoodContext);
  useEffect(() => {
    AOS.init({ duration: 1000 });
    AOS.refresh();
  });
  useEffect(() => getFoods(), []);

  return (
    <Wrapper>
      <div
        data-aos="fade-up"
        style={{
          position: "relative",
          width: "50%",
          width: "18rem",
          top: 150,
          left: 350,
          padding: 0,
          display: "grid",
          gridTemplateColumns: "repeat(3,1fr)",
          gridColumnGap: "1px",
          gridRowGap: "10px",
        }}
      >
        {foods.map((item) => {
          return (
            <Card
              key={item._id}
              style={{
                margin: "40px 20px 10px 20px",
                borderRadius: "20px",
                height: "28rem",
                width: "17rem",
                boxShadow:
                  "0 2px 5px 0 rgb(0 0 0 / 16%), 0 2px 20px 0 rgb(0 0 0 / 20%)",
              }}
            >
              <Card.Body style={{ width: "15rem", padding: 0 }}>
                <Card.Img
                  variant="top"
                  style={{
                    borderRadius: "20px 20px 0px 0px",
                    width: "16.9rem",
                    height: "15rem",
                  }}
                  src={item.productImage}
                />
                <Card.Title
                  style={{
                    marginLeft: "60px",
                    marginTop: "20px",
                    maxWidth: "15rem",
                  }}
                >
                  {item.name}
                </Card.Title>
                <Card.Text
                  style={{
                    marginLeft: "7rem",
                    fontWeight: 700,
                    fontSize: "20px",
                  }}
                >
                  {item.price} $
                </Card.Text>
                <Link
                  to={`/food/detail/${item._id}`}
                  style={{ marginLeft: "6.8rem" }}
                  variant="warning"
                >
                  <Button variant="warning">Buy</Button>{" "}
                </Link>
                <Col className="text-right">
                  <ActionButtons _id={item._id} />
                </Col>
              </Card.Body>
            </Card>
          );
        })}
      </div>
    </Wrapper>
  );
};

export default SingleFood;
