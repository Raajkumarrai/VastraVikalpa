import "./css/feachured.css";
import { Chip } from "@nextui-org/react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import Target from "./Target";
import { useEffect, useRef, useState } from "react";

function convertToK(amount) {
  return amount < 1000 ? amount.toString() : (amount / 1000).toFixed(2) + "k";
}

const getPercentage = (collected, targeted) => {
  return Math.round((collected / targeted) * 100);
};

const Featured = ({ data, targetData }) => {
  const btnRef = useRef();
  const [title, setTitle] = useState("daily");
  const [bigShowRevenue, setBigShowRevenue] = useState(0); // Default to 0 instead of 1 for more accurate calculation
  const [bigTargetRevenue, setBigTargetRevenue] = useState(0); // Default to 0

  // Update `bigShowRevenue` and `bigTargetRevenue` whenever data or targetData changes
  useEffect(() => {
    if (data && targetData.length > 0) {
      setBigShowRevenue(data.today || 0); // Handle the case if data.today is undefined or null
      setBigTargetRevenue(targetData[0]?.daily || 0); // Handle the case if targetData[0]?.daily is undefined or null
    }
  }, [data, targetData]);

  const btnclick = (myData, myTarget, title) => {
    setBigShowRevenue(myData || 0); // Make sure to default to 0 if myData is undefined
    setBigTargetRevenue(myTarget || 0); // Default to 0 if myTarget is undefined
    setTitle(title);
  };

  return (
    <>
      <div className="featured min-w-[400px] max-w-[550px]">
        <div className="top">
          <h1
            className="title cursor-pointer"
            onClick={() =>
              btnclick(data.today, targetData[0]?.daily || 0, "daily")
            }
          >
            {title === "daily"
              ? "Total Revenue Daily"
              : "See Total Revenue Daily"}
          </h1>
          <Chip
            size="sm"
            radius="full"
            as="button"
            variant="faded"
            color="success"
            className="!text-xs"
            onClick={() => btnRef.current.click()}
          >
            Add target
          </Chip>
        </div>
        <div className="bottom !shadow-none !my-5">
          <div className="featuredChart">
            <CircularProgressbar
              value={getPercentage(bigShowRevenue, bigTargetRevenue)}
              text={`${getPercentage(bigShowRevenue, bigTargetRevenue)}%`}
              strokeWidth={5}
            />
          </div>
          <p className="title !mt-2">Total revenue made {title}</p>
          <p className="amount !my-2">Rs {convertToK(bigShowRevenue)}</p>
          <p className="desc !mt-2 !mb-3">
            Previous transactions processing. Last payments may not be included.
          </p>
          <div className="summary">
            <div className="item">
              <div className="itemTitle">All Time</div>
              <div className="itemResult positive">
                <div className="resultAmount">
                  Rs {convertToK(data?.all || 0)}
                </div>
              </div>
            </div>
            <div className="item">
              <div
                className="itemTitle cursor-pointer"
                onClick={() =>
                  btnclick(data.oneWeek, targetData[0]?.weekly || 0, "weekly")
                }
              >
                Last Week
              </div>
              <div className="itemResult positive">
                <div className="resultAmount">
                  Rs {convertToK(data?.oneWeek || 0)}
                </div>
              </div>
            </div>
            <div className="item">
              <div
                className="itemTitle cursor-pointer"
                onClick={() =>
                  btnclick(
                    data.oneMonth,
                    targetData[0]?.monthly || 0,
                    "monthly"
                  )
                }
              >
                Last Month
              </div>
              <div className="itemResult positive">
                <div className="resultAmount">
                  Rs {convertToK(data?.oneMonth || 0)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Target btnRef={btnRef} targetDataProp={targetData} />
    </>
  );
};

export default Featured;
