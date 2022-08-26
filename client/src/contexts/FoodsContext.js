import { createContext, useReducer, useState } from "react";
import { foodReducer } from "../reducers/foodReducer";
import {
  apiUrl,
  FOODS_LOADED_SUCCESS,
  FOODS_LOADED_FAIL,
  ADD_FOOD,
  DELETE_FOOD,
  UPDATE_FOOD,
  FIND_FOOD,
  GET_ONE_FOOD,
} from "../contexts/constants";
import axios from "axios";

export const FoodContext = createContext();

const FoodContextProvider = ({ children }) => {
  // State
  const [foodState, dispatch] = useReducer(foodReducer, {
    food: null,
    foods: [],
    foodsLoading: true,
    oneFood: {},
    category: {},
  });

  const [showAddFoodModal, setShowAddFoodModal] = useState(false);
  const [showUpdateFoodModal, setShowUpdateFoodModal] = useState(false);
  const [showToast, setShowToast] = useState({
    show: false,
    message: "",
    type: null,
  });

  //get 1 foods
  const getOneFoods = async (foodId) => {
    try {
      const response = await axios.get(`${apiUrl}/foods/get_food/${foodId}`);
      if (response.data.success)
        dispatch({ type: GET_ONE_FOOD, payload: response.data.food });
    } catch (error) {
      console.log(error);
    }
  };
  // Get all posts
  const getFoods = async () => {
    try {
      const response = await axios.get(`${apiUrl}/foods/get_foods`);
      if (response.data.success) {
        dispatch({ type: FOODS_LOADED_SUCCESS, payload: response.data.food });
      }
    } catch (error) {
      dispatch({ type: FOODS_LOADED_FAIL });
    }
  };
  // Add post
  const addFood = async (newFood) => {
    try {
      const response = await axios.post(
        `${apiUrl}/foods/create_foods`,
        newFood,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      if (response.data.success) {
        dispatch({ type: ADD_FOOD, payload: response.data.food });
        return response.data;
      }
    } catch (error) {
      return error.response.data
        ? error.response.data
        : { success: false, message: "Server error" };
    }
  };

  // Delete post
  const deleteFood = async (foodId) => {
    try {
      const response = await axios.delete(
        `${apiUrl}/foods/delete_product/${foodId}`
      );
      if (response.data.success)
        dispatch({ type: DELETE_FOOD, payload: foodId });
    } catch (error) {
      console.log(error);
    }
  };

  // Find post when user is updating post
  const findFood = (foodId) => {
    const food = foodState.foods.find((food) => food._id === foodId);
    dispatch({ type: FIND_FOOD, payload: food });
  };

  // Update post
  const updateFood = async (updateFood) => {
    try {
      console.log(updateFood.get("_id"));
      for (var pair of updateFood.entries()) {
        console.log(pair[0] + ", " + pair[1]);
      }
      const response = await axios.put(
        `${apiUrl}/foods/update_foods/${updateFood.get("_id")}`,
        updateFood,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      console.log("data add food", response);

      if (response.data.success) {
        dispatch({ type: UPDATE_FOOD, payload: response.data.product });
        return response.data;
      }
    } catch (error) {
      return error.response.data
        ? error.response.data
        : { success: false, message: "Server error" };
    }
  };

  // Post context data
  const foodContextData = {
    getOneFoods,
    foodState,
    getFoods,
    showAddFoodModal,
    setShowAddFoodModal,
    showUpdateFoodModal,
    setShowUpdateFoodModal,
    addFood,
    showToast,
    setShowToast,
    deleteFood,
    findFood,
    updateFood,
  };

  return (
    <FoodContext.Provider value={foodContextData}>
      {children}
    </FoodContext.Provider>
  );
};

export default FoodContextProvider;
