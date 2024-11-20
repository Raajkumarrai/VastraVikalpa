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
  Checkbox,
  Progress,
} from "@nextui-org/react";
import { PlusIcon } from "../../../common/components/Tables/Icons/PlusIcon";

export default function ModalApp(props) {
  const closeRef = useRef();
  const {
    handelPostCategory,
    updateBtnRef,
    handelUpdate,
    updateData,
    setUpdateData,
    postUpload,
  } = props;
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [categoryData, setCategoryData] = useState({
    categoryName: "",
    displayOrder: "",
    image: null,
    active: true,
    showTop: true,
  });

  const [validationErrors, setValidationErrors] = useState({
    categoryName: "",
    displayOrder: "",
  });

  useEffect(() => {
    setCategoryData({
      categoryName: updateData.status ? updateData.data.categoryName : "",
      displayOrder: updateData.status ? updateData.data.displayOrder : "",
      active: updateData.status ? updateData.data.active : true,
      showTop: updateData.status ? updateData.data.showTop : true,
    });
  }, [
    updateData.status,
    updateData.data.active,
    updateData.data.showTop,
    updateData.data.categoryName,
    updateData.data.displayOrder,
  ]);

  const clearCategoryData = () => {
    setCategoryData({
      categoryName: "",
      displayOrder: "",
      image: null,
      active: true,
      showTop: true,
    });
    setUpdateData({ status: false, data: {} });
    setValidationErrors({
      categoryName: "",
      displayOrder: "",
    });
  };

  const categoryDataChange = (e) => {
    if (e.target.name === "active") {
      setCategoryData({ ...categoryData, active: e.target.checked });
    } else if (e.target.name === "showTop") {
      setCategoryData({ ...categoryData, showTop: e.target.checked });
    } else if (e.target.name === "image") {
      setCategoryData({ ...categoryData, image: e.target.files[0] });
    } else {
      setCategoryData({ ...categoryData, [e.target.name]: e.target.value });
    }
  };

  const validateForm = () => {
    let isValid = true;
    const newValidationErrors = {
      categoryName: "",
      displayOrder: "",
    };

    if (!categoryData.categoryName.trim()) {
      newValidationErrors.categoryName = "Category Name is required";
      isValid = false;
    }
    const displayOrder = parseFloat(categoryData.displayOrder);
    if (!categoryData.displayOrder) {
      newValidationErrors.displayOrder = "Display Order is required";
      isValid = false;
    } else if (displayOrder <= 0 || displayOrder >= 20) {
      newValidationErrors.displayOrder =
        "Display Order must be greater than 0 and less than 20";
      isValid = false;
    }

    setValidationErrors(newValidationErrors);

    return isValid;
  };

  const categoryPost = (e) => {
    e.preventDefault();
    if (validateForm()) {
      if (!updateData.status) {
        handelPostCategory(categoryData);
      } else {
        handelUpdate({ ...categoryData, id: updateData.data._id });
      }
    }
  };

  useEffect(() => {
    if (postUpload === 100) {
      setTimeout(() => {
        closeRef.current?.click();
      }, 2000);
    }
  }, [postUpload]);
  return (
    <>
      <Button
        radius="sm"
        onPress={onOpen}
        color="primary"
        endContent={<PlusIcon />}
        ref={updateBtnRef}
        className="!hidden"
      >
        Add New
      </Button>
      <Modal
        isOpen={isOpen}
        radius="sm"
        onOpenChange={onOpenChange}
        onClose={() => {
          clearCategoryData();
          onOpenChange();
        }}
      >
        <ModalContent>
          {(onClose) => (
            <form method="post" onSubmit={categoryPost}>
              <ModalHeader className="flex flex-col gap-1 uppercase text-slate-600 dark:text-slate-200">
                Add Category
              </ModalHeader>
              <ModalBody>
                <Input
                  type="text"
                  label="Category Name"
                  radius="sm"
                  size="sm"
                  variant="underlined"
                  name="categoryName"
                  value={categoryData.categoryName}
                  onChange={categoryDataChange}
                />
                {validationErrors.categoryName && (
                  <div className="text-red-500 errorFront">
                    {validationErrors.categoryName}
                  </div>
                )}

                <Input
                  type="number"
                  label="Display Order"
                  radius="sm"
                  size="sm"
                  variant="underlined"
                  name="displayOrder"
                  value={categoryData.displayOrder}
                  onChange={categoryDataChange}
                />
                {validationErrors.displayOrder && (
                  <div className="text-red-500 errorFront">
                    {validationErrors.displayOrder}
                  </div>
                )}

                <Input
                  type="file"
                  variant="underlined"
                  label="Product Image"
                  placeholder="E"
                  radius="none"
                  className="!p-0 paddintyzero"
                  accept=".jpg, .jpeg, .png, .gif, .bmp, .webp"
                  name="image"
                  onChange={categoryDataChange}
                />
                <div className="flex gap-1 items-center w-full">
                  <div className="w-1/2">
                    {updateData.status ? (
                      <Checkbox
                        defaultSelected={updateData.data.showTop}
                        size="md"
                        className="mt-1"
                        name="showTop"
                        value={categoryData.showTop}
                        onChange={categoryDataChange}
                      >
                        Show In Top
                      </Checkbox>
                    ) : (
                      <Checkbox
                        defaultSelected={categoryData.showTop ? true : false}
                        size="md"
                        className="mt-1"
                        name="showTop"
                        value={categoryData.showTop}
                        onChange={categoryDataChange}
                      >
                        Show In Top
                      </Checkbox>
                    )}
                  </div>
                  <div className="w-1/2">
                    {updateData.status ? (
                      <Checkbox
                        defaultSelected={updateData.data.active}
                        size="md"
                        className="mt-1"
                        name="active"
                        value={categoryData.active}
                        onChange={categoryDataChange}
                      >
                        Active Category
                      </Checkbox>
                    ) : (
                      <Checkbox
                        defaultSelected={categoryData.active ? true : false}
                        size="md"
                        className="mt-1"
                        name="active"
                        value={categoryData.active}
                        onChange={categoryDataChange}
                      >
                        Active Category
                      </Checkbox>
                    )}
                  </div>
                </div>
                {postUpload > 0 && (
                  <Progress
                    aria-label="Downloading..."
                    size="sm"
                    value={postUpload}
                    className="max-w-md mt-1"
                  />
                )}
              </ModalBody>

              <ModalFooter>
                <div className="flex gap-3 flex-row-reverse">
                  <Button
                    color="primary"
                    size="sm"
                    radius="none"
                    className="rounded-sm !uppercase ml-2 tracking-wide"
                    type="submit"
                  >
                    {updateData.status ? "Update" : "Post"}
                  </Button>
                  <Button
                    color="danger"
                    size="sm"
                    variant="bordered"
                    onPress={onClose}
                    radius="none"
                    type="reset"
                    className="rounded-sm !uppercase tracking-wide"
                    ref={closeRef}
                    isDisabled={postUpload !== 0}
                  >
                    Close
                  </Button>
                </div>
              </ModalFooter>
            </form>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
