import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useContext, useState, useEffect } from "react";
import { AdminContext } from "../../../../contexts/AdminContext";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
const CreateCategory = () => {
  const {
    userState: showAddCategoryModal,
    setShowAddCategoryModal,
    addCategory,
    setShowToast,
    getCategory,
  } = useContext(AdminContext);

  const [newCategory, setNewCategory] = useState({
    name: "",
  });
  const { name } = newCategory;
  const onChangeNewCategoryForm = (event) =>
    setNewCategory({ ...newCategory, [event.target.name]: event.target.value });

  const onSubmit = async (event) => {
    event.preventDefault();
    const category = await addCategory(newCategory);
    setNewCategory({ name: "" });
  };

  return (
    <>
      <Form
        className="my-4"
        onSubmit={onSubmit}
        style={{ width: "30rem", position: "relative", left: 650, top: 100 }}
      >
        <Form.Group>
          <Form.Control
            type="text"
            placeholder="Name Category"
            name="name"
            required
            value={name}
            onChange={onChangeNewCategoryForm}
          />
        </Form.Group>
        <Button
          variant="success"
          type="submit"
          style={{ position: "relative", left: 200, top: 10 }}
        >
          Submit
        </Button>
      </Form>
    </>
  );
};

export default CreateCategory;
