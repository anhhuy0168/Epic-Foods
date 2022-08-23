import React, { useEffect } from "react";
import Table from "react-bootstrap/Table";
import addIcon from "../../../../assets/plus-circle-fill.svg";
import { useContext } from "react";
import { AdminContext } from "../../../../contexts/AdminContext";
import Button from "react-bootstrap/Button";
import { AuthContext } from "../../../../contexts/AuthContext";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import CreateCategory from "./CreateCategory";
import Toast from "react-bootstrap/Toast";
import DeleteCategory from "./DeleteCategory";
import UpdateCategory from "./UpdateCategory";
import { ListGroup, ListGroupItem } from "reactstrap";
import NavbarAdmin from "../../../layout/Navbar/NavbarAdmin";
import { Link } from "react-router-dom";
const ViewCategory = () => {
  const {
    userState: { listCategory },
    getCategory,
    setShowAddCategoryModal,
    showUpdateCategoryModal,
    setShowUpdateCategoryModal,
    setUpdateCategoryData,
    showToast: { show, message, type },
    setShowToast,
  } = useContext(AdminContext);
  const {
    authState: {
      user: { username, role },
    },
  } = useContext(AuthContext);
  useEffect(() => getCategory(), []);

  let body = null;
  if (role === "admin") {
    body = (
      <>
        <ListGroup
          className="mt-4"
          style={{ width: "50rem", position: "relative", left: 500, top: 100 }}
        >
          {listCategory.length > 0 ? (
            <>
              {listCategory.map((item) => (
                <ListGroupItem className="d-flex" key={item._id}>
                  <strong>{item.name}</strong>
                  <div className="ml-auto"></div>
                  <DeleteCategory _id={item._id} />
                </ListGroupItem>
              ))}
            </>
          ) : (
            <h4 className="text-center">No Users</h4>
          )}
        </ListGroup>
      </>
    );
  }
  return (
    <>
      <NavbarAdmin />
      <CreateCategory />
      <UpdateCategory />
      {body}
    </>
  );
};

export default ViewCategory;
