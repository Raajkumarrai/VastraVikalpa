import React from "react";
import { Card, CardHeader, CardFooter, Image, Button } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import URLConverter from "../../../libs/URLConverter";

export default function CardCollection({ productData }) {
  // console.log(productData);
  const navigate = useNavigate();
  const finalPrice = (price, discount) => {
    return price - Math.round((price * discount) / 100);
  };
  return (
    <div className="max-w-[1600px] gap-2 grid grid-cols-12 grid-rows-2 px-1 my-10">
      <Card
        radius="none"
        className="round-sm col-span-12 bg-black sm:col-span-5 h-[300px] "
      >
        <CardHeader className="absolute z-10 top-1 flex-col !items-start">
          <p className="text-tiny text-white tracking-wider uppercase font-bold">
            Avilable from Now...
          </p>
          <h4 className="text-white capitalize line-clamp-1 font-medium tracking-wide text-large">
            {productData[0]?.title}
          </h4>
        </CardHeader>
        <Image
          radius="none"
          removeWrapper
          isZoomed
          alt="Card background"
          className="z-0 w-full !opacity-60 h-full object-cover"
          src={
            productData[productData.length - 1]?.image[1]
              ? productData[productData.length - 1]?.image[1]
              : productData[productData.length - 1]?.image[0]
          }
        />
        <CardFooter className="absolute bg-black/60 bottom-0 z-10 border-t-1 border-default-600 dark:border-default-100">
          <div className="flex flex-grow gap-2 items-center">
            <div className="flex flex-col">
              <p className="text-white/80 capitalize text-base">
                {productData[0]?.categoryName}
              </p>
              <p className="text-tiny text-white/80">{`Avilable from Rs. ${finalPrice(productData[0]?.price, productData[0]?.discount)}`}</p>
            </div>
          </div>
          <Button
            size="sm"
            className="px-4 py-2 hover:text-white rounded-sm hover:bg-blue-900 text-black bg-blue-300"
            onClick={() =>
              navigate(
                `/each/${URLConverter(productData[0]?.categoryName)}/${productData[0]?._id}`
              )
            }
          >
            View More
          </Button>
        </CardFooter>
      </Card>

      <Card
        radius="none"
        className="round-sm col-span-12 bg-black sm:col-span-4 h-[300px]"
      >
        <CardHeader className="absolute z-10 top-1 flex-col !items-start">
          <p className="text-tiny text-white tracking-wider uppercase font-bold">
            Avilable from Now...
          </p>
          <h4 className="text-white capitalize line-clamp-1 font-medium tracking-wide text-large">
            {productData[1]?.title}
          </h4>
        </CardHeader>
        <Image
          radius="none"
          removeWrapper
          isZoomed
          alt="Card background"
          className="z-0 w-full !opacity-60 h-full object-cover"
          src={
            productData[productData.length - 2]?.image[1]
              ? productData[productData.length - 2]?.image[1]
              : productData[productData.length - 2]?.image[0]
          }
        />
        <CardFooter className="absolute bg-black/60 bottom-0 z-10 border-t-1 border-default-600 dark:border-default-100">
          <div className="flex flex-grow gap-2 items-center">
            <div className="flex flex-col">
              <p className="text-white/80 capitalize line-clamp-1 text-base">
                {productData[1]?.categoryName}
              </p>
              <p className="text-tiny text-white/80">{`Avilable from Rs. ${finalPrice(productData[1]?.price, productData[1]?.discount)}`}</p>
            </div>
          </div>
          <Button
            size="sm"
            className="px-4 py-2 hover:text-white rounded-sm hover:bg-blue-900 text-black bg-blue-300"
            onClick={() =>
              navigate(
                `/each/${URLConverter(productData[1]?.categoryName)}/${productData[1]?._id}`
              )
            }
          >
            View More
          </Button>
        </CardFooter>
      </Card>
      <Card
        radius="none"
        className="round-sm col-span-12 bg-black sm:col-span-3 row-span-2 h-full makegridrow1"
      >
        <CardHeader className="absolute z-10 top-1 flex-col !items-start">
          <p className="text-tiny text-white tracking-wider uppercase font-bold">
            Avilable from Now...
          </p>
          <h4 className="text-white line-clamp-1 capitalize font-medium tracking-wide text-large">
            {productData[2]?.title}
          </h4>
        </CardHeader>
        <Image
          radius="none"
          removeWrapper
          isZoomed
          alt="Card background"
          className="z-0 w-full !opacity-60 h-full object-cover"
          src={
            productData[productData.length - 3]?.image[1]
              ? productData[productData.length - 3]?.image[1]
              : productData[productData.length - 3]?.image[0]
          }
        />
        <CardFooter className="absolute bg-black/60 bottom-0 z-10 border-t-1 border-default-600 dark:border-default-100">
          <div className="flex flex-grow gap-2 items-center">
            <div className="flex flex-col">
              <p className="text-white/80 line-clamp-1 capitalize text-base">
                {productData[2]?.categoryName}
              </p>
              <p className="text-tiny text-white/80">{`Avilable from Rs. ${finalPrice(productData[2]?.price, productData[2]?.discount)}`}</p>
            </div>
          </div>
          <Button
            size="sm"
            className="px-4 py-2 hover:text-white rounded-sm hover:bg-blue-900 text-black bg-blue-300"
            onClick={() =>
              navigate(
                `/each/${URLConverter(productData[2]?.categoryName)}/${productData[2]?._id}`
              )
            }
          >
            View More
          </Button>
        </CardFooter>
      </Card>
      <Card
        radius="none"
        className="w-full rounded-sm bg-black h-[300px] col-span-12 sm:col-span-4"
      >
        <CardHeader className="absolute z-10 top-1 flex-col !items-start">
          <p className="text-tiny text-white tracking-wider uppercase font-bold">
            Avilable from Now...
          </p>
          <h4 className="text-white font-medium line-clamp-1 capitalize tracking-wide text-large">
            {productData[3]?.title}
          </h4>
        </CardHeader>
        <Image
          radius="none"
          removeWrapper
          isZoomed
          alt="Relaxing app background"
          className="z-0 w-full !opacity-60 h-full object-cover"
          src={
            productData[productData.length - 4]?.image[1]
              ? productData[productData.length - 4]?.image[1]
              : productData[productData.length - 4]?.image[0]
          }
        />
        <CardFooter className="absolute bg-black/60 bottom-0 z-10 border-t-1 border-default-600 dark:border-default-100">
          <div className="flex flex-grow gap-2 items-center">
            <div className="flex flex-col">
              <p className="text-white/80 line-clamp-1 capitalize text-base">
                {productData[3]?.categoryName}
              </p>
              <p className="text-tiny text-white/80">{`Avilable from Rs. ${finalPrice(productData[3]?.price, productData[3]?.discount)}`}</p>
            </div>
          </div>
          <Button
            size="sm"
            className="px-4 py-2 hover:text-white rounded-sm hover:bg-blue-900 text-black bg-blue-300"
            onClick={() =>
              navigate(
                `/each/${URLConverter(productData[3]?.categoryName)}/${productData[3]?._id}`
              )
            }
          >
            View More
          </Button>
        </CardFooter>
      </Card>
      <Card
        radius="none"
        className="w-full rounded-sm h-[300px] bg-black col-span-12 sm:col-span-5"
      >
        <CardHeader className="absolute z-10 top-1 flex-col !items-start">
          <p className="text-tiny text-white tracking-wider uppercase font-bold">
            Avilable from Now...
          </p>
          <h4 className="text-white line-clamp-1 capitalize font-medium tracking-wide text-large">
            {productData[4]?.title}
          </h4>
        </CardHeader>
        <Image
          radius="none"
          removeWrapper
          isZoomed
          alt="Relaxing app background"
          className="z-0 w-full h-full !opacity-60 object-cover"
          src={
            productData[productData.length - 5]?.image[1]
              ? productData[productData.length - 5]?.image[1]
              : productData[productData.length - 5]?.image[0]
          }
        />
        <CardFooter className="absolute bg-black/60 bottom-0 z-10 border-t-1 border-default-600 dark:border-default-100">
          <div className="flex flex-grow gap-2 items-center">
            <div className="flex flex-col">
              <p className="text-white/80 line-clamp-1 capitalize text-base">
                {productData[4]?.categoryName}
              </p>
              <p className="text-tiny text-white/80">{`Avilable from Rs. ${finalPrice(productData[4]?.price, productData[4]?.discount)}`}</p>
            </div>
          </div>
          <Button
            size="sm"
            className="px-4 py-2 hover:text-white rounded-sm hover:bg-blue-900 text-black bg-blue-300"
            onClick={() =>
              navigate(
                `/each/${URLConverter(productData[4]?.categoryName)}/${productData[4]?._id}`
              )
            }
          >
            View More
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
