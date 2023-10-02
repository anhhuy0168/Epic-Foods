import React, { useContext } from "react";
import Daubep from "../../assets/dau bep1.jpg";
import Daubep1 from "../../assets/dau bep.png";
import Card from "react-bootstrap/Card";
import Doan from "../../assets/doan1.png";
import { AuthContext } from "../../contexts/AuthContext";
const CommitmentProduct = () => {
  const {
    authState: {
      user: { username, role },
    },
  } = useContext(AuthContext);
  let body = null;
  if (role === "user") {
    body = (
      <>
        <div style={{ padding: " 30px 10rem 30px 10rem" }}>
          <div style={{ fontWeight: 700 }}>PRODUCT COMMITMENT :</div>
          <div>
            - Young and dynamic team: This spirit has been reflected in our
            packaging: most of the team's personnel are GenZ: that's why Epic
            Foods understands customers, you will be consulted and cared for.
            Enthusiastic care by the most dedicated team on earth
          </div>
          <Card.Img
            variant="top"
            style={{
              borderRadius: "20px",
              width: "50rem",
              margin: " 30px 0 30px 10rem",
            }}
            src={Daubep1}
          />

          <div>
            - Secret gift: Epic Foods team will give you a small gift included
            with the package. We believe you will love it{" "}
          </div>
          <div>
            - Receive goods right after 1-2 hours of ordering: Epic Foods will
            deliver the food to you in the shortest time to satisfy your craving
            ^^
          </div>
          <div>
            - Safe, guaranteed: Dishes at Epic Foods all have certificates of
            Food Hygiene and Safety, packed securely. The goods are packed in a
            3-layer cardboard box, so you can rest assured that when you receive
            the goods, they will always be fresh ^^{" "}
          </div>
          <div>
            {" "}
            - Quality of food: The dishes at Epic Foods are all made by famous
            chefs to ensure the best quality of food and experience for
            customers.
          </div>
          <Card.Img
            variant="top"
            style={{
              borderRadius: "20px",
              width: "50rem",
              margin: " 30px 0 30px 10rem",
            }}
            src={Doan}
          />
          <div>
            Thank you, hope you enjoy the food from Epic Foods. Oh, and don't
            forget that there are still plenty of dishes in the store!
          </div>
        </div>
      </>
    );
  }
  if (role === "admin" || role === "staff") {
    body = (
      <>
        <div
          style={{ padding: " 30px 10rem 30px 20rem", margin: "90px 0 0 0" }}
        >
          <div style={{ fontWeight: 700 }}>PRODUCT COMMITMENT :</div>
          <div>
            - Young and dynamic team: This spirit has been reflected in our
            packaging: most of the team's personnel are GenZ: that's why Epic
            Foods understands customers, you will be consulted and cared for.
            Enthusiastic care by the most dedicated team on earth
          </div>
          <Card.Img
            variant="top"
            style={{
              borderRadius: "20px",
              width: "50rem",
              margin: " 30px 0 30px 3rem",
            }}
            src={Daubep}
          />
          <div>
            - Secret gift: Epic Foods team will give you a small gift included
            with the package. We believe you will love it{" "}
          </div>
          <div>
            - Receive goods right after 1-2 hours of ordering: Epic Foods will
            deliver the food to you in the shortest time to satisfy your craving
            ^^
          </div>
          <div>
            - Safe, guaranteed: Dishes at Epic Foods all have certificates of
            Food Hygiene and Safety, packed securely. The goods are packed in a
            3-layer cardboard box, so you can rest assured that when you receive
            the goods, they will always be fresh ^^{" "}
          </div>
          <div>
            {" "}
            - Quality of food: The dishes at Epic Foods are all made by famous
            chefs to ensure the best quality of food and experience for
            customers.
          </div>
          <Card.Img
            variant="top"
            style={{
              borderRadius: "20px",
              width: "50rem",
              margin: " 30px 0 30px 3rem",
            }}
            src={Doan}
          />
          <div>
            Thank you, hope you enjoy the food from Epic Foods. Oh, and don't
            forget that there are still plenty of dishes in the store!
          </div>
        </div>
      </>
    );
  }
  return <>{body}</>;
};

export default CommitmentProduct;
