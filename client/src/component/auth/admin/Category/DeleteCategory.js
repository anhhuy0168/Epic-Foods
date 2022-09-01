import Button from "react-bootstrap/Button";
import { AdminContext } from "../../../../contexts/AdminContext";
import { useContext } from "react";
import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
const DeleteCategory = ({ _id }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const { findCategory, setShowUpdateCategoryModal, deleteCategory } =
    useContext(AdminContext);
  const chooseCategory = (categoryId) => {
    findCategory(categoryId);
    setShowUpdateCategoryModal(true);
  };
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
              onClick={deleteCategory.bind(this, _id)}
            >
              Delete
            </Button>
          </div>
        </Modal.Footer>
      </Modal>
      <Button onClick={chooseCategory.bind(this, _id)}>Update</Button>
    </>
  );
};

export default DeleteCategory;
