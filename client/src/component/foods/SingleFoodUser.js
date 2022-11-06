import Wrapper from "./SingleFoodStyle";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import React, { useEffect, useContext, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { FoodContext } from "../../contexts/FoodsContext";
import { Link } from "react-router-dom";
const SingleFoodUser = ({ data }) => {
  const {
    foodState: { foods },
    getFoods,
  } = useContext(FoodContext);
  useEffect(() => {
    AOS.init({ duration: 600 });
    AOS.refresh();
  });
  const [noOfElement, setnoOfElement] = useState(9);

  const loadMore = () => {
    setnoOfElement(noOfElement + noOfElement);
  };
  // useEffect(() => getFoods(), [data]);
  const slice = foods.slice(0, noOfElement);
  return (
    <Wrapper>
      <div
        style={{
          position: "relative",
          width: "50%",
          width: "18rem",
          top: 50,
          left: 300,
          padding: 0,
          display: "grid",
          gridTemplateColumns: "repeat(3,1fr)",
          gridColumnGap: "1px",
          gridRowGap: "10px",
        }}
      >
        {slice.map((item) => {
          return (
            <div data-aos="zoom-in">
              <Card
                key={item._id}
                style={{
                  margin: "40px 20px 10px 20px",
                  borderRadius: "20px",
                  height: "25rem",
                  width: "17rem",
                  boxShadow:
                    "0px 5px 10px 0px rgb(0 0 0 / 16%), 0px 5px 10px 0px rgb(0 0 0 / 20%)",
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
                      textAlign: "center",
                      marginTop: "20px",
                      maxWidth: "15rem",
                      padding: "0 0 0 30px",
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
                    style={{ marginLeft: "6.5rem" }}
                    variant="warning"
                  >
                    <Button variant="warning">Buy</Button>{" "}
                  </Link>
                </Card.Body>
              </Card>
            </div>
          );
        })}
      </div>
      <button
        className="btn btn-dark  "
        onClick={() => loadMore()}
        style={{ position: "relative", left: 720, top: 100 }}
      >
        Load More
      </button>
    </Wrapper>
  );
};

export default SingleFoodUser;
