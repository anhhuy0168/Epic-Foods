import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useContext, useState, useEffect } from "react";
import { FoodContext } from "../../contexts/FoodsContext";

const UpdateFoodModal = () => {
  // Contexts
  const {
    foodState: { food },
    showUpdateFoodModal,
    setShowUpdateFoodModal,
    updateFood,
    setShowToast,
  } = useContext(FoodContext);

  // State
  const [updatedFoods, setUpdatedFood] = useState(food);

  useEffect(() => setUpdatedFood(food), [food]);

  const onChangeUpdatedFoodForm = (event) =>
    setUpdatedFood(
      { ...updatedFoods, [event.target.name]: event.target.value }
      // console.log(updatedFood)
    );

  const onChangeNewImage = (event) =>
    setUpdatedFood({ ...updatedFoods, productImage: event.target.files[0] });

  const closeDialog = () => {
    setUpdatedFood(food);
    setShowUpdateFoodModal(false);
  };
  const { _id, name, description, price, productImage } = updatedFoods;

  // const onSubmit = async (event) => {
  //   event.preventDefault();
  //   console.log(updatedFoods);
  //   const { success, message } = await updateFood(updatedFoods);
  //   setShowUpdateFoodModal(false);
  //   setShowToast({ show: true, message, type: success ? "success" : "danger" });
  // };
  const onSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("_id", _id);
    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("productImage", productImage, productImage.name);
    const { success, message } = await updateFood(formData);
    setShowUpdateFoodModal(false);
    setShowToast({ show: true, message, type: success ? "success" : "danger" });
  };

  return (
    <Modal show={showUpdateFoodModal} onHide={closeDialog}>
      <Modal.Header closeButton>
        <Modal.Title>Edit product ?</Modal.Title>
      </Modal.Header>
      <Form onSubmit={onSubmit}>
        <Modal.Body>
          <Form.Group>
            <Form.Control
              type="text"
              placeholder="Name"
              name="name"
              required
              aria-describedby="title-help"
              value={name}
              onChange={onChangeUpdatedFoodForm}
            />
            <Form.Text id="title-help" muted>
              Required
            </Form.Text>
          </Form.Group>
          <Form.Group>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Description"
              name="description"
              value={description}
              onChange={onChangeUpdatedFoodForm}
            />
          </Form.Group>
          <Form.Group>
            <Form.Control
              type="text"
              placeholder="Price"
              name="price"
              value={price}
              onChange={onChangeUpdatedFoodForm}
            />
          </Form.Group>
          <Form.Group>
            <form class="text-center">
              <input
                type="file"
                placeholder="Upload file"
                name="productImage"
                onChange={onChangeNewImage}
              />
            </form>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeDialog}>
            Cancel
          </Button>
          <Button variant="primary" type="submit">
            Done
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default UpdateFoodModal;
