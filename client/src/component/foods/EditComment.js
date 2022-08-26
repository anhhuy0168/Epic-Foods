import { useContext, useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { CommentContext } from "../../contexts/CommentContext";

const EditComment = () => {
  const {
    commentState: { comment },
    setShowUpdateCommentModal,
    showUpdateCommentModal,
    setShowToast,
    updateComment,
  } = useContext(CommentContext);
  const [updatedComment, setUpdatedComment] = useState(comment);
  useEffect(() => setUpdatedComment(comment), [comment]);
  const onChangeUpdatedCommentForm = (event) =>
    setUpdatedComment({
      ...updatedComment,
      [event.target.name]: event.target.value,
    });
  const closeDialog = () => {
    setUpdatedComment(comment);
    setShowUpdateCommentModal(false);
  };
  const { content } = updatedComment;
  const onSubmit = async (event) => {
    event.preventDefault();
    const { success, message } = await updateComment(updatedComment);
    setShowUpdateCommentModal(false);
    setShowToast({ show: true, message, type: success ? "success" : "danger" });
  };

  return (
    <>
      <Modal
        show={showUpdateCommentModal}
        onHide={closeDialog}
        style={{ marginTop: "10rem" }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Update Comment?</Modal.Title>
        </Modal.Header>
        <Form onSubmit={onSubmit}>
          <Modal.Body>
            <Form.Group>
              <Form.Control
                type="text"
                placeholder="Comment..."
                name="content"
                required
                onChange={onChangeUpdatedCommentForm}
                value={content}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={closeDialog}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

export default EditComment;
