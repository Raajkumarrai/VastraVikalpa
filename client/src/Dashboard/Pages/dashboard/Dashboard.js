import React, { useEffect, useRef } from "react";
import Widget from "./widget";
import Featured from "./Feachured";
import Chart from "./Chart";
import "./css/Dashboard.css";
import Table from "../Useful/orders/Page";
import {
  getAllDelivery,
  getAllOrders,
  getAllRevenue,
  getAllUsers,
  getOneMonthDelivery,
  getOneMonthOrders,
  getOneMonthRevenue,
  getOneMonthUsers,
  getSixMonthDataChart,
} from "../../../redux/slices/statisticsSlice";
import { useDispatch, useSelector } from "react-redux";
import { getTarget } from "../../../redux/slices/targetSlice";
const Page = () => {
  const dispatch = useDispatch();
  const {
    allUsers,
    oneMonthUsers,
    allOrders,
    oneMonthOrders,
    allRevenue,
    oneMonthRevenue,
    allDelivery,
    oneMonthDelivery,
    oneWeekRevenue,
    todayRevenue,
    sixMonthData,
  } = useSelector((state) => state.statisticsReducer);
  const { targetData } = useSelector((state) => state.targetReducer);

  const userRef = useRef(false);

  useEffect(() => {
    if (userRef.current === false) {
      dispatch(getAllUsers());
      dispatch(getAllDelivery());
      dispatch(getAllOrders());
      dispatch(getAllRevenue());
      dispatch(getOneMonthDelivery());
      dispatch(getOneMonthUsers());
      dispatch(getOneMonthOrders());
      dispatch(getOneMonthRevenue());
      dispatch(getTarget());
      dispatch(getSixMonthDataChart());
    }
    return () => {
      userRef.current = true;
    };
  }, [dispatch]);

  return (
    <>
      <div className="home">
        <div className="homeContainer">
          <div className="widgets flex flex-wrap">
            <Widget
              type="user"
              dataBack={{ all: allUsers, oneMonth: oneMonthUsers }}
            />
            <Widget
              type="order"
              dataBack={{ all: allOrders, oneMonth: oneMonthOrders }}
            />
            <Widget
              type="delivery"
              dataBack={{ all: allDelivery, oneMonth: oneMonthDelivery }}
            />
            <Widget
              type="earning"
              dataBack={{ all: allRevenue, oneMonth: oneMonthRevenue }}
            />
          </div>
          <div className="charts flex flex-wrap">
            <Featured
              data={{
                all: allRevenue,
                oneMonth: oneMonthRevenue,
                oneWeek: oneWeekRevenue,
                today: todayRevenue,
              }}
              targetData={targetData}
            />
            <Chart
              title="Last 6 Months (Revenue)"
              aspect={2 / 1}
              data={sixMonthData}
            />
          </div>
          <div className="listContainer">
            <div className="listTitle">Latest Transactions</div>
            <Table />
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
