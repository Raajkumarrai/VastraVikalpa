import React, { useEffect } from "react";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Divider,
} from "@nextui-org/react";

function updateURLWithoutSegment(url, segmentToRemove) {
  const newURL = url.replace(
    new RegExp(`/${segmentToRemove}/.*`),
    `/${segmentToRemove}/`
  );
  window.history.pushState({}, document.title, newURL);
}

export default function ModalFun(props) {
  const { btnRef, msgData, setMsgData, handelUpdate, setOneMsgData } = props;
  useEffect(() => {
    if (msgData._id) {
      handelUpdate(msgData._id);
      updateURLWithoutSegment(window.location.href, "message");
    }
    // eslint-disable-next-line
  }, [msgData._id]);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const clearCategoryData = () => {
    setMsgData({});
    updateURLWithoutSegment(window.location.href, "message");
    setOneMsgData(null);
  };

  function dateConverter(isoDate) {
    const date = new Date(isoDate);
    return date.toLocaleString();
  }

  return (
    <>
      <Button onPress={onOpen} ref={btnRef} className="hidden">
        Open Modal
      </Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        size={"2xl"}
        onClose={() => {
          clearCategoryData();
          onOpenChange();
        }}
      >
        <ModalContent className="!w-[900px] !rounded-sm">
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Message from {msgData.name}
              </ModalHeader>
              <Divider />
              <ModalBody className="!flex !gap-1 !flex-col -mt-2 py-5">
                <div className="flex gap-1">
                  <span>Name:</span>
                  <span>{msgData.name}</span>
                </div>
                <div className="flex gap-1">
                  <span>Email:</span>
                  <span>{msgData.email}</span>
                </div>
                <div className="flex gap-1">
                  <span>Title:</span>
                  <span>{msgData.title}</span>
                </div>
                <div className="text-justify">
                  <span className="mr-1">Message:</span>
                  <span>{msgData.msg}</span>
                </div>
              </ModalBody>
              <Divider />
              <ModalFooter className="flex justify-between items-center ">
                <span>Date: {dateConverter(msgData.date)}</span>
                <Button
                  color="danger"
                  variant="bordered"
                  className="rounded-sm !uppercase !tracking-wide"
                  size="sm"
                  onPress={onClose}
                >
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
