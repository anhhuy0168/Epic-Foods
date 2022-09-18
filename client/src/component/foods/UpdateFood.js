import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useContext, useState, useEffect } from "react";
import { FoodContext } from "../../contexts/FoodsContext";
import { AdminContext } from "../../contexts/AdminContext";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
const UpdateFoodModal = () => {
  // Contexts
  const {
    foodState: { food },
    showUpdateFoodModal,
    setShowUpdateFoodModal,
    updateFood,
    setShowToast,
  } = useContext(FoodContext);
  const {
    userState: { listCategory },
    getCategory,
  } = useContext(AdminContext);
  // State
  const [categoryId, setCategoryId] = useState(null);
  const [categoryName, setCategoryName] = useState(null);
  const [updatedFoods, setUpdatedFood] = useState(food);

  useEffect(() => setUpdatedFood(food), [food]);

  const onChangeUpdatedFoodForm = (event) =>
    setUpdatedFood(
      { ...updatedFoods, [event.target.name]: event.target.value }
      // console.log(updatedFood)
    );

  const onChangeNewImage = (event) =>
    setUpdatedFood({ ...updatedFoods, photo: event.target.files[0] });

  const closeDialog = () => {
    setUpdatedFood(food);
    setShowUpdateFoodModal(false);
  };
  const { _id, name, description, price, photo, category } = updatedFoods;
  console.log(category);
  const onSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("_id", _id);
    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price);
    category &&
      formData.append("category", !categoryId ? category._id : categoryId);
    photo && formData.append("productImage", photo, photo.name);
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
          <Form.Group style={{ display: "flex", marginTop: "3rem" }}>
            <div style={{ fontSize: "20px" }}>Category :</div>
            <DropdownButton
              style={{ marginLeft: "20px" }}
              title={!categoryName ? category.name : categoryName}
              type="text"
            >
              {listCategory.map((item) => {
                return (
                  <>
                    <div key={item._id}>
                      <div key={item._id}>
                        <div onClick={() => setCategoryName(item.name)}>
                          <Dropdown.Item
                            onClick={() => setCategoryId(item._id, item.name)}
                          >
                            {item.name}
                          </Dropdown.Item>
                        </div>
                      </div>
                    </div>
                  </>
                );
              })}
            </DropdownButton>
          </Form.Group>

          <Form.Group>
            <form className="text-center">
              <input
                type="file"
                placeholder="Upload file"
                name="productImage"
                onChange={onChangeNewImage}
                required
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
