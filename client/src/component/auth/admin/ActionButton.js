import Button from "react-bootstrap/Button";
import { AdminContext } from "../../../contexts/AdminContext";
import { useContext, useEffect } from "react";
import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
const ActionButtons = ({ _id }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const { deleteStaff, getUser } = useContext(AdminContext);
  useEffect(() => getUser(), [show]);
  return (
    <>
      <Button
        style={{ marginRight: "5rem" }}
        variant="danger"
        onClick={handleShow}
      >
        Delete
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Are you sure ?</Modal.Title>
        </Modal.Header>
        <Modal.Body>This execution will not be undone!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <div variant="primary" onClick={handleClose}>
            <Button
              className="staff-button"
              onClick={deleteStaff.bind(this, _id)}
            >
              Delete
            </Button>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ActionButtons;
