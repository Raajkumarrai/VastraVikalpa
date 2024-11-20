import "./single.css";
import Chart from "./Chart";
import { Image } from "@nextui-org/react";
import TableOrder from "../../Useful/common/(deliveryProduct)/TableOrder";

const Single = ({ userData, orderData, handelUpdate, userTransaction }) => {
  return (
    <div className="single">
      <div className="singleContainer">
        <div className="top">
          <div className="leftContent w-[450px]">
            <h1 className="title">Information</h1>
            <div className="flex gap-5">
              <Image
                src={userData.image}
                height={150}
                width={150}
                alt="user profile"
                className="!rounded-lg !h-[150px] object-cover !min-w-[150px] !shadow-md"
              />

              <div className="details">
                <div className="detailItem">
                  <span className="itemKey">Name:</span>
                  <span className="itemValue capitalize">{userData?.name}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Email:</span>
                  <span className="itemValue capitalize">
                    {userData?.email}
                  </span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Phone:</span>
                  <span className="itemValue capitalize">
                    {userData.detail ? userData.detail.mobileNumber : "-"}
                  </span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Address:</span>
                  <span className="itemValue capitalize">
                    {userData.detail
                      ? userData.detail.area + "," + userData.detail.landmark
                      : "-"}
                  </span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">City:</span>
                  <span className="itemValue capitalize">
                    {userData.detail ? userData.detail.city : "-"}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="right">
            <Chart
              data={userTransaction}
              aspect={3 / 1}
              title="User Spending ( Last 6 Months)"
            />
          </div>
        </div>
        <div className="bottom">
          <h1 className="title">Last Transactions</h1>
          <TableOrder
            PageFrom={"order"}
            orderData={orderData}
            handelUpdate={handelUpdate}
            PageType={false}
          />
        </div>
      </div>
    </div>
  );
};

export default Single;
