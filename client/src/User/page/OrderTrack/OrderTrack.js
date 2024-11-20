import React from "react";
import Card from "./Card";
import { useContext } from "react";
import ProductContext from "../../../context/productContext/ProductContext";

const OrderTrack = () => {
  const { userOrderData } = useContext(ProductContext);

  return (
    <div className="container mx-auto py-8 w-[90%]">
      <h1 className="text-2xl font-bold mb-4">Order Tracking</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {userOrderData
          .sort((a, b) => a.orderSuccess - b.orderSuccess)
          .map((order) => (
            <Card key={order._id} order={order} />
          ))}
      </div>
    </div>
  );
};

export default OrderTrack;
