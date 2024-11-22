import React, { useState } from "react";
import { Button, Card, Checkbox } from "@nextui-org/react";
import Breadcrumb from "../../../Dashboard/common/Navigation/BredCrumb";
import { PiShoppingCartFill } from "react-icons/pi";
import formatRS from "../../../libs/FormatRS";
import Inputfield from "./Inputfield";
import { IoMdPin } from "react-icons/io";
import { FaArrowLeftLong } from "react-icons/fa6";

const UserData = ({
  deliveryData,
  inputvalueChange,
  errors,
  summaryData,
  subtotal,
  shipping,
  placeOrderBtnclk,
  oneUserAddress,
  showAddress,
  setShowAddress,
}) => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("E-Sewa");

  const handlePlaceOrder = () => {
    if (selectedPaymentMethod === "E-Sewa") {
      placeOrderBtnclk("esewa");
    } else if (selectedPaymentMethod === "Cash on Delivery") {
      placeOrderBtnclk("COD");
    }
  };

  return (
    <div>
      <div className="px-5 min-h-[70vh]">
        <div className="-mb-3 mt-7 text-black/80 capitalize font-semibold font-poppins text-3xl">
          Checkout Products
        </div>
        <div className="flex my-5 justify-between items-center">
          <Breadcrumb category={"services"} categoryLink={"services"} />
        </div>
        <div className="grid gap-8 px-2 grid-cols-12">
          <div className="col-span-7 flex flex-col gap-4">
            <Card shadow="sm" className="p-7 font-poppins rounded">
              <div className="flex justify-between items-center pb-2">
                <h3 className="text-xl mb-5 flex gap-1 items-center text-blue-700 font-semibold">
                  <IoMdPin /> Billing Address
                </h3>
                {oneUserAddress?.fName && !showAddress && (
                  <div
                    onClick={() => setShowAddress(true)}
                    className="flex select-none shadow px-5 p-1.5 text-sm border rounded-full items-center gap-1 hover:bg-blue-700 hover:text-white text-blue-700 cursor-pointer duration-150"
                  >
                    <FaArrowLeftLong /> Use old address.
                  </div>
                )}
              </div>
              <div>
                {showAddress ? (
                  <div className="md:flex">
                    <div className="p-5 -mt-3">
                      <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
                        Address Summary
                      </div>
                      <p className="mt-2 text-gray-500 text-sm">
                        Full Name: {oneUserAddress?.fName}
                      </p>
                      <p className="text-gray-500 text-sm">
                        Mobile Number: {oneUserAddress?.mobileNumber}
                      </p>
                      <p className="text-gray-500 text-sm">
                        Email: {oneUserAddress?.email}
                      </p>
                      <p className="text-gray-500 text-sm">
                        Area: {oneUserAddress?.area}
                      </p>
                      <p className="text-gray-500 text-sm">
                        Landmark: {oneUserAddress?.landmark}
                      </p>
                      <p className="text-gray-500 text-sm">
                        City: {oneUserAddress?.city}
                      </p>
                      <p className="text-gray-500 text-sm">
                        Province: {oneUserAddress?.province}
                      </p>
                    </div>
                  </div>
                ) : (
                  <Inputfield
                    deliveryData={deliveryData}
                    inputvalueChange={inputvalueChange}
                    errors={errors}
                  />
                )}
              </div>
            </Card>
            {showAddress && (
              <div
                onClick={() => setShowAddress(false)}
                className="w-full flex justify-center items-center py-2 gap-2 cursor-pointer hover:bg-blue-500 hover:text-white duration-200 border shadow rounded"
              >
                <div className="text-xl mb-1 font-semibold">+</div>
                <div>Add New Address</div>
              </div>
            )}
          </div>
          <div className="col-span-5 font-poppins h-full">
            <Card shadow="sm" className="px-7 py-5 rounded">
              <h3 className="text-xl text-black/80 font-semibold mb-1">
                CART SUMMARY
              </h3>
              <div className="flex flex-col gap-1 mt-4">
                {summaryData.map((e, index) => (
                  <div
                    key={index}
                    className="text-sm flex justify-between text-black/80"
                  >
                    <div className="capitalize line-clamp-1">
                      {e.productName}
                    </div>
                    <div>{formatRS(e.price)}</div>
                  </div>
                ))}
                <div className="text-sm flex border-dashed justify-between border-t py-3 border-black/15 mt-3 text-black/80">
                  <div className="flex flex-col w-full gap-2">
                    <div className="flex justify-between w-full items-center">
                      <div className="uppercase text-black font-poppins">
                        Sub-Total:
                      </div>
                      <div className="text-black font-semibold text-base">
                        {formatRS(subtotal)}
                      </div>
                    </div>
                    <div className="text-sm flex justify-between text-black">
                      <div>Delivery Charge:</div>
                      <div>{formatRS(subtotal === 0 ? 0 : shipping)}</div>
                    </div>
                  </div>
                </div>
                <div className="text-sm flex border-dashed justify-between border-y py-3 border-black/15 mt-1 my-2 text-black">
                  <div className="uppercase font-semibold">Total:</div>
                  <div className="font-semibold text-base">
                    {formatRS(subtotal + (subtotal === 0 ? 0 : shipping))}
                  </div>
                </div>
              </div>
              <div className="my-2">
                <h2 className="capitalize font-semibold text-slate-700 tracking-wide mb-2">
                  Payment method
                </h2>
                <div className="flex px-2 gap-2 flex-col">
                  <Checkbox
                    size="sm"
                    isSelected={selectedPaymentMethod === "E-Sewa"}
                    onChange={() => setSelectedPaymentMethod("E-Sewa")}
                  >
                    E-Sewa
                  </Checkbox>
                  <Checkbox
                    size="sm"
                    isSelected={selectedPaymentMethod === "Cash on Delivery"}
                    onChange={() =>
                      setSelectedPaymentMethod("Cash on Delivery")
                    }
                  >
                    Cash on Delivery
                  </Checkbox>
                </div>
              </div>
              <Button
                className="w-full mt-4 !rounded-sm"
                color="primary"
                endContent={
                  <PiShoppingCartFill className="scale-110 text-base mb-[2px]" />
                }
                onClick={handlePlaceOrder}
                isDisabled={subtotal + (subtotal === 0 ? 0 : shipping) <= 0}
              >
                Place Order
              </Button>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserData;
