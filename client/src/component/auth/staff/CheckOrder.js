import React from "react";
import { useContext, useState } from "react";
import Button from "react-bootstrap/Button";
import { AiOutlineCheckCircle } from "react-icons/ai";

import Modal from "react-bootstrap/Modal";
import { TbTrash } from "react-icons/tb";
import { OrderContext } from "../../../contexts/OrdersContext";
const CheckOrder = (_id) => {
  console.log(_id);
  const {
    orderState: { orders },
    checkOrder,
  } = useContext(OrderContext);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <div
        style={{ cursor: "pointer", position: "relative", left: 1350, top: 70 }}
      >
        <AiOutlineCheckCircle size={40} onClick={handleShow} />
      </div>

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
              onClick={checkOrder.bind(this, _id._id)}
            >
              Check
            </Button>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default CheckOrder;
