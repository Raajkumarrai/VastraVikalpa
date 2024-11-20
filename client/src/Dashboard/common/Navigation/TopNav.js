import React, { useEffect, useRef, useState } from "react";
import SideNav from "./SideNav";
import TopNavContent from "./TopNavContent";
import { useDispatch, useSelector } from "react-redux";
import { getUnreadMsg } from "../../../redux/slices/messageSlice";
import { useLocation, useNavigate } from "react-router-dom";

const TopNav = (props) => {
  const [userData, setUserData] = useState({ isLogin: true, data: {} });
  useEffect(() => {
    if (localStorage.getItem("data")) {
      setUserData({
        isLogin: true,
        data: JSON.parse(localStorage.getItem("data")),
      });
    } else {
      setUserData({
        isLogin: false,
        data: {},
      });
    }
    // eslint-disable-next-line
  }, [localStorage.getItem("data")]);
  const naviga = useNavigate();
  useEffect(() => {
    if (!userData.isLogin) {
      naviga("/");
    }
    if (Number(userData?.data?.privilege) < 1) {
      naviga("/");
    }
  }, [naviga, userData]);
  const pathname = useLocation().pathname;
  const isDashboard = pathname.includes("dashboard");
  const { hamClick, setHamClick } = props;
  const dispatch = useDispatch();
  const { unreadMsg } = useSelector((state) => state.messageReducer);
  const userRef = useRef(false);
  useEffect(() => {
    if (userRef.current === false) {
      dispatch(getUnreadMsg());
    }
    return () => {
      userRef.current = true;
    };
  }, [dispatch]);

  return isDashboard ? (
    <nav className="w-full overflow-auto h-[55px] ">
      <div className="w-full h-[55px] flex shadow dark:shadow-slate-600 bg-white dark:bg-[#121212] z-50 fixed top-0 left-0 right-0">
        <TopNavContent
          loginData={userData.data}
          setHamClick={setHamClick}
          hamClick={hamClick}
          unreadMsg={unreadMsg}
        />
      </div>
      <SideNav hamClick={hamClick} />
    </nav>
  ) : null;
};

export default TopNav;
