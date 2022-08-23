import React from "react";
import { useContext } from "react";
import Button from "react-bootstrap/Button";
import deleteIcon from "../../assets/trash.svg";
import { CartContext } from "../../contexts/CartContext";
const DeleteProductCart = (_id, cartId) => {
  const { deleteProductCart } = useContext(CartContext);
  return (
    <>
      <Button
        className="post-button"
        onClick={deleteProductCart.bind(this, _id.cartId)}
      >
        <img src={deleteIcon} alt="delete" width="24" height="24" />
      </Button>
    </>
  );
};

export default DeleteProductCart;
