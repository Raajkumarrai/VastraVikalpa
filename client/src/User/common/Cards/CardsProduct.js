import React from "react";
import { Card, CardFooter, Image, CardBody } from "@nextui-org/react";
import { MdShoppingCart } from "react-icons/md";
import { Link } from "react-router-dom";
import formatRS from "../../../libs/FormatRS";
import URLConverter from "../../../libs/URLConverter";

export default function CardsProduct({ data = {} }) {
  const finalPrice = data?.price - (data?.price * data?.discount) / 100;
  return (
    <Link
      to={`/each/${URLConverter(data?.categoryName || "")}/${data?._id}`}
      className="cursor-pointer hover:scale-[1.02] rounded  duration-100 group"
      id="mainCardLink"
    >
      <Card
        className={` h-[265px] border overflow-hidden shadow relative !rounded`}
        shadow="sm"
      >
        <CardBody className="overflow-visible  p-0">
          <Image
            isZoomed={false}
            shadow="sm"
            radius="none"
            width={300}
            height={190}
            alt={"Image not available."}
            className={`w-full absolute ${data?.image?.length > 1 && "mainImage1"}  object-cover !h-[190px] image-transition`}
            src={data?.image[1] ? data?.image[1] : data?.image[0]}
            style={{ height: "190px" }}
          />
          {data?.image?.length > 1 && (
            <Image
              isZoomed={false}
              shadow="sm"
              radius="none"
              width={300}
              height={190}
              alt={"Image not available."}
              className={`w-full absolute   mainImage2 object-cover !h-[190px] image-transition`}
              style={{ height: "190px" }}
              src={data?.image?.length > 1 && data?.image[0]}
            />
          )}
        </CardBody>
        <CardFooter className="!rounded-none group-hover:bg-blue-50 duration-200 shadow-inner text-small h-[75px] absolute z-20 bg-white text-black/90 bottom-0 justify-between">
          <div className="flex mt-1 flex-col">
            <h2 className="font-poppins font-semibold line-clamp-1">
              {data?.title?.slice(0, 1).toUpperCase() + data?.title?.slice(1)}
            </h2>
            <div className="flex flex-col">
              <p className=" text-red-500 font-semibold font-poppins">
                {formatRS(finalPrice)}
              </p>
              <div className="flex gap-3 -mt-[3px]">
                <p className="text-black/80 line-through text-[11px] font-poppins">
                  {formatRS(data?.price)}
                </p>
                <p className="text-black/80 text-[11px] font-poppins">
                  {`-${data?.discount}%`}
                </p>
              </div>
            </div>
          </div>
          <MdShoppingCart className="text-xl bottom-3 absolute right-2 text-black/80" />
        </CardFooter>
      </Card>
    </Link>
  );
}
