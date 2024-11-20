import React from "react";
import { BsCheckLg } from "react-icons/bs";
import { MdDeliveryDining, MdOutlineAssignmentReturn } from "react-icons/md";
import PhoneIcon from "@mui/icons-material/Phone";
import { Card } from "@nextui-org/react";

const Reatured = () => {
  return (
    <div className=" border-slate-400 my-10">
      <div className="row gap-1 grid-containerCard ">
        <Card
          isPressable
          className="select-none  font-poppins text-sm cursor-default flex gap-2 items-center bg-slate-100 py-7 rounded-sm shadow-md hover:shadow-lg transition duration-200"
        >
          <MdDeliveryDining className="text-3xl" />
          <h5 className="font-semibold m-0 tracking-wide">Free Shipping</h5>
        </Card>
        <Card
          isPressable
          className="select-none  font-poppins text-sm cursor-default flex gap-2 items-center bg-slate-100 py-7 rounded-sm shadow-md hover:shadow-lg transition duration-200"
        >
          <BsCheckLg className="text-3xl" />
          <h5 className="font-semibold m-0 tracking-wide">Quality Product</h5>
        </Card>
        <Card
          isPressable
          className="select-none  font-poppins text-sm cursor-default flex gap-2 items-center bg-slate-100 py-7 rounded-sm shadow-md hover:shadow-lg transition duration-200"
        >
          <MdOutlineAssignmentReturn className="text-3xl transform scale-90" />
          <h5 className="font-semibold m-0 tracking-wide">14-Day Return</h5>
        </Card>
        <Card
          isPressable
          className="select-none  font-poppins text-sm cursor-default flex gap-2 items-center bg-slate-100 py-7 rounded-sm shadow-md hover:shadow-lg transition duration-200"
        >
          <PhoneIcon className="text-3xl transform scale-90 -rotate-6" />
          <h5 className="font-semibold m-0 tracking-wide">24/7 Support</h5>
        </Card>
      </div>
    </div>
  );
};

export default Reatured;
