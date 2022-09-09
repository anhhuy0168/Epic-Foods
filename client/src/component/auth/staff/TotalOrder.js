import React, { useContext, useState, useEffect } from "react";
import { OrderContext } from "../../../contexts/OrdersContext";
const TotalOrder = () => {
  const {
    orderState: { orders },
    getAllOrders,
  } = useContext(OrderContext);
  const [listOrder, setListOrder] = useState(orders);
  var result = orders.length;
  useEffect(() => {
    getAllOrders();
  }, [listOrder]);
  return (
    <div
      style={{
        position: "relative",
        top: -160,
        left: 160,
        width: "30px",
        backgroundColor: "red",
        borderRadius: "20px",
        padding: " 2px 8px 2px 10px",
        color: "white",
        fontSize: "16px",
      }}
    >
      {result}
    </div>
  );
};

export default TotalOrder;
