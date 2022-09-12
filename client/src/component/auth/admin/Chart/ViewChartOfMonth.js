import React, { useContext, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

import { ChartContext } from "../../../../contexts/ChartContext";
import { OrderContext } from "../../../../contexts/OrdersContext";
import NavbarAdmin from "../../../layout/Navbar/NavbarAdmin";
import AOS from "aos";
import "aos/dist/aos.css";
export default function ChartOfMonth() {
  const {
    chartState: { chartOfMonth },
    getChartOfMonth,
  } = useContext(ChartContext);
  useEffect(() => {
    getChartOfMonth();
  }, []);
  useEffect(() => {
    AOS.init({ duration: 600 });
    AOS.refresh();
  });
  console.log(chartOfMonth);
  return (
    <>
      <h3
        data-aos="zoom-in"
        data-aos-delay="500"
        style={{
          position: "relative",
          margin: "0px 0 0 45rem",
          top: 250,
          fontFamily: "arial",
        }}
      >
        Total money in a month
      </h3>{" "}
      <div data-aos="fade-right">
        <LineChart
          style={{
            position: "relative",
            left: 480,
            margin: "20rem 0 20rem 0",
            boxShadow:
              "0 2px 5px 0 rgb(0 0 0 / 16%), 0 2px 20px 0 rgb(0 0 0 / 20%)",
            borderRadius: "30px",
          }}
          width={800}
          height={500}
          data={chartOfMonth}
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
          <Line
            type="monotone"
            dataKey="TotalMoney"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </div>
    </>
  );
}
