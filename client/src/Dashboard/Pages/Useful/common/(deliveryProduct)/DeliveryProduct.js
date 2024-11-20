import React, { useEffect, useRef, useState } from "react";
import TableOrder from "./TableOrder";
import { useDispatch, useSelector } from "react-redux";
import {
  postOrder,
  getOrders,
  deleteOrder,
  updateOrderSuccess,
} from "../../../../../redux/slices/orderSlice";

import { toast } from "sonner";

const DeliveryProduct = ({ PageFrom }) => {
  const dispatch = useDispatch();
  const userRef = useRef(false);
  const [finalData, setFinalData] = useState([]);
  const { orderData } = useSelector((state) => state.orderReducer);

  useEffect(() => {
    if (userRef.current === false) {
      dispatch(getOrders());
    }
    return () => {
      userRef.current = true;
    };
  }, [dispatch]);

  const handelpostOrder = async (data) => {
    try {
      const response = await dispatch(postOrder(data));
      if (response.payload?.success) {
        toast.success("Product ordered successfully");
      } else if (response.payload?.error) {
        toast.error(response.payload?.error);
      } else {
        toast.error("Cannot order product");
      }
    } catch (error) {
      toast.error("Some error occurred");
    }
  };

  const handelDelete = async (data) => {
    try {
      const response = await dispatch(deleteOrder(data));
      if (response.meta?.requestStatus === "fulfilled") {
        toast.warning("Order deleted successfully");
      } else if (response.payload?.error) {
        toast.error(response.payload?.error);
      } else {
        toast.error("Cannot delete order");
      }
    } catch (error) {
      toast.error("Some error occurred");
    }
  };

  const handelUpdate = async (data) => {
    try {
      const response = await dispatch(updateOrderSuccess(data));
      if (response.payload?.data?.orderSuccess === 1) {
        toast.success("Order delivered successfully");
      } else if (response.payload?.data?.orderSuccess === 2) {
        toast.success("Order finished successfully");
      } else if (response.payload?.data?.orderSuccess === 0) {
        toast.warning("Delivery went back to orders");
      } else if (response.payload?.error) {
        toast.error(response.payload?.error);
      } else {
        toast.error("Cannot update banner");
      }
    } catch (error) {
      toast.error("Some error occurred");
    }
  };
  // const handelUpdatenotify = async (data) => {
  //   try {
  //     const response = await dispatch(updateOrdernotify(data));
  //     // console.log(response);
  //   } catch (error) {
  //     console.error("Error creating post:", error);
  //   }
  // };

  const finalPageData =
    PageFrom.toLowerCase() === "order"
      ? orderData.filter((e) => Number(e.orderSuccess) === 0)
      : PageFrom.toLowerCase() === "delivery"
        ? orderData.filter((e) => Number(e.orderSuccess) === 1)
        : orderData.filter((e) => Number(e.orderSuccess) === 2);
  useEffect(() => {
    let finalorderData = finalPageData.map((item, index) => ({
      ...item,
      sn: index + 1,
    }));
    setFinalData(finalorderData);
    // eslint-disable-next-line
  }, [orderData]);

  return (
    <>
      <TableOrder
        orderData={finalData[0]?.sn ? finalData : []}
        handelpostOrder={handelpostOrder}
        handelDelete={handelDelete}
        handelUpdate={handelUpdate}
        PageFrom={PageFrom}
        PageType={true}
      />
    </>
  );
};

export default DeliveryProduct;
