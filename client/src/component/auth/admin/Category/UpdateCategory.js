import { useContext, useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { AdminContext } from "../../../../contexts/AdminContext";
import { List } from "reactstrap";
const UpdateCategory = () => {
  const {
    userState: { category },
    setShowUpdateCategoryModal,
    showUpdateCategoryModal,
    setShowToast,
    updateCategory,
  } = useContext(AdminContext);
  const [updatedCategory, setUpdatedCategory] = useState(category);
  useEffect(() => setUpdatedCategory(category), [category]);
  const { name } = updatedCategory;
  const onChangeUpdatedCategoryForm = (event) =>
    setUpdatedCategory({
      ...updatedCategory,
      [event.target.name]: event.target.value,
    });
  const closeDialog = () => {
    setUpdatedCategory(category);
    setShowUpdateCategoryModal(false);
  };
  const onSubmit = async (event) => {
    event.preventDefault();
    const { success, message } = await updateCategory(updatedCategory);
    setShowUpdateCategoryModal(false);
    setShowToast({ show: true, message, type: success ? "success" : "danger" });
  };
  return (
    <>
      <Modal show={showUpdateCategoryModal} onHide={closeDialog}>
        <Modal.Header closeButton>
          <Modal.Title>Update Category?</Modal.Title>
        </Modal.Header>
        <Form onSubmit={onSubmit}>
          <Modal.Body>
            <Form.Group>
              <Form.Control
                type="text"
                placeholder="Name"
                name="name"
                required
                onChange={onChangeUpdatedCategoryForm}
                value={name}
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

export default UpdateCategory;
