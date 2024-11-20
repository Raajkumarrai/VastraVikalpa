import React from "react";

import { Popover, PopoverTrigger, PopoverContent } from "@nextui-org/react";
import UserCard from "./UserCard";
import { Chip } from "@nextui-org/react";

export default function UserDetails({ data }) {
  return (
    <Popover placement="bottom" showArrow={true}>
      <PopoverTrigger>
        <Chip
          size="sm"
          className="!bg-blue-500 !text-xs tracking-wide text-white"
          as="button"
        >
          User details
        </Chip>
      </PopoverTrigger>
      <PopoverContent className="!p-0 !m-0">
        <UserCard data={data} />
      </PopoverContent>
    </Popover>
  );
}
