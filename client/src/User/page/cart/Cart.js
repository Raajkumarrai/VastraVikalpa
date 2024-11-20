import React from "react";
import TablePage from "./Table";
import { IoBag } from "react-icons/io5";
import Breadcrumb from "../../../Dashboard/common/Navigation/BredCrumb";
import { Button, Card } from "@nextui-org/react";
import formatRS from "../../../libs/FormatRS";

const Cart = ({
  finalTable,
  subtotal,
  shipping,
  navigate,
  setIsOrderNow,
  updateSummary,
  setSummaryData,
}) => {
  const cartBtnclk = () => {
    navigate("/checkout");
    setSummaryData(updateSummary);
    setIsOrderNow(false);
  };

  return (
    <div>
      <div className="px-5 my-5">
        <div className="-mb-3 mt-7 text-black/80 capitalize font-semibold font-poppins text-3xl">
          View Carts Detail
        </div>
        <div className="flex my-5 justify-between items-center">
          <Breadcrumb category={"services"} categoryLink={"services"} />
        </div>
        <div className="grid mt-5 px-2 gap-8 grid-cols-12">
          <div className="col-span-8">
            <TablePage cartData={finalTable} />
          </div>
          <div className="col-span-4 font-poppins h-full  ">
            <Card shadow="sm" className="px-7 py-5 rounded">
              <h3 className="text-xl text-black/80 font-semibold mb-1">
                Order Summary
              </h3>
              <div className="flex flex-col gap-1 mt-4">
                {finalTable.map((e, index) => {
                  return (
                    <div key={index} className="border-b pb-1 mb-1">
                      <div className="text-sm flex justify-between text-black/80">
                        <div className="flex gap-1">
                          <div className="line-clamp-1 md:w-[100px] xl:w-[160px] capitalize">
                            {e?.product?.title}:
                          </div>
                          <div className="text-xs font-poppins font-semibold text-gray-500">
                            (Qty {e?.quantity})
                          </div>
                        </div>
                        <div>{formatRS(e?.product?.price * e?.quantity)}</div>
                      </div>
                      <div className="text-sm flex justify-between text-black/80">
                        <div>Discount:</div>
                        <div>-{e?.product?.discount}%</div>
                      </div>
                    </div>
                  );
                })}
                <div className="text-sm flex flex-col gap-1 border-dashed pt-1 justify-between text-black/80">
                  <div className="w-ful flex justify-between items-center">
                    <div className="font-semibold text-gray-600">Subtotal:</div>
                    <div className="font-semibold text-gray-600">
                      {formatRS(subtotal)}
                    </div>
                  </div>
                  <div className="w-ful flex justify-between items-center">
                    <div>Delivery Charge:</div>
                    <div>+ {formatRS(subtotal === 0 ? 0 : shipping)}</div>
                  </div>
                </div>
                <div className="text-sm flex border-dashed justify-between border-y py-3 border-black/15 mt-3 my-2 text-black/80">
                  <div className="uppercase font-semibold">Total:</div>
                  <div className="text-[#ea580c] font-semibold text-base">
                    {formatRS(subtotal + (subtotal === 0 ? 0 : shipping))}
                  </div>
                </div>
              </div>
              <Button
                className="w-full mt-4 !rounded-sm"
                color="primary"
                endContent={<IoBag className="scale-110 text-base mb-[2px]" />}
                onClick={cartBtnclk}
                isDisabled={finalTable.length <= 0}
              >
                Proceed to checkout ( {finalTable.length} )
              </Button>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
