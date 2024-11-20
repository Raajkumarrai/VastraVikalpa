import React, { useEffect, useState } from "react";
// import ThemeSwitcher from "@/app/theme/ThemeSwitcher";
// import ThemeSwitcher from "../../../theme/ThemeSwitcher";
import Message from "../components/Message";
import Profile from "../components/Profile";

const TopNavContent = (props) => {
  const { setHamClick, hamClick, loginData, unreadMsg } = props;
  const [greeting, setGreeting] = useState("");

  useEffect(() => {
    const now = new Date();
    const hours = now.getHours();

    if (hours >= 5 && hours < 12) {
      setGreeting("Good Morning");
    } else if (hours >= 12 && hours < 18) {
      setGreeting("Good Afternoon");
    } else {
      setGreeting("Good Evening");
    }
  }, []);
  return (
    <>
      <div className="h-[55px] uppercase font-semibold dark:text-slate-300 border-b absolute left-0 tracking-wide text-[#5f5296] w-[180px] flex justify-center items-center border-r dark:border-slate-800">
        Dashboard
      </div>
      <div className="w-full  flex justify-between items-center h-full ml-[180px]">
        <div className="flex gap-5 items-center ">
          <div className="h-full  w-[50px] flex justify-center items-center">
            <div
              className="hambar flex justify-center cursor-pointer ml-5 relative  h-[25px] w-[26px] items-start flex-col gap-[.22rem]"
              onClick={() => setHamClick((p) => !p)}
            >
              <div
                className={`  duration-100 rounded-[2px]  bg-[#5f5296] dark:bg-slate-300 ${
                  hamClick
                    ? "w-[25px] h-[.25rem] rotate-45 absolute bottom-3 -left-1"
                    : "w-[27px] h-[.3rem]"
                }`}
              ></div>
              <div
                className={` h-[.3rem] duration-100 rounded-[2px] bg-[#5f5296] dark:bg-slate-300 ${
                  hamClick ? "hidden" : "w-[13px]"
                }`}
              ></div>
              <div
                className={` duration-100 rounded-[2px] bg-[#5f5296] dark:bg-slate-300 ${
                  hamClick
                    ? "w-[25px] h-[.25rem]  -rotate-45 absolute bottom-3 -left-1"
                    : "w-[18px] h-[.3rem] "
                }`}
              ></div>
            </div>
          </div>
          <div className="font-semibold font-poppins ml-10 text-slate-700 tracking-wide dark:text-slate-300">
            Hello Admin, {greeting}
          </div>
        </div>
        <div className="flex justify-center items-center mr-10">
          <div className="mr-4">
            <Message unreadMsg={unreadMsg} />
          </div>
          <Profile loginData={loginData} />
        </div>
      </div>
    </>
  );
};

export default TopNavContent;
