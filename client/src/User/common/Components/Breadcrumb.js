import { Select, SelectItem } from "@nextui-org/react";
import React from "react";
import { Link } from "react-router-dom";

const Breadcrumb = () => {
  return (
    <div className="h-[55px] border mb-4 mt-3 flex px-5 w-full justify-between shadow">
      <div className="h-full w-[60%]">
        <ul className="flex h-full text-slate-600 font-semibold tracking-wide items-center">
          <li>
            <Link href={"/"}>Home</Link>
          </li>
          /
          <li>
            <Link href={"/"}>about-us</Link>
          </li>
          /
          <li>
            <Link href={"/"}>Rings</Link>
          </li>
        </ul>
      </div>
      <div className="w-[30%] pb-1 flex justify-between items-center gap-3">
        <Select
          size="sm"
          variant="underlined"
          label="Select an animal"
          className="max-w-xs"
          radius="sm"
        >
          <SelectItem value="1">Home</SelectItem>
          <SelectItem value="2">About</SelectItem>
          <SelectItem value="3">Contact</SelectItem>
          <SelectItem value="4">Service</SelectItem>
        </Select>
        <Select
          size="sm"
          variant="underlined"
          label="Select an animal"
          className="max-w-xs"
          radius="sm"
        >
          <SelectItem value="1">Home</SelectItem>
          <SelectItem value="2">About</SelectItem>
          <SelectItem value="3">Contact</SelectItem>
          <SelectItem value="4">Service</SelectItem>
        </Select>
      </div>
    </div>
  );
};

export default Breadcrumb;
