import React from "react";
import { Input } from "@nextui-org/react";

const Inputfield = ({ deliveryData, inputvalueChange, errors }) => {
  return (
    <div>
      <div className="flex flex-col gap-5">
        <div className="flex gap-4">
          <Input
            type="text"
            variant="faded"
            name="fName"
            label="Full Name"
            className="rounded-sm"
            size="sm"
            value={deliveryData.fName}
            onChange={inputvalueChange}
            errorMessage={errors?.fName}
          />
          <Input
            type="email"
            variant="faded"
            name="email"
            label="Email"
            className="rounded-sm"
            size="sm"
            value={deliveryData.email}
            onChange={inputvalueChange}
            errorMessage={errors?.email}
          />
        </div>
        <div className="flex gap-4">
          <Input
            type="number"
            variant="faded"
            name="mobileNumber"
            label="Mobile Number"
            className="rounded-sm"
            size="sm"
            value={deliveryData.mobileNumber}
            onChange={inputvalueChange}
            errorMessage={errors?.mobileNumber}
          />
          <Input
            type="text"
            variant="faded"
            name="province"
            label="Delivery Province"
            className="rounded-sm"
            size="sm"
            value={deliveryData.province}
            onChange={inputvalueChange}
            errorMessage={errors?.province}
          />
        </div>
        <div className="flex gap-4">
          <Input
            type="text"
            variant="faded"
            name="city"
            label="Delivery City"
            className="rounded-sm"
            size="sm"
            value={deliveryData.city}
            onChange={inputvalueChange}
            errorMessage={errors?.city}
          />
          <Input
            type="text"
            variant="faded"
            name="area"
            label="Delivery Area"
            className="rounded-sm"
            size="sm"
            value={deliveryData.area}
            onChange={inputvalueChange}
            errorMessage={errors?.area}
          />
        </div>
        <div className="flex gap-4">
          <Input
            type="text"
            variant="faded"
            name="address"
            label="Your Full Address"
            className="rounded-sm"
            size="sm"
            value={deliveryData.address}
            onChange={inputvalueChange}
            errorMessage={errors?.address}
          />
          <Input
            type="text"
            variant="faded"
            name="landmark"
            label="Your Landmark"
            className="rounded-sm"
            size="sm"
            value={deliveryData.landmark}
            onChange={inputvalueChange}
            errorMessage={errors?.landmark}
          />
        </div>
      </div>
    </div>
  );
};

export default Inputfield;
