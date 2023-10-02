import React from "react";
import { useContext, useEffect } from "react";
import { OrderContext } from "../../../../../src/contexts/OrdersContext";
const ViewTotalOrderSale = () => {
  const {
    orderState: { historyOrders },
    getAllOrders,
    getOrdersHistory,
  } = useContext(OrderContext);
  useEffect(() => {
    getOrdersHistory();
  }, []);
  var total = historyOrders.filter((item) => item.deleted === true);

  return (
    <>
      <div
        style={{
          position: "relative",
          left: 500,
          backgroundColor: "#FFFF00",
          width: "14%",
          textAlign: "center",
          height: "8rem",
          fontSize: "30px",
          borderRadius: "30px",
          padding: "20px 30px 30px 30px",
          boxShadow:
            "0 2px 5px 0 rgb(0 0 0 / 16%), 0 2px 20px 0 rgb(0 0 0 / 20%)",
        }}
      >
        Total Order
        <div>565</div>
      </div>
    </>
  );
};

export default ViewTotalOrderSale;
