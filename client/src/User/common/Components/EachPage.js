import React from "react";
const EachPage = ({ data }) => {
  return (
    <div className="h-[350px] ml-10 w-[450px] relative bg-black">
      <img
        className="position-absolute w-full h-full opacity-80"
        src={data?.image}
        style={{ objectFit: "cover" }}
        alt={data?.title}
      />
    </div>
  );
};

export default EachPage;
