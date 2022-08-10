import {
  FOODS_LOADED_SUCCESS,
  FOODS_LOADED_FAIL,
  ADD_FOOD,
  DELETE_FOOD,
  UPDATE_FOOD,
  FIND_FOOD,
} from "../contexts/constants";

export const foodReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case FOODS_LOADED_SUCCESS:
      return {
        ...state,
        foods: payload,
        foodsLoading: false,
      };

    case FOODS_LOADED_FAIL:
      return {
        ...state,
        foods: [],
        foodsLoading: false,
      };

    case ADD_FOOD:
      return {
        ...state,
        foods: [...state.foods, payload],
      };

    case DELETE_FOOD:
      return {
        ...state,
        foods: state.foods.filter((food) => food._id !== payload),
      };

    case FIND_FOOD:
      return { ...state, food: payload };

    case UPDATE_FOOD:
      const newFoods = state.foods.map((food) =>
        food._id === payload._id ? payload : food
      );

      return {
        ...state,
        foods: newFoods,
      };

    default:
      return state;
  }
};
