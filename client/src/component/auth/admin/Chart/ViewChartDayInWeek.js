import React, { useContext, useEffect } from "react";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import { ChartContext } from "../../../../contexts/ChartContext";
import { OrderContext } from "../../../../contexts/OrdersContext";
import NavbarAdmin from "../../../layout/Navbar/NavbarAdmin";
import ViewChartOfMonth from "./ViewChartOfMonth";
import AOS from "aos";
import "aos/dist/aos.css";
export default function ChartOfWeek() {
  const {
    chartState: { chartDateOfWeek },
    getChartDateOfWeek,
  } = useContext(ChartContext);
  const {
    orderState: { historyOrders },
    getOrdersHistory,
  } = useContext(OrderContext);
  useEffect(() => {
    getChartDateOfWeek();
  }, []);
  useEffect(() => {
    AOS.init({ duration: 600 });
    AOS.refresh();
  });

  return (
    <>
      <NavbarAdmin />
      <h3
        data-aos="zoom-in"
        data-aos-delay="500"
        style={{
          position: "relative",
          margin: "0px 0 0 45rem",
          top: 80,
          fontFamily: "arial",
        }}
      >
        Total money in a week
      </h3>
      <div data-aos="zoom-in">
        <ResponsiveContainer width="50%" height={450}>
          <BarChart
            style={{
              position: "relative",
              left: 500,
              top: 150,
              boxShadow:
                "0 2px 5px 0 rgb(0 0 0 / 16%), 0 2px 20px 0 rgb(0 0 0 / 20%)",
              borderRadius: "30px",
            }}
            width={500}
            height={300}
            data={chartDateOfWeek}
            margin={{
              top: 50,
              right: 30,
              left: 20,
              bottom: 20,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="label" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar
              dataKey="TotalMoney"
              label={{ fill: "white", fontSize: 20 }}
              fill="#8884d8"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <ViewChartOfMonth />
    </>
  );
}
