import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useContext, useState, useEffect } from "react";
import { FoodContext } from "../../contexts/FoodsContext";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import ToggleButton from "react-bootstrap/ToggleButton";
import { AdminContext } from "../../contexts/AdminContext";
import { FormGroup } from "reactstrap";
function AddFood() {
  const {
    userState: { listCategory },
    getCategory,
  } = useContext(AdminContext);
  const history = useHistory();
  useEffect(() => getCategory(), []);

  //context
  const { showAddFoodModal, setShowAddFoodModal, addFood, setShowToast } =
    useContext(FoodContext);
  // State
  const [categoryId, setCategoryId] = useState(null);
  const [categoryName, setCategoryName] = useState(null);
  const [newFood, setNewFood] = useState({
    name: "",
    description: "",
    price: "",
    productImage: "",
    category: "",
  });
  const { _id, name, description, price, productImage, category } = newFood;

  const onChangeNewFoodForm = (event) =>
    setNewFood({ ...newFood, [event.target.name]: event.target.value });

  const onChangeNewImage = (event) =>
    setNewFood({ ...newFood, productImage: event.target.files[0] });

  const closeDialog = () => {
    resetAddFoodData();
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    // const { name, description, price, productImage } = newFood;

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("productImage", productImage, productImage.name);
    formData.append("category", categoryId);
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
        <Modal.Title>What do you want to create?</Modal.Title>
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
          <Form.Group style={{ display: "flex", marginTop: "3rem" }}>
            <div style={{ fontSize: "20px" }}>Category :</div>
            <DropdownButton
              style={{ marginLeft: "20px" }}
              title={categoryName}
              type="file"
            >
              {listCategory.map((item) => {
                return (
                  <>
                    <div
                      key={item._id}
                      onClick={() => setCategoryName(item.name)}
                    >
                      <Dropdown.Item
                        onClick={() => setCategoryId(item._id, item.name)}
                      >
                        {item.name}
                      </Dropdown.Item>
                    </div>
                  </>
                );
              })}
            </DropdownButton>
          </Form.Group>

          <Form.Group>
            <form className="text-center" style={{ margin: "3rem 0 0 -11rem" }}>
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
