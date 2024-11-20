import React from "react";

import {
  Modal,
  ModalContent,
  ModalBody,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import EachUserCard from "./EachUserCard";
import { Chip } from "@nextui-org/react";
import { CheckboxIcon } from "@nextui-org/react";
import { Link } from "react-router-dom";

export default function UserModal(props) {
  const { data, btnRef } = props;
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  function dateConverter(isoDate) {
    const date = new Date(isoDate);
    return date.toLocaleString();
  }

  return (
    <>
      <Button onPress={onOpen} ref={btnRef} className="hidden">
        Open Modal
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size={"sm"}>
        <ModalContent className="!w-[900px] !rounded-sm">
          {(onClose) => (
            <>
              <ModalBody className="!flex !gap-1 !flex-col -mt-2">
                <div className="pt-3 flex items-center !gap-3">
                  <EachUserCard data={data} />
                  <Chip
                    startContent={<CheckboxIcon size={18} />}
                    variant="faded"
                    color={Number(data.privilege) > 0 ? "success" : "default"}
                    className="ml-3"
                  >
                    {Number(data.privilege) === 2
                      ? "Superadmin"
                      : Number(data.privilege) === 1
                        ? "Admin"
                        : "User"}
                  </Chip>
                </div>
                <div className="flex !gap-0 mb-2 flex-col text-sm">
                  <div className="mt-1">Name: {data.name}</div>
                  <div className="mt-1">Email: {data.email}</div>
                  <div className="mt-1">
                    Address: {data.address ? data.address : "-"}
                  </div>
                  <div className="mt-1">
                    Mobile Number: {data.phNumber ? data.phNumber : "-"}
                  </div>
                  <div className="mt-1">
                    Create At: {dateConverter(data.date)}
                  </div>
                  <Link
                    to={`/dashboard/profile/${data._id}`}
                    className="text-blue-400 !mt-1 hover:text-blue-600"
                  >
                    More Details
                  </Link>
                </div>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
