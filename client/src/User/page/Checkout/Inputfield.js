import React from "react";
import { Input } from "@nextui-org/react";

const Inputfield = ({ deliveryData, inputvalueChange, errors }) => {
  return (
    <div>
      <div className="flex flex-col gap-5">
        <div className="flex gap-4 ">
          <div className="w-full md:w-1/2">
            <Input
              type="text"
              variant="faded"
              name="fName"
              label="Full Name"
              className="rounded-sm"
              size="sm"
              value={deliveryData.fName}
              onChange={inputvalueChange}
            />
            {errors?.fName && (
              <p className="text-xs text-red-500">{errors.fName}</p>
            )}
          </div>
          <div className="w-full md:w-1/2">
            <Input
              type="email"
              variant="faded"
              name="email"
              label="Email"
              className="rounded-sm"
              size="sm"
              value={deliveryData.email}
              onChange={inputvalueChange}
            />
            {errors?.email && (
              <p className="text-xs text-red-500">{errors.email}</p>
            )}
          </div>
        </div>

        <div className="flex gap-4 ">
          <div className="w-full md:w-1/2">
            <Input
              type="number"
              variant="faded"
              name="mobileNumber"
              label="Mobile Number"
              className="rounded-sm"
              size="sm"
              value={deliveryData.mobileNumber}
              onChange={inputvalueChange}
            />
            {errors?.mobileNumber && (
              <p className="text-xs text-red-500">{errors.mobileNumber}</p>
            )}
          </div>
          <div className="w-full md:w-1/2">
            <Input
              type="text"
              variant="faded"
              name="province"
              label="Delivery Province"
              className="rounded-sm"
              size="sm"
              value={deliveryData.province}
              onChange={inputvalueChange}
            />
            {errors?.province && (
              <p className="text-xs text-red-500">{errors.province}</p>
            )}
          </div>
        </div>

        <div className="flex gap-4 ">
          <div className="w-full md:w-1/2">
            <Input
              type="text"
              variant="faded"
              name="city"
              label="Delivery City"
              className="rounded-sm"
              size="sm"
              value={deliveryData.city}
              onChange={inputvalueChange}
            />
            {errors?.city && (
              <p className="text-xs text-red-500">{errors.city}</p>
            )}
          </div>
          <div className="w-full md:w-1/2">
            <Input
              type="text"
              variant="faded"
              name="area"
              label="Delivery Area"
              className="rounded-sm"
              size="sm"
              value={deliveryData.area}
              onChange={inputvalueChange}
            />
            {errors?.area && (
              <p className="text-xs text-red-500">{errors.area}</p>
            )}
          </div>
        </div>

        <div className="flex gap-4 ">
          <div className="w-full md:w-1/2">
            <Input
              type="text"
              variant="faded"
              name="address"
              label="Your Full Address"
              className="rounded-sm"
              size="sm"
              value={deliveryData.address}
              onChange={inputvalueChange}
            />
            {errors?.address && (
              <p className="text-xs text-red-500">{errors.address}</p>
            )}
          </div>
          <div className="w-full md:w-1/2">
            <Input
              type="text"
              variant="faded"
              name="landmark"
              label="Your Landmark"
              className="rounded-sm"
              size="sm"
              value={deliveryData.landmark}
              onChange={inputvalueChange}
            />
            {errors?.landmark && (
              <p className="text-xs text-red-500">{errors.landmark}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Inputfield;
