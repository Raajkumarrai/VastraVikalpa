import React from "react";
import { Card, CardBody, CardFooter, Image } from "@nextui-org/react";
import { Rating } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

export default function EachProduct() {
  return (
    <Card
      shadow="sm"
      isPressable
      // onPress={() => console.log("item pressed")}
      className="!rounded-sm !min-w-[220px] max-w-[380px]"
    >
      <CardBody className="overflow-visible group p-0 relative ">
        <Image
          isZoomed
          radius="none"
          shadow="sm"
          width="100%"
          alt="Jhumka"
          // className="w-full object-cover group-hover:scale-125 h-[140px] "
          className="w-full object-cover h-[140px] "
          src={
            "https://time.com/shopping/static/cd09eba6652ee627f5e53b645dbd36fa/57e17/best-online-jewelry-stores.jpg"
          }
        />
      </CardBody>
      <CardFooter className="text-small justify-between">
        <div className="w-full">
          <div className="text-start font-semibold text-base mt-0">
            Lorem ipsum dolor
          </div>
          <div className="flex items-center gap-2">
            <Rating name="size-small" defaultValue={2} size="small" />
            <span className="text-default-500 mb-1 text-xs font-semibold scale-105">
              (500 reviews)
            </span>
          </div>
          <div className="flex items-center justify-between w-full">
            <div>
              <del className="font-semibold text-red-600">RS 30000</del>
              <span className="font-semibold text-gray-600 text-base">
                {" "}
                25000
              </span>
            </div>
            <ShoppingCartIcon className="!text-base scale-110 text-gray-600" />
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
