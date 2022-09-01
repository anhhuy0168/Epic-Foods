import React from "react";
import { useContext, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import NavbarAdmin from "../layout/Navbar/Navbar";
const UpdateProfile = () => {
  const {
    authState: { user },
    updateProfile,
  } = useContext(AuthContext);
  const [updatedProfileUser, setUpdatedProfileUser] = useState(user);
  const onChangeUpdatedProfileForm = (event) =>
    setUpdatedProfileUser({
      ...updatedProfileUser,
      [event.target.name]: event.target.value,
    });

  const onChangeNewImage = (event) =>
    setUpdatedProfileUser({
      ...updatedProfileUser,
      avatar: event.target.files[0],
    });
  const { _id, username, address, phoneNumber, dateOfBirth, avatar } =
    updatedProfileUser;
  console.log(avatar);
  const onSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("_id", _id);
    username && formData.append("username", username);
    address && formData.append("address", address);
    phoneNumber && formData.append("phoneNumber", phoneNumber);
    dateOfBirth && formData.append("dateOfBirth", dateOfBirth);
    avatar || formData.append("avatar", avatar, avatar.name);
    const { success, message } = await updateProfile(formData);
    console.log(formData.get("avatar"));
  };

  return (
    <>
      <NavbarAdmin />
      <Form
        onSubmit={onSubmit}
        style={{
          boxShadow:
            "0 12px 15px 0 rgb(0 0 0 / 5%), 0 12px 20px 0 rgb(0 0 0 / 20%)",
          width: "70rem",
          height: "70rem",
          position: "relative",
          padding: "5rem 0 0rem 0",
          left: 210,
          top: 200,
        }}
      >
        <div style={{ fontWeight: 600, fontSize: "30px", marginLeft: "6rem" }}>
          Setting Profile
          <div
            style={{
              width: "90%",
              backgroundColor: "black",
              height: "1px",
              margin: "1rem 0 5rem 0px ",
            }}
          ></div>
        </div>
        <Modal.Body style={{ width: "30rem", position: "relative", left: 200 }}>
          <Form.Group>
            <img
              src={avatar}
              style={{
                width: "10rem",
                height: "10rem",
                position: "relative",
                left: 250,
                top: -50,
              }}
            />
            <form
              className="text-center"
              style={{ position: "relative", left: -42 }}
            >
              Avatar:
              <input
                style={{ padding: "1rem 0 1rem 0", margin: "0 0 0 20px" }}
                type="file"
                id="frame"
                placeholder="Upload file"
                name="avatar"
                onChange={onChangeNewImage}
              />
            </form>
          </Form.Group>
          <Form.Group>
            Username:
            <Form.Control
              type="text"
              placeholder="Name"
              name="username"
              required
              aria-describedby="title-help"
              value={username}
              onChange={onChangeUpdatedProfileForm}
            />
          </Form.Group>
          <div style={{ display: "flex" }}>
            <Form.Group>
              Address:
              <Form.Control
                style={{ marginRight: "20rem" }}
                rows={3}
                placeholder="address"
                name="address"
                value={address}
                onChange={onChangeUpdatedProfileForm}
              />
            </Form.Group>
            <Form.Group style={{ position: "relative", left: 20, top: 30 }}>
              Phone Number:
              <Form.Control
                style={{
                  width: "10rem",
                  paddingLeft: "30px",
                  position: "relative",
                  left: 120,
                  top: -30,
                }}
                type="text"
                placeholder="phoneNumber"
                name="phoneNumber"
                value={phoneNumber}
                onChange={onChangeUpdatedProfileForm}
              />
            </Form.Group>
          </div>
          <Form.Group>
            Date Of Birth:
            <Form.Control
              type="text"
              placeholder="dateOfBirth"
              name="dateOfBirth"
              value={dateOfBirth}
              onChange={onChangeUpdatedProfileForm}
            />
          </Form.Group>
        </Modal.Body>
        <Button
          variant="primary"
          type="submit"
          style={{ position: "relative", top: -20, left: 800 }}
        >
          Save
        </Button>
        <div style={{ top: 10, left: 210, position: "relative" }}>
          Want to change password ?{" "}
          <Link to="/forgot_password">Click here</Link>
        </div>
      </Form>
    </>
  );
};

export default UpdateProfile;
