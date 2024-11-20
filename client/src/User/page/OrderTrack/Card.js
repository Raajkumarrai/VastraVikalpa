import React, { useState, useEffect } from "react";
import formatRS from "../../../libs/FormatRS";

const Card = ({ order }) => {
  const [orderData, setOrderData] = useState({});
  const [showOrder, setShowOrder] = useState(1);
  useEffect(() => {
    if (order?.products[0]?.productId) {
      setOrderData({
        product: order.products[0].productId,
        quantity: order.products[0].quantity,
      });
    }
  }, [order]);
  const handelClick = (data, index) => {
    setOrderData(data);
    setShowOrder(index);
  };

  const showOrderFun = () => {
    let statusText, statusColor;

    switch (order.orderSuccess) {
      case 0:
        statusText = "Ordered";
        statusColor = "bg-yellow-300";
        break;
      case 1:
        statusText = "Delivered";
        statusColor = "bg-green-300";
        break;
      case 2:
        statusText = "Received";
        statusColor = "bg-blue-300";
        break;
      default:
        statusText = "Ordered";
        statusColor = "bg-yellow-300";
    }

    return (
      <div
        className={`border scale-90 shadow rounded-full text-xs font-semibold px-4 flex justify-center items-center ${statusColor}`}
      >
        {statusText}
      </div>
    );
  };

  return (
    <div className={`shadow-md rounded-md p-4 mb-4 font-poppins`}>
      <div className="flex justify-between">
        <div className="font-bold mb-2">Order Details</div>
        {showOrderFun()}
      </div>
      <div className="flex gap-2">
        {order.products.map((e, index) => {
          return (
            <div
              key={index}
              onClick={() =>
                handelClick(
                  {
                    product: e.productId,
                    quantity: e.quantity,
                  },
                  index + 1
                )
              }
              className={`rounded-full ${showOrder === index + 1 && "bg-blue-700 text-white "} hover:bg-blue-700 hover:text-white cursor-pointer flex justify-center items-center px-4 py-0.5 text-xs font-semibold mt-[1px] border shadow mb-2`}
            >
              P1
            </div>
          );
        })}
      </div>
      <div className="mx-2">
        <div className="text-sm mb-2 ">
          Product Name: {orderData?.product?.title}
        </div>
        <div className="text-sm mb-2 ">
          Product Price: {formatRS(orderData?.product?.price)}
        </div>
        <div className="text-sm mb-2 ">
          Product Quantity: {orderData?.quantity}
        </div>
        <div className="text-sm mb-2 ">
          Total Price: {formatRS(order?.totalPrice)}
        </div>
      </div>
      {/* Add more fields as needed */}
    </div>
  );
};

export default Card;
