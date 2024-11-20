import React, { useState, useEffect } from "react";
import ProductContext from "./ProductContext";
import axios from "axios";
import { API_BASE_URL } from "../../redux/config";
import { useNavigate } from "react-router-dom";

const ProductState = (props) => {
  const [orderData, setOrderData] = useState(
    JSON.parse(localStorage.getItem("cartData")) || []
  );
  const [summaryData, setSummaryData] = useState([]);
  const [userAddress, setUserAddress] = useState({});
  const [render, setRender] = useState(false);
  const [checkoutPop, setCheckoutPop] = useState([]);

  const [alluserAddress, setAllUserAddress] = useState([]);
  const [userOrderData, setUserOrderData] = useState([]);

  const combineObjects = (arr) => {
    const combined = {};
    arr.forEach((obj) => {
      const key = obj.productId + obj.userId + obj.pColor;
      if (combined[key]) {
        combined[key].quantity += obj.quantity;
      } else {
        combined[key] = { ...obj };
      }
    });
    return Object.values(combined);
  };

  useEffect(() => {
    localStorage.setItem("cartData", JSON.stringify(orderData));
  }, [orderData]);

  const handleSetOrderData = (data) => {
    const combinedData = combineObjects(data);
    setOrderData(combinedData);
  };

  const fetchOrderAddresses = async () => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/api/order/orderaddress`,
        {
          headers: {
            "auth-token": `${JSON.parse(localStorage.getItem("token"))}`,
          },
        }
      );
      setAllUserAddress(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchOrderData = async () => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/api/order/product/orders/eachuser`,
        {
          headers: {
            "auth-token": `${JSON.parse(localStorage.getItem("token"))}`,
          },
        }
      );
      setUserOrderData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const postOrderAddresses = async (data) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/order/orderaddress`,
        data,
        {
          headers: {
            "auth-token": JSON.parse(localStorage.getItem("token")),
          },
        }
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };
  const postOrderData = async (data) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/order/product/order`,
        data,
        {
          headers: {
            "auth-token": JSON.parse(localStorage.getItem("token")),
          },
        }
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchOrderAddresses();
    fetchOrderData();
  }, [render]);
  const [finalPostData, setFinalPostData] = useState({});
  const [isOrderNow, setIsOrderNow] = useState(false);
  const [orderNowData, setOrderNowData] = useState([]);

  // ======================== for update payment ================
  const updateOrderBilling = async (pid, totalAmount, scd) => {
    try {
      const response = await axios.put(
        `${API_BASE_URL}/api/order/order/payment-success/${pid}/${totalAmount}/${scd}`,
        null,
        {
          headers: {
            "auth-token": JSON.parse(localStorage.getItem("token")),
          },
        }
      );
      return response.data;
    } catch (error) {
      console.log(error);
      throw error; // Re-throw the error to handle it outside of this function if needed
    }
  };

  // ======================== for delete order ================
  const deleteOrder = async (orderId) => {
    try {
      const response = await axios.delete(
        `${API_BASE_URL}/api/order/product/order/each/${orderId}`,
        {
          headers: {
            "auth-token": JSON.parse(localStorage.getItem("token")),
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error deleting order:", error);
      throw error; // Re-throw the error to handle it outside of this function if needed
    }
  };

  // ======================== for esewa ======================

  function PaymentPost(path, params) {
    var form = document.createElement("form");
    form.setAttribute("method", "POST");
    form.setAttribute("action", path);

    for (var key in params) {
      var hiddenField = document.createElement("input");
      hiddenField.setAttribute("type", "hidden");
      hiddenField.setAttribute("name", key);
      hiddenField.setAttribute("value", params[key]);
      form.appendChild(hiddenField);
    }

    document.body.appendChild(form);
    form.submit();
  }

  const navigate = useNavigate();

  const finalOrderDeliver = async (data, isnstant, COD) => {
    if (COD) {
      await postOrderData({ ...data, COD: true });

      navigate("/Success");
    } else {
      const resData = await postOrderData({ ...data, COD: false });
      if (resData.data) {
        const path = "https://uat.esewa.com.np/epay/main";
        let params = {
          amt: resData.data.totalPrice - 100,
          psc: 0,
          pdc: 100,
          txAmt: 0,
          tAmt: resData.data.totalPrice,
          pid: resData.data?._id,
          scd: "EPAYTEST",
          su: "http://localhost:3000/esewa_payment_success",
          fu: "http://localhost:3000/esewa_payment_failed",
        };

        PaymentPost(path, params);
      }
    }

    setRender((p) => !p);
    if (!isnstant) {
      setTimeout(() => {
        setOrderData([]);
      }, 3000);
    }
  };

  const finalOrder = async (data, COD) => {
    if (!COD) {
      if (isOrderNow) {
        let finaldata = { ...data, products: orderNowData };
        console.log(finaldata);
        setFinalPostData(finaldata);
        finalOrderDeliver(finaldata, true, false);
      } else {
        if (data.products[0]) {
          setFinalPostData(data);
          finalOrderDeliver(data, false, false);
        }
      }
    } else {
      if (isOrderNow) {
        let finaldata = { ...data, products: orderNowData };
        console.log(finaldata);
        setFinalPostData(finaldata);
        finalOrderDeliver(finaldata, true, true);
      } else {
        if (data.products[0]) {
          setFinalPostData(data);
          finalOrderDeliver(data, false, true);
        }
      }
    }
  };

  return (
    <ProductContext.Provider
      value={{
        setOrderData: handleSetOrderData,
        orderData,
        setSummaryData,
        summaryData,
        setUserAddress,
        userAddress,
        postOrderAddresses,
        setRender,
        alluserAddress,
        finalOrder,
        finalPostData,
        userOrderData,
        setIsOrderNow,
        isOrderNow,
        setOrderNowData,
        setCheckoutPop,
        checkoutPop,
        updateOrderBilling,
        deleteOrder,
      }}
    >
      {props.children}
    </ProductContext.Provider>
  );
};

export default ProductState;
