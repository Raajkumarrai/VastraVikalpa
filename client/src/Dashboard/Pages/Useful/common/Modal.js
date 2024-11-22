import React, { useState, useEffect } from "react";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import FindGender from "../../../../libs/FindGender";
import FormatRS from "../../../../libs/FormatRS";

import UserDetails from "./UserDetails";
import ProductDetails from "./ProductDetails";
import { Link } from "react-router-dom";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

export default function ModalFun(props) {
  const { btnRef, viewDetal, PageFrom, handelUpdate, PageType } = props;
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  function dateConverter(isoDate) {
    const date = new Date(isoDate);
    return date.toLocaleString();
  }
  const updateData = (data) => {
    handelUpdate(data);
  };

  const [productOne, setProductOne] = useState({});
  const [productNumber, setProdutNumber] = useState(1);
  useEffect(() => {
    if (viewDetal.products && viewDetal.products.length > 0) {
      const { productId, quantity } = viewDetal.products[0];
      const productObject = { productId, quantity };
      setProductOne(productObject);
    }
  }, [viewDetal]);
  const productVisibleclk = (data, ind) => {
    setProductOne(data);
    setProdutNumber(ind);
  };

  return (
    <>
      <Button onPress={onOpen} ref={btnRef} className="hidden">
        Open Modal
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size={"3xl"}>
        <ModalContent className="!w-[900px] !rounded-sm">
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col capitalize gap-1 py-0 pt-3">
                Order From {viewDetal.userId.name}
              </ModalHeader>
              <ModalBody className="!flex !gap-5 !flex-row -mt-2">
                <div className="flex w-full pt-1 relative !text-sm ">
                  <div className="w-1/2">
                    <div className="flex gap-3 mt-2 mb-1 items-center">
                      <div className="flex gap-1">
                        <span className="capitalize">Name:</span>
                        <span className="capitalize">
                          {viewDetal.userId?.name}
                        </span>
                      </div>
                      <div>
                        <UserDetails
                          data={{ ...viewDetal.userId, ...viewDetal.detailId }}
                        />
                      </div>
                    </div>
                    <div className="flex gap-1">
                      <span className="capitalize">Email:</span>
                      <span className="capitalize">
                        {viewDetal.userId?.email}
                      </span>
                    </div>
                    <div className="flex gap-1">
                      <span className="capitalize">Address:</span>
                      <span className="capitalize">
                        {viewDetal.detailId?.address}
                      </span>
                    </div>
                    <div className="flex gap-1">
                      <span className="capitalize">City:</span>
                      <span className="capitalize">
                        {viewDetal.detailId?.city}
                      </span>
                    </div>
                    <div className="flex gap-1">
                      <span className="capitalize">Area:</span>
                      <span className="capitalize">
                        {viewDetal.detailId?.area}
                      </span>
                    </div>
                    <div className="flex gap-1">
                      <span className="capitalize">Landmark:</span>
                      <span className="capitalize">
                        {viewDetal.detailId?.landmark}
                      </span>
                    </div>
                    <div className="flex gap-1">
                      <span className="capitalize">Mobile Number:</span>
                      <span className="capitalize">
                        {viewDetal.detailId?.mobileNumber}
                      </span>
                    </div>
                    <div className="flex gap-1">
                      <span className="capitalize">Order Variation:</span>
                      <span className="capitalize">
                        {viewDetal?.products?.length || 1}
                      </span>
                    </div>
                    {PageType ? (
                      <Link
                        className="text-blue-600"
                        size="sm"
                        to={`/dashboard/profile/${viewDetal.userId._id}`}
                      >
                        Visit user for more detail
                      </Link>
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="w-[0.01rem] h-full top-0 mx-2 bg-slate-300"></div>
                  <div className="w-1/2">
                    <div className="w-full h-[20px] flex gap-1 mb-3">
                      {viewDetal.products.map((e, index) => {
                        return (
                          <div
                            onClick={() =>
                              productVisibleclk(
                                {
                                  productId: e.productId,
                                  quantity: e.quantity,
                                },
                                index + 1
                              )
                            }
                            key={index}
                            className={`rounded-full shadow border px-3 cursor-pointer ${productNumber === index + 1 && "bg-blue-600 text-white"} hover:bg-blue-700 hover:text-white duration-150 pb-[1px]`}
                          >
                            P{index + 1}
                          </div>
                        );
                      })}
                    </div>
                    <div className="flex gap-3 justify-between mt-2 mb-1 items-center">
                      <div className="flex gap-1">
                        <span className="capitalize font-semibold">Name:</span>
                        <div className="capitalize line-clamp-1">
                          {productOne?.productId?.title}
                        </div>
                      </div>

                      <div>
                        <ProductDetails data={productOne} />
                      </div>
                    </div>

                    <div className="text-justify flex">
                      <span className="capitalize mr-1 font-semibold">
                        Description:
                      </span>
                      <div className="capitalize !text-justify line-clamp-1">
                        <div
                          categoryName="line-clamp-1"
                          dangerouslySetInnerHTML={{
                            __html: productOne?.productId?.description?.slice(
                              0,
                              50
                            ),
                          }}
                        />
                      </div>
                    </div>
                    <div className="w-full flex gap-5">
                      <div className="flex gap-1 w-[40%]">
                        <span className="capitalize">Category:</span>
                        <span className="capitalize">
                          {productOne?.productId?.categoryName}
                        </span>
                      </div>
                      <div className="flex gap-1">
                        <span className="capitalize">Gender Type:</span>
                        <span className="capitalize">
                          {FindGender(productOne?.productId?.gendertype)}
                        </span>
                      </div>
                    </div>
                    <div className="w-full flex gap-5">
                      <div className="flex gap-1 w-[40%]">
                        <span className="capitalize">Order Quantity:</span>
                        <span className="capitalize">
                          {productOne?.quantity}
                        </span>
                      </div>
                      <div className="flex gap-1 w-[40%]">
                        <span className="capitalize">Price:</span>
                        <span className="capitalize">
                          {FormatRS(productOne?.productId?.price)}
                        </span>
                      </div>
                    </div>
                    <div className="w-full flex gap-5">
                      <div className="flex gap-1 w-[40%]">
                        <span className="capitalize">Discount:</span>
                        <span className="capitalize">
                          {productOne?.productId?.discount}%
                        </span>
                      </div>

                      <div className="flex gap-1 w-[40%]">
                        <span className="capitalize">Total Price:</span>
                        <span className="capitalize">
                          {productOne?.productId?.price * productOne?.quantity -
                            (productOne?.productId?.price *
                              productOne?.quantity *
                              productOne?.productId?.discount) /
                              100}
                        </span>
                      </div>
                    </div>
                    <div className="w-full flex gap-5">
                      <div className="flex gap-1 w-[40%]">
                        <span className="capitalize">Available Quantity:</span>
                        <span className="capitalize">
                          {productOne?.productId?.maxQuantity}
                        </span>
                      </div>
                      <div className="flex gap-1">
                        <span className="capitalize">Colors:</span>
                        <span className="capitalize line-clamp-1">
                          {productOne?.productId?.productcolor?.map(
                            (color, index) => (
                              <span key={index}>{color + ", "}</span>
                            )
                          )}
                        </span>
                      </div>
                    </div>
                    {/* {PageType ? (
                      <Link
                        className="text-blue-600"
                        size="sm"
                        to={`/dashboard/user/${productOne.productId?._id}`}
                      >
                        Visit product for more detail
                      </Link>
                    ) : (
                      ""
                    )} */}
                  </div>
                </div>
              </ModalBody>
              <div className="w-full h-[0.01rem] bg-slate-200 mt-1 -mb-1"></div>
              <ModalFooter className="flex justify-between items-center ">
                <span className="capitalize text-sm">
                  Order Date: {dateConverter(viewDetal.date)}
                </span>
                <div className="flex gap-5">
                  <Button
                    color="danger"
                    variant="ghost"
                    className="rounded-sm !uppercase !tracking-wide"
                    size="sm"
                    onPress={onClose}
                  >
                    Close
                  </Button>
                  {PageType ? (
                    <>
                      {PageFrom.toLowerCase() === "order" ? (
                        <>
                          <Button
                            color="success"
                            variant="solid"
                            className="rounded-sm !uppercase !tracking-wide"
                            size="sm"
                            onPress={onClose}
                            endContent={
                              <ArrowForwardIcon className="text-sm -ml-[.4rem] mt-[2px]" />
                            }
                            onClick={() =>
                              updateData({ successRate: 1, id: viewDetal._id })
                            }
                          >
                            Deliver
                          </Button>
                        </>
                      ) : PageFrom.toLowerCase() === "delivery" ? (
                        <>
                          <Button
                            color="warning"
                            variant="ghost"
                            className="rounded-sm !uppercase !tracking-wide"
                            size="sm"
                            onPress={onClose}
                            startContent={
                              <ArrowForwardIcon className="text-sm -mr-[.4rem] rotate-180 mt-[2px]" />
                            }
                            onClick={() =>
                              updateData({ successRate: 0, id: viewDetal._id })
                            }
                          >
                            Back to Order
                          </Button>
                          <Button
                            color="success"
                            variant="solid"
                            className="rounded-sm !uppercase !tracking-wide"
                            size="sm"
                            onPress={onClose}
                            endContent={
                              <ArrowForwardIcon className="text-sm -ml-[.4rem] mt-[2px]" />
                            }
                            onClick={() =>
                              updateData({ successRate: 2, id: viewDetal._id })
                            }
                          >
                            Finish
                          </Button>
                        </>
                      ) : (
                        <Button
                          color="warning"
                          variant="ghost"
                          className="rounded-sm !uppercase !tracking-wide"
                          size="sm"
                          onPress={onClose}
                          startContent={
                            <ArrowForwardIcon className="text-sm -mr-[.4rem] rotate-180 mt-[2px]" />
                          }
                          onClick={() =>
                            updateData({ successRate: 1, id: viewDetal._id })
                          }
                        >
                          Back to Deliver
                        </Button>
                      )}
                    </>
                  ) : (
                    <>
                      {Number(viewDetal.orderSuccess) === 0 ? (
                        <>
                          <Button
                            color="success"
                            variant="solid"
                            className="rounded-sm !uppercase !tracking-wide"
                            size="sm"
                            onPress={onClose}
                            endContent={
                              <ArrowForwardIcon className="text-sm -ml-[.4rem] mt-[2px]" />
                            }
                            onClick={() =>
                              updateData({ successRate: 1, id: viewDetal._id })
                            }
                          >
                            Deliver
                          </Button>
                        </>
                      ) : Number(viewDetal.orderSuccess) === 1 ? (
                        <>
                          <Button
                            color="warning"
                            variant="ghost"
                            className="rounded-sm !uppercase !tracking-wide"
                            size="sm"
                            onPress={onClose}
                            startContent={
                              <ArrowForwardIcon className="text-sm -mr-[.4rem] rotate-180 mt-[2px]" />
                            }
                            onClick={() =>
                              updateData({ successRate: 0, id: viewDetal._id })
                            }
                          >
                            Back to Order
                          </Button>
                          <Button
                            color="success"
                            variant="solid"
                            className="rounded-sm !uppercase !tracking-wide"
                            size="sm"
                            onPress={onClose}
                            endContent={
                              <ArrowForwardIcon className="text-sm -ml-[.4rem] mt-[2px]" />
                            }
                            onClick={() =>
                              updateData({ successRate: 2, id: viewDetal._id })
                            }
                          >
                            Finish
                          </Button>
                        </>
                      ) : (
                        <Button
                          color="warning"
                          variant="ghost"
                          className="rounded-sm !uppercase !tracking-wide"
                          size="sm"
                          onPress={onClose}
                          startContent={
                            <ArrowForwardIcon className="text-sm -mr-[.4rem] rotate-180 mt-[2px]" />
                          }
                          onClick={() =>
                            updateData({ successRate: 1, id: viewDetal._id })
                          }
                        >
                          Back to Deliver
                        </Button>
                      )}
                    </>
                  )}
                </div>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
