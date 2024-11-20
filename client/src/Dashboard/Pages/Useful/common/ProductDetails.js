import React from "react";

import { Popover, PopoverTrigger, PopoverContent } from "@nextui-org/react";
import ProductCard from "./ProductCard";
import { Chip } from "@nextui-org/react";

export default function ProductDetails({ data }) {
  return (
    <Popover placement="bottom" showArrow={true}>
      <PopoverTrigger>
        <Chip
          className="!bg-blue-500 !text-xs tracking-wide text-white"
          as="button"
        >
          Product details
        </Chip>
      </PopoverTrigger>
      <PopoverContent className="!m-0 !p-1 !rounded-sm">
        <ProductCard data={data} />
      </PopoverContent>
    </Popover>
  );
}
