import React from "react";

import { Card, CardBody, CardFooter, Image } from "@nextui-org/react";

export default function ProductCard({ data }) {
  return (
    <Card
      shadow="sm"
      className="!rounded-sm w-[200px]"
      isPressable
      onPress={() => console.log("item pressed")}
    >
      <CardBody className="overflow-visible p-0">
        <Image
          shadow="sm"
          radius="lg"
          width="100%"
          alt="Jhumka"
          className="w-full !rounded-sm object-cover h-[140px]"
          src={data?.productId?.image[0]}
        />
      </CardBody>
      <CardFooter className="text-small justify-between">
        <b className="capitalize">
          {data?.productId.title.length > 15
            ? data?.productId.title.slice(0, 15) + "..."
            : data?.productId.title}
        </b>
        <p className="text-default-500">RS {Number(data.productId.price)}</p>
      </CardFooter>
    </Card>
  );
}
