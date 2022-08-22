import Button from "react-bootstrap/Button";
import { FoodContext } from "../../contexts/FoodsContext";
import { useContext } from "react";
import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { TbTrash } from "react-icons/tb";
import { AiOutlineEdit } from "react-icons/ai";
const ActionButtons = ({ url, _id }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const { deleteFood, findFood, setShowUpdateFoodModal } =
    useContext(FoodContext);

  const chooseFood = (foodId) => {
    findFood(foodId);
    setShowUpdateFoodModal(true);
  };

  return (
    <>
      <TbTrash
        style={{ marginTop: "20px", marginRight: "10px", cursor: "pointer" }}
        size={25}
        onClick={handleShow}
      ></TbTrash>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Are you sure ?</Modal.Title>
        </Modal.Header>
        <Modal.Body>After delete will not undo!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <div variant="primary" onClick={handleClose}>
            <Button
              className="food-button"
              onClick={deleteFood.bind(this, _id)}
            >
              Delete
            </Button>
          </div>
        </Modal.Footer>
      </Modal>
      <AiOutlineEdit
        style={{ marginRight: "55px", marginTop: "20px", cursor: "pointer" }}
        size={25}
        onClick={chooseFood.bind(this, _id)}
      ></AiOutlineEdit>
    </>
  );
};

export default ActionButtons;
