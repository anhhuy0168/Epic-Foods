import Button from "react-bootstrap/Button";
import editIcon from "../../assets/pencil.svg";
import deleteIcon from "../../assets/trash.svg";
import { FoodContext } from "../../contexts/FoodsContext";
import { useContext } from "react";

const ActionButtons = ({ url, _id }) => {
  const { deleteFood, findFood, setShowUpdateFoodModal } =
    useContext(FoodContext);

  const chooseFood = (foodId) => {
    findFood(foodId);
    setShowUpdateFoodModal(true);
  };

  return (
    <>
      <Button className="food-button" onClick={chooseFood.bind(this, _id)}>
        <img src={editIcon} alt="edit" width="24" height="24" />
      </Button>
      <Button className="food-button" onClick={deleteFood.bind(this, _id)}>
        <img src={deleteIcon} alt="delete" width="24" height="24" />
      </Button>
    </>
  );
};

export default ActionButtons;
