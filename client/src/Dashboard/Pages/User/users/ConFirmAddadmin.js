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

export default function ConFirmAddadmin(props) {
  const { btnRef, handelUpdate, updateAdminData, setUpdateAdminData } = props;
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const handelupdateContent = () => {
    handelUpdate(updateAdminData.data);
  };
  const clearCategoryData = () => {
    setUpdateAdminData({ data: {}, status: false });
  };
  return (
    <>
      <Button onPress={onOpen} className="hidden" ref={btnRef}>
        Open Modal
      </Button>
      <Modal
        backdrop="opaque"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        onClose={() => {
          clearCategoryData();
          onOpenChange();
        }}
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
                <CircleNotificationsIcon
                  className={`!text-3xl scale-110 ${
                    !updateAdminData.status ? `text-red-500` : `text-green-500`
                  }`}
                />
                Alert {!updateAdminData.status ? "Remove Admin" : "Add Admin"}
              </ModalHeader>
              <ModalBody>
                <p>
                  Are you sure you want to{" "}
                  {!updateAdminData.status
                    ? "remove this user as admin"
                    : "add this user as admin"}{" "}
                  !!!
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
                  onClick={handelupdateContent}
                >
                  {!updateAdminData.status ? "Remove Admin" : "Add Admin"}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
