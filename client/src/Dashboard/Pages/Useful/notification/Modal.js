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
import ProductCard from "./ProductCard";

export default function ModalFun(props) {
  const { btnRef } = props;
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Button onPress={onOpen} ref={btnRef} className="hidden">
        Open Modal
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size={"2xl"}>
        <ModalContent className="!w-[900px] !rounded-sm">
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Gaurab Rate 5 star in Jhumka
              </ModalHeader>
              <ModalBody className="!flex !gap-5 !flex-row -mt-2">
                <div className="w-[60%]">
                  <div className="flex gap-1">
                    <span>User Name:</span>
                    <span>Gaurab sunar</span>
                  </div>
                  <div className="flex gap-1">
                    <span>Email:</span>
                    <span>gaurabsuanr@gmail.com</span>
                  </div>
                  <div className="flex gap-1">
                    <span>Action:</span>
                    <span>Gaurab Rate 5 star in Jhumka</span>
                  </div>
                  <div className="w-[90%] h-[.01rem] bg-slate-300 my-2"></div>
                  <div className="flex gap-1">
                    <span>Product Name:</span>
                    <span>Jhumka</span>
                  </div>
                  <div className="flex gap-1">
                    <span>Metal:</span>
                    <span>Gold</span>
                  </div>
                  <div className="flex gap-1">
                    <span>Price:</span>
                    <span>2000</span>
                  </div>
                </div>
                <div className="w-[40%] border-l pl-2">
                  <ProductCard />
                </div>
              </ModalBody>
              <div className="w-full h-[0.01rem] bg-slate-200"></div>
              <ModalFooter className="flex justify-between items-center ">
                <span>Date: 2078-10-10</span>
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
