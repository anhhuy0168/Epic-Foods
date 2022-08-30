import React, { useState } from "react";
import { FoodContext } from "../contexts/FoodsContext";
import { AuthContext } from "../contexts/AuthContext";
import { useContext, useEffect } from "react";
import Spinner from "react-bootstrap/Spinner";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Toast from "react-bootstrap/Toast";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import SingleFood from "../component/foods/SingleFood";
import AddFoodModal from "../component/foods/AddFood";
import UpdateFoodModal from "../component/foods/UpdateFood";
import addIcon from "../assets/plus-circle-fill.svg";
import SingleFoodUser from "../component/foods/SingleFoodUser";
import NavbarAdmin from "../../src/component/layout/Navbar/NavbarAdmin";
import Navbar from "../../src/component/layout/Navbar/Navbar";
import Carousels from "../component/layout/Carousel";
import UpdateProfile from "../component/auth/UpdateProfile";
import NavbarStaff from "../component/layout/Navbar/NavbarStaff";
const HomePage = () => {
  // Contexts
  const {
    authState: {
      user: { username, role },
    },
  } = useContext(AuthContext);

  const {
    foodState: {
      food,
      foods,
      foods: { _id },
      foodsLoading,
    },
    getFoods,
    setShowAddFoodModal,
    showToast: { show, message, type },
    setShowToast,
  } = useContext(FoodContext);
  //search
  const [searchTerm, setSearchTerm] = useState("");

  // Start: Get all posts
  useEffect(() => getFoods(), []);

  let body = null;

  if (foodsLoading) {
    body = (
      <div className="spinner-container">
        <Spinner animation="border" variant="info" />
      </div>
    );
  } else if (foods?.length === 0) {
    body = (
      <>
        <Card className="text-center mx-5 my-5">
          <Card.Header as="h1">Hi {username}</Card.Header>
          <Card.Body>
            <Card.Title>Welcome to Epic Foods</Card.Title>
            <Card.Text>Click the button below to create foods</Card.Text>
            <Button
              variant="primary"
              onClick={setShowAddFoodModal.bind(this, true)}
            >
              LearnIt!
            </Button>
          </Card.Body>
        </Card>
      </>
    );
  } else if (role === "admin") {
    body = (
      <>
        <NavbarAdmin />
        <SingleFood />
        {/* Open Add Post Modal */}
        <OverlayTrigger
          placement="left"
          overlay={<Tooltip>Add a new food</Tooltip>}
        >
          <Button
            className="btn-floating"
            onClick={setShowAddFoodModal.bind(this, true)}
          >
            <img src={addIcon} alt="add-post" width="60" height="60" />
          </Button>
        </OverlayTrigger>
      </>
    );
  } else if (role === "staff") {
    body = (
      <>
        <NavbarStaff />
        <SingleFoodUser />
      </>
    );
  } else if (role === "user") {
    body = (
      <>
        <Navbar />
        <Carousels />
        <SingleFoodUser />
      </>
    );
  }

  return (
    <>
      {body}
      <AddFoodModal />
      {food !== null && <UpdateFoodModal />}
      {/* After post is added, show toast */}
      <Toast
        show={show}
        style={{ position: "fixed", top: "20%", right: "10px" }}
        className={`bg-${type} text-white`}
        onClose={setShowToast.bind(this, {
          show: false,
          message: "",
          type: null,
        })}
        delay={3000}
        autohide
      >
        <Toast.Body>
          <strong>{message}</strong>
        </Toast.Body>
      </Toast>
    </>
  );
};

export default HomePage;
