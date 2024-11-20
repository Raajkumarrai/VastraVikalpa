import React, { useEffect, useRef } from "react";
import FilledChart from "./Filledchart";
import { useDispatch, useSelector } from "react-redux";
import { getSixMonthDataChart } from "../../../../redux/slices/statisticsSlice";

const Page = () => {
  const dispatch = useDispatch();

  const { sixMonthData } = useSelector((state) => state.statisticsReducer);

  const userRef = useRef(false);

  useEffect(() => {
    if (userRef.current === false) {
      dispatch(getSixMonthDataChart());
    }
    return () => {
      userRef.current = true;
    };
  }, [dispatch]);
  return (
    <>
      <FilledChart
        title="Last 6 Months (Revenue)"
        aspect={2 / 0.87}
        data={sixMonthData}
      />
    </>
  );
};

export default Page;
