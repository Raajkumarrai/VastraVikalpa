import React from "react";
import EachSiteDescription from "./EachSiteDescription";
import EachSiteImages from "./EachSiteImages";

const EachSiteContent = ({ data }) => {
  return (
    <div className="grid px-2 h-[470px] grid-cols-12 gap-5">
      <div className="col-span-5 h-full">
        <EachSiteImages data={data?.image ? data?.image : []} />
      </div>
      <div className="col-span-7 h-full">
        <EachSiteDescription data={data} />
      </div>
    </div>
  );
};

export default EachSiteContent;
