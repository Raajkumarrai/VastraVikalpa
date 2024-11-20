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
  Select,
  SelectItem,
  Progress,
} from "@nextui-org/react";
import { PlusIcon } from "../../../common/components/Tables/Icons/PlusIcon";

export default function ModalApp(props) {
  const {
    handelpostsubcategory,
    handelUpdate,
    updateBtnRef,
    updateData,
    setUpdateData,
    categoryDataDropdown,
    postUpload,
  } = props;
  const closeRef = useRef();

  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [subCategoryData, setSubCategoryData] = useState({
    subCategoryName: "",
    categoryId: "",
  });
  const [validationErrors, setValidationErrors] = useState({
    subCategoryName: "",
    categoryId: "",
  });

  useEffect(() => {
    setSubCategoryData({
      subCategoryName: updateData.status ? updateData.data.subCategoryName : "",
      categoryId: updateData.status ? updateData.data.categoryId : "",
    });
  }, [updateData]);

  const subCategoryDataChange = (e) => {
    setSubCategoryData({ ...subCategoryData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    let isValid = true;
    const newValidationErrors = {
      subCategoryName: "",
      categoryId: "",
    };

    if (!subCategoryData.subCategoryName.trim()) {
      newValidationErrors.subCategoryName = "Subcategory Name is required";
      isValid = false;
    }

    if (!subCategoryData.categoryId.trim()) {
      newValidationErrors.categoryId = "Category is required";
      isValid = false;
    }

    setValidationErrors(newValidationErrors);

    return isValid;
  };

  const subCategoryDataSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      if (updateData.status) {
        handelUpdate({ ...subCategoryData, id: updateData.data._id });
      } else {
        handelpostsubcategory(subCategoryData);
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

  const clearSubCategoryData = () => {
    setSubCategoryData({
      subCategoryName: "",
      categoryId: "",
    });
    setUpdateData({ status: false, data: {} });
    setValidationErrors({
      subCategoryName: "",
    });
  };

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
          clearSubCategoryData();
          onOpenChange();
        }}
      >
        <ModalContent>
          {(onClose) => (
            <form method="post" onSubmit={subCategoryDataSubmit}>
              <ModalHeader className="flex flex-col gap-1 uppercase text-slate-600 dark:text-slate-200">
                Add Subcategory
              </ModalHeader>
              <ModalBody>
                {updateData.status ? (
                  <Select
                    variant="underlined"
                    label="Select Category"
                    className="w-full"
                    radius="sm"
                    name="categoryId"
                    value={subCategoryData.categoryId}
                    onChange={subCategoryDataChange}
                    defaultSelectedKeys={[updateData.data.categoryId]}
                  >
                    {categoryDataDropdown.map((e) => (
                      <SelectItem value={e._id} key={e._id}>
                        {e.categoryName}
                      </SelectItem>
                    ))}
                  </Select>
                ) : (
                  <Select
                    variant="underlined"
                    label="Select Category"
                    className="w-full"
                    radius="sm"
                    name="categoryId"
                    value={subCategoryData.categoryId}
                    onChange={subCategoryDataChange}
                  >
                    {categoryDataDropdown.map((e) => (
                      <SelectItem value={e._id} key={e._id}>
                        {e.categoryName}
                      </SelectItem>
                    ))}
                  </Select>
                )}
                {validationErrors.categoryId && (
                  <div className="errorFront">
                    {validationErrors.categoryId}
                  </div>
                )}

                <Input
                  type="text"
                  label="Subcategory Name"
                  radius="sm"
                  size="sm"
                  variant="underlined"
                  name="subCategoryName"
                  value={subCategoryData.subCategoryName}
                  onChange={subCategoryDataChange}
                />
                {validationErrors.subCategoryName && (
                  <div className="errorFront">
                    {validationErrors.subCategoryName}
                  </div>
                )}

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
                    className="rounded-sm uppercase ml-2 tracking-wide"
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
                    className="rounded-sm uppercase tracking-wide"
                    type="reset"
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
