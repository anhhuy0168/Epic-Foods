import {
  CHART_LOADED_FAIL,
  CHART_LOADED_SUCCESS,
  CHART_MONTH_LOADED_SUCCESS,
  CHART_MONTH_LOADED_FAIL,
} from "../contexts/constants";
export const chartReducer = (state, action) => {
  console.log(action);
  const { type, payload } = action;
  switch (type) {
    case CHART_LOADED_SUCCESS:
      return {
        ...state,
        chartDateOfWeek: payload,
      };
    case CHART_LOADED_FAIL:
      return {
        ...state,
        chartDateOfWeek: [],
      };
    case CHART_MONTH_LOADED_SUCCESS:
      return {
        ...state,
        chartOfMonth: payload,
      };
    case CHART_MONTH_LOADED_FAIL:
      return {
        ...state,
        chartOfMonth: [],
      };
    default:
      return state;
  }
};
