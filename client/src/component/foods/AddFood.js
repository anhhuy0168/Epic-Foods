import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useContext, useState } from "react";
import { FoodContext } from "../../contexts/FoodsContext";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function AddFood() {
  const history = useHistory();
  //context
  const { showAddFoodModal, setShowAddFoodModal, addFood, setShowToast } =
    useContext(FoodContext);
  // State
  const [newFood, setNewFood] = useState({
    name: "",
    description: "",
    price: "",
    productImage: "",
  });
  const { _id, name, description, price, productImage } = newFood;

  const onChangeNewFoodForm = (event) =>
    setNewFood({ ...newFood, [event.target.name]: event.target.value });

  const onChangeNewImage = (event) =>
    setNewFood({ ...newFood, productImage: event.target.files[0] });

  const closeDialog = () => {
    resetAddFoodData();
  };
  const onSubmit = async (event) => {
    console.log(newFood);
    event.preventDefault();
    // const { name, description, price, productImage } = newFood;

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("productImage", productImage, productImage.name);

    const { success, message } = await addFood(formData);
    resetAddFoodData();
    setShowToast({ show: true, message, type: success ? "success" : "danger" });
    history.push("/homepage");
  };

  const resetAddFoodData = () => {
    setNewFood({ name: "", description: "", price: "", productImage: "" });
    setShowAddFoodModal(false);
  };
  return (
    <Modal show={showAddFoodModal} onHide={closeDialog}>
      <Modal.Header closeButton>
        <Modal.Title>What do you want to buy?</Modal.Title>
      </Modal.Header>
      <Form key={_id} onSubmit={onSubmit}>
        <Modal.Body>
          <Form.Group>
            <Form.Control
              type="text"
              placeholder="Title"
              name="name"
              required
              aria-describedby="title-help"
              value={name}
              onChange={onChangeNewFoodForm}
            />
            <Form.Text id="title-help" muted>
              Required
            </Form.Text>
          </Form.Group>
          <Form.Group>
            <Form.Control
              as="textarea"
              rows={5}
              placeholder="Description"
              name="description"
              value={description}
              onChange={onChangeNewFoodForm}
            />
          </Form.Group>
          <Form.Group>
            <Form.Control
              type="text"
              placeholder="$"
              name="price"
              value={price}
              onChange={onChangeNewFoodForm}
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
            Create
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

export default AddFood;
