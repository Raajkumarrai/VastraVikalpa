import Single from "./Single";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../../../redux/slices/authSlice";
import { getdetail } from "../../../../redux/slices/userDetailSlice";
import {
  getOrders,
  updateOrderSuccess,
} from "../../../../redux/slices/orderSlice";
import { getproducts } from "../../../../redux/slices/productSlice";
import { getSixMonthDataChartTwoDiffUser } from "../../../../redux/slices/statisticsSlice";

const Page = ({ userId }) => {
  const dispatch = useDispatch();
  const userRef = useRef();
  const [finalData, setFinalData] = useState([]);
  useEffect(() => {
    if (!userRef.current) {
      dispatch(getdetail());
      dispatch(getUser(userId));
      dispatch(getOrders());
      dispatch(getproducts());
      dispatch(getSixMonthDataChartTwoDiffUser(userId));
    }
  }, [dispatch, userId]);

  const { oneUserData } = useSelector((state) => state.authReducer);
  const { detailData } = useSelector((state) => state.userDetailReducer);
  const { orderData } = useSelector((state) => state.orderReducer);
  const { productData } = useSelector((state) => state.productReducer);
  const { sixMonthDataTwoDiffUser } = useSelector(
    (state) => state.statisticsReducer
  );

  const userDetail = detailData.find(
    (detail) => detail.userId === oneUserData._id
  );
  const userData = { ...oneUserData, detail: userDetail };
  let joinedData = [];
  joinedData = orderData.map((order) => {
    const matchingProducts = productData.find((e) => e._id === order.productId);
    return {
      ...order,
      product: matchingProducts,
    };
  });

  const handelUpdate = async (data) => {
    try {
      await dispatch(updateOrderSuccess(data));
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  const finalOrder = joinedData.filter(
    (e) => String(e.userId?._id) === String(userId)
  );

  useEffect(() => {
    let finalorderData = finalOrder.map((item, index) => ({
      ...item,
      sn: index + 1,
      userDetail: userDetail,
      user: oneUserData,
    }));
    setFinalData(finalorderData);
    // eslint-disable-next-line
  }, [userId, orderData, productData, userDetail, oneUserData]);

  return (
    <>
      <Single
        userData={userData}
        orderData={finalData[0]?.sn ? finalData : []}
        handelUpdate={handelUpdate}
        userTransaction={sixMonthDataTwoDiffUser}
      />
    </>
  );
};

export default Page;
