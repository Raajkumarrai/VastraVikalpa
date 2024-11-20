import React, { useState } from "react";
import TopNav from "../Navigation/TopNav";
import Footer from "../Navigation/Footer";

const PageContent = (props) => {
  const { children } = props;
  const [hamClick, setHamClick] = useState(false);

  return (
    <>
      <div className="relative w-full h-screen">
        <TopNav setHamClick={setHamClick} hamClick={hamClick} />
        <div
          className={`overscroll-auto absolute inset-0  top-[55px] p-5 duration-100 ${
            !hamClick ? "left-[180px]" : "left-[50px]"
          } `}
        >
          <div className="w-full h-full">{children}</div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default PageContent;
