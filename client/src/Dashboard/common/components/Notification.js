import React from "react";
import NotificationsIcon from "@mui/icons-material/Notifications";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  Button,
  Badge,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";

export default function Notification() {
  const router = useRouter();
  return (
    <>
      <Popover placement="bottom" showArrow={true} className="!rounded-[3px]">
        <PopoverTrigger>
          <Button
            radius="sm"
            as="button"
            isIconOnly
            aria-label="more than 99 notifications"
            variant="light"
          >
            <Badge
              color="danger"
              content={50}
              shape="circle"
              className="text-xs h-[20px] pb-[2px] w-[20px]"
            >
              <NotificationsIcon className="cursor-pointer text-slate-600 dark:text-slate-200" />
            </Badge>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="!rounded-[3px] !px-0">
          <div
            className=" py-2 hover:bg-[#e2dcff] dark:hover:bg-[#2d2a3d] w-full px-4 select-none cursor-pointer"
            onClick={() => router.push("/dashboard/notification")}
          >
            <div className="text-small font-bold">Popover Content</div>
            <div className="text-tiny">This is the popover content</div>
          </div>
          <div
            className=" py-2 hover:bg-[#e2dcff] dark:hover:bg-[#2d2a3d] w-full px-4 select-none cursor-pointer"
            onClick={() => router.push("/dashboard/notification")}
          >
            <div className="text-small font-bold">Popover Content</div>
            <div className="text-tiny">This is the popover content</div>
          </div>
          <div
            className=" py-2 hover:bg-[#e2dcff] dark:hover:bg-[#2d2a3d] w-full px-4 select-none cursor-pointer"
            onClick={() => router.push("/dashboard/notification")}
          >
            <div className="text-small font-bold">Popover Content</div>
            <div className="text-tiny">This is the popover content</div>
          </div>
        </PopoverContent>
      </Popover>
    </>
  );
}
