import React from "react";
import { BsThreeDots } from "react-icons/bs";
import Wrapper from "./ButtonStyled";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { CommentContext } from "../../contexts/CommentContext";
const DeleteComment = (_id) => {
  const { deleteComment, findComment, setShowUpdateCommentModal } =
    useContext(CommentContext);
  const chooseComment = (commentId) => {
    setShowUpdateCommentModal(true);
    console.log(setShowUpdateCommentModal);
    findComment(commentId._id);
  };
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Wrapper>
        <div className="dropdown" style={{ cursor: "pointer" }}>
          <BsThreeDots
            className="Dot"
            style={{
              position: "relative",
              left: 410,
              top: -60,
            }}
            size={15}
          ></BsThreeDots>
          <div
            className="dropdown-content"
            style={{ margin: "-50px 0 0 20rem" }}
          >
            <p className="content" onClick={handleShow}>
              Delete
            </p>
            <p
              className="content"
              style={{ marginTop: "-15px" }}
              onClick={chooseComment.bind(this, _id)}
            >
              Edit
            </p>
          </div>
        </div>
      </Wrapper>
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
              onClick={deleteComment.bind(this, _id._id)}
            >
              Delete
            </Button>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default DeleteComment;
