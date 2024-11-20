import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Chip } from "@nextui-org/react";
function convertToK(amount) {
  if (amount < 1000) {
    return amount.toString();
  } else {
    const kValue = amount / 1000.0;
    return kValue.toFixed(1) + "k";
  }
}
const Final = ({ data }) => {
  const [showType, setShowType] = useState(true);
  return (
    <div className="widget max-w-[350px] min-w-[250px] !w-[300px]">
      <div className="left">
        <span className="title !pb-0 !mb-0">{data.title}</span>
        <span className="counter">
          {data.isMoney && "Rs"}{" "}
          {!showType
            ? convertToK(Number(data.all))
            : convertToK(Number(data.oneMonth))}
          <span className="!text-xs !capitalize ml-1">
            {showType
              ? `Monthly ${data.title.toLowerCase()}`
              : `All ${data.title.toLowerCase()}`}
          </span>
        </span>
        <Link href={data.hrefLink} className="link">
          {data.link}
        </Link>
      </div>
      <div className="right">
        <div className="percentage positive">
          <Chip
            size="sm"
            as={"button"}
            variant="faded"
            color="success"
            className="scale-90"
            onClick={() => setShowType((p) => !p)}
          >
            {!showType ? "See month" : "See all"}
          </Chip>
        </div>
        <div className="w-full flex justify-end">{data.icon}</div>
      </div>
    </div>
  );
};

export default Final;
