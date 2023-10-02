import axios from "axios";
import { createContext, useReducer, useState } from "react";
import { chartReducer } from "../reducers/chartReducer";
import {
  apiChart,
  CHART_LOADED_FAIL,
  CHART_LOADED_SUCCESS,
  CHART_MONTH_LOADED_SUCCESS,
  CHART_MONTH_LOADED_FAIL,
} from "./constants";
export const ChartContext = createContext();
const ChartContextProvider = ({ children }) => {
  // State
  const [chartState, dispatch] = useReducer(chartReducer, {
    chartDateOfWeek: [],
    chartOfMonth: [],
  });
  const getChartDateOfWeek = async () => {
    try {
      const response = await axios.get(`${apiChart}/get_chart/dateOfWeek`);
      console.log(response.data.data.totalDateOfWeek);
      if (response.data.success) {
        dispatch({
          type: CHART_LOADED_SUCCESS,
          payload: response.data.data.totalDateOfWeek,
        });
      }
    } catch (error) {
      dispatch({ type: CHART_LOADED_FAIL });
    }
  };

  const getChartOfMonth = async () => {
    try {
      const response = await axios.get(`${apiChart}/get_chart/ofMonth`);
      console.log(response.data.data.totalOFMonth);
      if (response.data.success) {
        dispatch({
          type: CHART_MONTH_LOADED_SUCCESS,
          payload: response.data.data.totalOFMonth,
        });
      }
    } catch (error) {
      dispatch({ type: CHART_MONTH_LOADED_FAIL });
    }
  };
  const chartContextData = {
    chartState,
    getChartDateOfWeek,
    getChartOfMonth,
  };

  //return provide

  return (
    <ChartContext.Provider value={chartContextData}>
      {children}
    </ChartContext.Provider>
  );
};
export default ChartContextProvider;
