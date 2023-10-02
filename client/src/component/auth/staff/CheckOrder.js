import React from "react";
import Wrapper from "./Styled";
import { useContext, useState } from "react";
import Button from "react-bootstrap/Button";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { TiDeleteOutline } from "react-icons/ti";
import Modal from "react-bootstrap/Modal";
import { TbTrash } from "react-icons/tb";
import { OrderContext } from "../../../contexts/OrdersContext";
const CheckOrder = (_id) => {
  const {
    orderState: { orders },
    checkOrder,
    deleteOrder,
  } = useContext(OrderContext);
  const [show, setShow] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleShowDelete = () => setShowDelete(true);
  const handleCloseDelete = () => setShowDelete(false);
  return (
    <>
      <Wrapper>
        <div
          className="delete"
          style={{
            cursor: "pointer",
            position: "relative",
            left: -60,
            top: 43,
          }}
        >
          <AiOutlineCheckCircle size={40} onClick={handleShow} />
        </div>
        <div
          className="check"
          style={{
            cursor: "pointer",
            position: "relative",
            left: -10,
            top: 0,
          }}
        >
          <TiDeleteOutline size={45} onClick={handleShowDelete} />
        </div>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>You want check this order ?</Modal.Title>
          </Modal.Header>
          <Modal.Body>After checked will not undo!</Modal.Body>
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
        <Modal show={showDelete} onHide={handleCloseDelete}>
          <Modal.Header closeButton>
            <Modal.Title>Are you sure ?</Modal.Title>
          </Modal.Header>
          <Modal.Body>After delete will not undo!</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseDelete}>
              Close
            </Button>
            <div variant="primary" onClick={handleCloseDelete}>
              <Button
                className="food-button"
                onClick={deleteOrder.bind(this, _id._id)}
              >
                Delete
              </Button>
            </div>
          </Modal.Footer>
        </Modal>
      </Wrapper>
    </>
  );
};

export default CheckOrder;
