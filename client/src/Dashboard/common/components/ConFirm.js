import React from "react";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import CircleNotificationsIcon from "@mui/icons-material/CircleNotifications";

export default function ConFirm(props) {
  const { btnRef, DeleteFunction, deleteId } = props;
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  return (
    <>
      <Button onPress={onOpen} className="hidden" ref={btnRef}>
        Open Modal
      </Button>
      <Modal
        backdrop="opaque"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        motionProps={{
          variants: {
            enter: {
              y: 0,
              opacity: 1,
              transition: {
                duration: 0.3,
                ease: "easeOut",
              },
            },
            exit: {
              y: -20,
              opacity: 0,
              transition: {
                duration: 0.2,
                ease: "easeIn",
              },
            },
          },
        }}
      >
        <ModalContent className="!rounded-[3px]">
          {(onClose) => (
            <>
              <ModalHeader className="flex gap-1 items-center tracking-wide">
                <CircleNotificationsIcon className="!text-3xl scale-110 text-red-500" />
                Alert Deleting Content
              </ModalHeader>
              <ModalBody>
                <p>
                  Are you sure you want to delete this item from our system?
                </p>
              </ModalBody>
              <ModalFooter>
                <Button
                  color="danger"
                  className="!rounded-[3px]"
                  variant="ghost"
                  onPress={onClose}
                  size="sm"
                >
                  Close
                </Button>
                <Button
                  size="sm"
                  color="primary"
                  className="!rounded-[3px]"
                  onPress={onClose}
                  onClick={() => DeleteFunction(deleteId)}
                >
                  Delete
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
