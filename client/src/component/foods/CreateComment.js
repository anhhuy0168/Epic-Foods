import React from "react";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import { useState, useContext, useEffect } from "react";
import { AiOutlineSend } from "react-icons/ai";
import { CommentContext } from "../../contexts/CommentContext";
import Button from "react-bootstrap/Button";
import { AuthContext } from "../../contexts/AuthContext";
import { FoodContext } from "../../contexts/FoodsContext";
import beeSad from "../../../src/assets/avatar.png";

const CreateComment = (idProduct) => {
  const {
    authState: {
      user: { username, role, _id, avatar },
      loadUser,
    },
  } = useContext(AuthContext);

  const {
    commentState: { comments },
    getComment,
    createComment,
  } = useContext(CommentContext);

  const [contentComment, setContentComment] = useState({
    content: "",
  });

  const onChangeContent = (event) =>
    setContentComment({
      ...contentComment,
      [event.target.name]: event.target.value,
    });
  useEffect(() => getComment(idProduct.idProduct), [contentComment]);

  const { content } = contentComment;

  const onSubmit = async (event) => {
    event.preventDefault();
    const product = idProduct.idProduct;
    try {
      const commentData = await createComment({
        ...contentComment,
        product,
      });
      if (commentData.success) {
      }
      setContentComment({ content: "" });
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <div
        style={{
          fontSize: "30px",
          textAlign: "center",
          margin: "20px 0 0 0 ",
        }}
      >
        Comments
      </div>
      <img
        style={{
          borderRadius: "50px",
          position: "relative",
          top: 95,
          left: 30,
        }}
        src={!avatar ? beeSad : avatar}
        width="42"
        height="42"
        className="mr-2"
      />{" "}
      <Form style={{ display: "flex" }} onSubmit={onSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Control
            type="text"
            name="content"
            placeholder="Comment..."
            onChange={onChangeContent}
            value={content}
            style={{
              height: "3rem",
              width: "30rem",
              marginTop: "50px",
              marginLeft: "80px",
              borderRadius: "30px",
            }}
          />
        </Form.Group>
        {/* <Button
          variant="primary"
          type="submit"
          style={{
            position: "relative",
            top: 58,
            right: 60,
            padding: 0,
            height: "2rem",
            width: "3rem",
            fontSize: "15px",
          }}
        >
          Send
        </Button> */}
      </Form>
    </>
  );
};

export default CreateComment;
