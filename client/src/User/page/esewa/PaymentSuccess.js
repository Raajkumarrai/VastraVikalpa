import React, { useEffect, useContext } from "react";
import ProductContext from "../../../context/productContext/ProductContext";
import { useNavigate } from "react-router-dom";
import Success from "./Success";

const PaymentSuccess = () => {
  const { updateOrderBilling, deleteOrder } = useContext(ProductContext);
  const navigae = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const orderId = urlParams.get("oid");
    const amount = urlParams.get("amt");
    if (orderId) {
      updateOrderBilling(orderId, amount, "EPAYTEST")
        .then((res) => {
          if (res.resData?.billing) {
            localStorage.removeItem("cartData");
            // navigae("/success");
          } else {
            deleteOrder(orderId).then((respo) => {
              navigae("/esewa_payment_failed");
            });
          }
        })
        .catch((error) => {
          console.error("Error updating billing:", error);
        });
    }
  }, [deleteOrder, updateOrderBilling, navigae]);

  return (
    <div>
      <Success />
    </div>
  );
};

export default PaymentSuccess;
