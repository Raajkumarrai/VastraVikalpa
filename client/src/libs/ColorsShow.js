import React, { useEffect } from "react";

const ColorsShow = ({ productColor, pColor, setPColor }) => {
  const colorchange = (data) => {
    setPColor(pColor.includes(data) ? "" : data);
  };
  useEffect(() => {
    if (pColor === "") {
      setPColor(productColor[0]);
    }
  }, [productColor, pColor, setPColor]);
  return (
    <div className="ml-2">
      <div className="px-2 h-full w-full flex gap-3 -mb-[1px] pb-1 items-center">
        <div
          onClick={() => colorchange("black")}
          className={`${productColor.includes("black") ? "block" : "hidden"}
          ${pColor?.toLocaleLowerCase() === "black" && "scale-125"}
          
          h-[20px] border border-black/15  cursor-pointer hover:scale-105 w-[20px] bg-black shadow rounded-full`}
        ></div>
        <div
          onClick={() => colorchange("white")}
          className={`${productColor.includes("white") ? "block" : "hidden"}
          ${pColor?.toLocaleLowerCase() === "white" && "scale-125"}
          
          h-[20px] border border-black/15 cursor-pointer hover:scale-105 w-[20px] bg-white shadow rounded-full`}
        ></div>
        <div
          onClick={() => colorchange("red")}
          className={`${productColor.includes("red") ? "block" : "hidden"}
          ${pColor?.toLocaleLowerCase() === "red" && "scale-125"}
          
          h-[20px] border border-black/15 cursor-pointer hover:scale-105 w-[20px] bg-red-500 shadow rounded-full`}
        ></div>
        <div
          onClick={() => colorchange("blue")}
          className={`${productColor.includes("blue") ? "block" : "hidden"}
          ${pColor?.toLocaleLowerCase() === "blue" && "scale-125"}
          
          h-[20px] border border-black/15 cursor-pointer hover:scale-105 w-[20px] bg-blue-500 shadow rounded-full`}
        ></div>
        <div
          onClick={() => colorchange("green")}
          className={`${productColor.includes("green") ? "block" : "hidden"}
          ${pColor?.toLocaleLowerCase() === "green" && "scale-125"}
          
          h-[20px] border border-black/15 cursor-pointer hover:scale-105 w-[20px] bg-green-500 shadow rounded-full`}
        ></div>
        <div
          onClick={() => colorchange("pink")}
          className={`${productColor.includes("pink") ? "block" : "hidden"}
          ${pColor?.toLocaleLowerCase() === "pink" && "scale-125"}
          
          h-[20px] border border-black/15 cursor-pointer hover:scale-105 w-[20px] bg-pink-500 shadow rounded-full`}
        ></div>
        <div
          onClick={() => colorchange("gray")}
          className={`${productColor.includes("gray") ? "block" : "hidden"}
          ${pColor?.toLocaleLowerCase() === "gray" && "scale-125"}
          
          h-[20px] border border-black/15 cursor-pointer hover:scale-105 w-[20px] bg-gray-500 shadow rounded-full`}
        ></div>
        <div
          onClick={() => colorchange("other")}
          className={`${productColor.includes("other") ? "block" : "hidden"}
          ${pColor?.toLocaleLowerCase() === "other" && "scale-125"}
          
          h-[20px] border cursor-pointer scale-105 hover:scale-110 w-[20px] rounded-full overflow-hidden flex-wrap flex`}
        >
          <div className="h-1/2 bg-red-500 w-1/2 rounded-tl-sm"></div>
          <div className="h-1/2 bg-black w-1/2 rounded-tr-sm"></div>
          <div className="h-1/2 bg-yellow-500 w-1/2 rounded-bl-sm"></div>
          <div className="h-1/2 bg-blue-500 w-1/2 rounded-br-sm"></div>
        </div>
      </div>
    </div>
  );
};

export default ColorsShow;
