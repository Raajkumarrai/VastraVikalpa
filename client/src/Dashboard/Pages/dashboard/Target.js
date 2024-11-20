import React, { useEffect, useRef, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
} from "@nextui-org/react";
import { useDispatch } from "react-redux";
import { postTarget, updateTarget } from "../../../redux/slices/targetSlice";
// import { postTarget, updateTarget } from "../../../redux";
import { toast } from "sonner";

export default function Target({ btnRef, targetDataProp }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const dispatch = useDispatch();
  const closeRef = useRef();

  const [targetData, setTargetData] = useState({
    daily: "",
    weekly: "",
    monthly: "",
  });

  const [errors, setErrors] = useState({
    daily: "",
    weekly: "",
    monthly: "",
  });

  useEffect(() => {
    setTargetData({
      daily: targetDataProp[0] ? targetDataProp[0].daily : "",
      weekly: targetDataProp[0] ? targetDataProp[0].weekly : "",
      monthly: targetDataProp[0] ? targetDataProp[0].monthly : "",
    });
  }, [targetDataProp]);

  const handelPostTarget = async (data) => {
    try {
      const response = await dispatch(postTarget(data));
      if (response.payload?.success) {
        toast.success("Target added successfully");
      } else if (response.payload?.error) {
        toast.error(response.payload?.error);
      } else {
        toast.error("Cannot add target");
      }
    } catch (error) {
      toast.error("Some error occurred");
    }
  };

  const handelUpdateTarget = async (data) => {
    try {
      const response = await dispatch(updateTarget(data));
      if (response.payload?.success) {
        toast.success("Target updated successfully");
      } else if (response.payload?.error) {
        toast.error(response.payload?.error);
      } else {
        toast.error("Cannot update target");
      }
    } catch (error) {
      toast.error("Some error occurred");
    }
  };

  const formInputFieldChange = (e) => {
    setTargetData({ ...targetData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" }); // Clear the error message when the input changes
  };

  const formsubmit = (e) => {
    e.preventDefault();

    // Client-side validation
    const newErrors = {
      daily: "",
      weekly: "",
      monthly: "",
    };

    if (targetData.daily <= 0) {
      newErrors.daily = "Daily target must be greater than 0.";
    }

    if (targetData.weekly <= 0) {
      newErrors.weekly = "Weekly target must be greater than 0.";
    }

    if (targetData.monthly <= 0) {
      newErrors.monthly = "Monthly target must be greater than 0.";
    }

    if (Number(targetData.daily) >= Number(targetData.weekly)) {
      newErrors.daily = "Daily target must be less than weekly target.";
    }

    if (Number(targetData.weekly) >= Number(targetData.monthly)) {
      newErrors.weekly = "Weekly target must be less than monthly target.";
    }

    // Update errors state
    setErrors(newErrors);

    // Check if any errors exist
    if (Object.values(newErrors).some((error) => error !== "")) {
      // If there are errors, don't proceed with form submission
      return;
    }

    if (targetDataProp[0]) {
      handelUpdateTarget({ ...targetData, id: targetDataProp[0]._id });
      closeRef.current.click();
    } else {
      handelPostTarget(targetData);
      closeRef.current.click();
    }
  };

  const clearCategoryData = () => {
    setTargetData({
      daily: targetDataProp[0] ? targetDataProp[0].daily : "",
      weekly: targetDataProp[0] ? targetDataProp[0].weekly : "",
      monthly: targetDataProp[0] ? targetDataProp[0].monthly : "",
    });
    setErrors({ daily: "", weekly: "", monthly: "" });
  };

  return (
    <>
      <Button onPress={onOpen} color="primary" className="hidden" ref={btnRef}>
        Open Modal
      </Button>
      <Modal
        radius="sm"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="top-center"
        onClose={() => {
          clearCategoryData();
          onOpenChange();
        }}
      >
        <ModalContent>
          {(onClose) => (
            <form method="post" onSubmit={formsubmit}>
              <ModalHeader className="flex flex-col gap-1">
                Set revenue target
              </ModalHeader>
              <ModalBody>
                <Input
                  autoFocus
                  label="Daily"
                  placeholder="Enter your daily target"
                  variant="bordered"
                  radius="sm"
                  name="daily"
                  type="number"
                  value={targetData.daily}
                  onChange={formInputFieldChange}
                />
                {errors.daily && (
                  <div className="errorFront">{errors.daily}</div>
                )}

                <Input
                  autoFocus
                  label="Weekly"
                  placeholder="Enter your weekly target"
                  variant="bordered"
                  radius="sm"
                  type="number"
                  name="weekly"
                  value={targetData.weekly}
                  onChange={formInputFieldChange}
                />
                {errors.weekly && (
                  <div className="errorFront">{errors.weekly}</div>
                )}

                <Input
                  autoFocus
                  label="Monthly"
                  placeholder="Enter your monthly target"
                  variant="bordered"
                  radius="sm"
                  type="number"
                  name="monthly"
                  value={targetData.monthly}
                  onChange={formInputFieldChange}
                />
                {errors.monthly && (
                  <div className="errorFront">{errors.monthly}</div>
                )}
              </ModalBody>
              <ModalFooter>
                <Button
                  color="danger"
                  radius="sm"
                  variant="flat"
                  onPress={onClose}
                  type="reset"
                  ref={closeRef}
                >
                  Close
                </Button>
                <Button type="submit" color="primary" radius="sm">
                  {targetDataProp[0] ? "Update" : "Set"} target
                </Button>
              </ModalFooter>
            </form>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
