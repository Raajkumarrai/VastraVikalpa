import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSixMonthDataChartThreeDiff } from "../../../../redux/slices/statisticsSlice";
import Barchart from "./Barchart";

const Page = () => {
  const dispatch = useDispatch();

  const { sixMonthDataThreeDiff } = useSelector(
    (state) => state.statisticsReducer
  );

  const userRef = useRef(false);

  useEffect(() => {
    if (userRef.current === false) {
      dispatch(getSixMonthDataChartThreeDiff());
    }
    return () => {
      userRef.current = true;
    };
  }, [dispatch]);

  return (
    <>
      <Barchart data={sixMonthDataThreeDiff} />
    </>
  );
};

export default Page;
