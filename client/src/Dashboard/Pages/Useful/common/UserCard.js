import React from "react";

import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Avatar,
} from "@nextui-org/react";

export default function UserCard({ data }) {
  function dateConverter(isoDate) {
    const date = new Date(isoDate);
    return date.toLocaleString();
  }
  return (
    <Card className="max-w-[390px]">
      <CardHeader className="justify-between">
        <div className="flex gap-5">
          <Avatar isBordered radius="full" size="md" src={data.image} />
          <div className="flex flex-col gap-0 items-start justify-center">
            <h4 className="text-base font-semibold leading-none text-default-600">
              {data.name}
            </h4>
            <h5 className="text-small -mt-1 tracking-tight text-default-400">
              {data.email}
            </h5>
          </div>
        </div>
      </CardHeader>
      <CardBody className="px-3 py-0 text-small text-default-400">
        <div>
          <span>Full Name: </span>
          <span className="capitalize">{data.fName}</span>
        </div>
        <div>
          <span className="capitalize">Phone Number: </span>
          <span className="capitalize">{data.mobileNumber}</span>
        </div>
        <div>
          <span className="capitalize">Address: </span>
          <span className="capitalize">{data.area + ", " + data.landmark}</span>
        </div>
      </CardBody>
      <CardFooter className="gap-3">
        <div className="flex gap-1">
          <p className=" text-default-400 text-small">Status: </p>
          <p className="font-semibold text-default-400 text-small">
            {Number(data.privilege) === 2
              ? "Superadmin"
              : Number(data.privilege) === 1
              ? "Admin"
              : "User"}
          </p>
        </div>
        <div className="flex gap-1">
          <p className="text-default-400 text-small">Created At: </p>
          <p className="font-semibold text-default-400 text-small">
            {dateConverter(data.date)}
          </p>
        </div>
      </CardFooter>
    </Card>
  );
}
