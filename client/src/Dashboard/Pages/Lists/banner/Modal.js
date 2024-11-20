import React, { useRef, useEffect, useState } from "react";
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
  Textarea,
  Checkbox,
  Progress,
} from "@nextui-org/react";
import { PlusIcon } from "../../../common/components/Tables/Icons/PlusIcon";

export default function ModalApp(props) {
  const {
    handelPost,
    updateBtnRef,
    handelUpdate,
    updateData,
    setUpdateData,
    postUpload,
    categoryDataDropdown,
  } = props;
  const closeBtnRef = useRef();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [bannerData, setBannerData] = useState({
    bannerTitle: "",
    bannerCategoryId: "",
    bannerCategoryName: "",
    bannerDescription: "",
    bannerActive: true,
    bannerHighlights: true,
    bannerImage: null,
  });

  const [validationErrors, setValidationErrors] = useState({
    bannerTitle: "",
    bannerCategoryId: "",
  });

  useEffect(() => {
    setBannerData({
      bannerTitle: updateData.status ? updateData.data.title : "",
      bannerCategoryId: updateData.status ? updateData.data.category : "",
      bannerDescription: updateData.status ? updateData.data.description : "",
      bannerActive: updateData.status ? updateData.data.active : true,
      bannerHighlights: updateData.status
        ? updateData.data.bannerHighlights
        : true,
      bannerImage: updateData.status ? updateData.data.image : null,
    });
  }, [updateData]);

  function getBannerCategoryNameById(id) {
    const category = categoryDataDropdown.find(
      (item) => String(item._id) === String(id)
    );
    return category ? category.categoryName : "Category Not Found";
  }

  const bannerDataChange = (e) => {
    if (e.target.name === "bannerImage") {
      setBannerData({ ...bannerData, bannerImage: e.target.files[0] });
    } else if (e.target.name === "bannerActive") {
      setBannerData({ ...bannerData, bannerActive: e.target.checked });
    } else if (e.target.name === "bannerHighlights") {
      setBannerData({ ...bannerData, bannerHighlights: e.target.checked });
    } else if (e.target.name === "bannerCategoryId") {
      setBannerData({
        ...bannerData,
        bannerCategoryId: e.target.value,
        bannerCategoryName: getBannerCategoryNameById(e.target.value),
      });
    } else {
      setBannerData({ ...bannerData, [e.target.name]: e.target.value });
    }
  };

  const clearBannerData = () => {
    setBannerData({
      bannerTitle: "",
      bannerCategoryId: "",
      bannerCategoryName: "",
      bannerDescription: "",
      bannerActive: true,
      bannerHighlights: true,
      bannerImage: null,
    });
    setUpdateData({ status: false, data: {} });
    setValidationErrors({
      bannerTitle: "",
      bannerCategoryId: "",
    });
  };

  const validateForm = () => {
    let isValid = true;
    const newValidationErrors = {
      bannerTitle: "",
      bannerCategoryId: "",
      bannerDescription: "",
      bannerImage: "",
    };

    if (!bannerData.bannerTitle.trim()) {
      newValidationErrors.bannerTitle = "Banner Title is required";
      isValid = false;
    }

    if (!bannerData.bannerDescription.trim()) {
      newValidationErrors.bannerDescription = "Banner description is required";
      isValid = false;
    }
    if (!bannerData.bannerImage) {
      newValidationErrors.bannerImage = "Banner Image is required";
      isValid = false;
    }

    if (bannerData.bannerCategoryId.length < 1) {
      newValidationErrors.bannerCategoryId = "Banner Category is required";
      isValid = false;
    }

    setValidationErrors(newValidationErrors);

    return isValid;
  };

  const bannerDataSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      if (updateData.status) {
        handelUpdate({ ...bannerData, id: updateData.data._id });
      } else {
        handelPost(bannerData);
      }
    }
  };
  useEffect(() => {
    if (postUpload === 100) {
      setTimeout(() => {
        closeBtnRef.current?.click();
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
        size="xl"
        onOpenChange={onOpenChange}
        onClose={() => {
          clearBannerData();
          onOpenChange();
        }}
      >
        <ModalContent>
          {(onClose) => (
            <form method="post" onSubmit={bannerDataSubmit}>
              <ModalHeader className="flex flex-col gap-1 uppercase text-slate-600 dark:text-slate-200">
                Add Banner
              </ModalHeader>
              <ModalBody>
                <Input
                  type="text"
                  label="Banner Title"
                  radius="sm"
                  size="sm"
                  variant="underlined"
                  name="bannerTitle"
                  value={bannerData.bannerTitle}
                  onChange={bannerDataChange}
                />
                {validationErrors.bannerTitle && (
                  <div className="text-red-500 errorFront">
                    {validationErrors.bannerTitle}
                  </div>
                )}

                <div className="flex gap-3 w-full">
                  <div className="flex flex-col w-1/2">
                    {updateData.status ? (
                      <Select
                        variant="underlined"
                        label="Select Category"
                        className="w-full"
                        radius="sm"
                        name="bannerCategoryId"
                        value={bannerData.categoryId}
                        onChange={bannerDataChange}
                        defaultSelectedKeys={[updateData.data.category]}
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
                        name="bannerCategoryId"
                        value={bannerData.categoryId}
                        onChange={bannerDataChange}
                      >
                        {categoryDataDropdown.map((e) => (
                          <SelectItem value={e._id} key={e._id}>
                            {e.categoryName}
                          </SelectItem>
                        ))}
                      </Select>
                    )}
                    {validationErrors.bannerCategoryId && (
                      <div className="text-red-500 !mt-1 errorFront">
                        {validationErrors.bannerCategoryId}
                      </div>
                    )}
                  </div>
                  <div className="w-1/2">
                    <Input
                      type="file"
                      variant="underlined"
                      label="Banner Image"
                      placeholder="E"
                      radius="none"
                      className="!p-0 paddintyzero"
                      accept=".jpg, .jpeg, .png, .gif, .bmp, .webp"
                      name="bannerImage"
                      onChange={bannerDataChange}
                    />
                    {validationErrors.bannerImage && (
                      <div className="text-red-500 !mt-1 errorFront">
                        {validationErrors.bannerImage}
                      </div>
                    )}
                  </div>
                </div>
                <Textarea
                  variant="underlined"
                  label="Banner Description"
                  name="bannerDescription"
                  value={bannerData.bannerDescription}
                  onChange={bannerDataChange}
                />
                {validationErrors.bannerDescription && (
                  <div className="text-red-500 errorFront">
                    {validationErrors.bannerDescription}
                  </div>
                )}
                <div className="flex w-full">
                  <div className="w-1/2">
                    {updateData.status ? (
                      <Checkbox
                        defaultSelected={updateData.data.active}
                        size="md"
                        className="mt-1"
                        name="bannerActive"
                        value={bannerData.bannerActive}
                        onChange={bannerDataChange}
                      >
                        Active Banner
                      </Checkbox>
                    ) : (
                      <Checkbox
                        defaultSelected={bannerData.bannerActive}
                        size="md"
                        className="mt-1"
                        name="bannerActive"
                        value={bannerData.bannerActive}
                        onChange={bannerDataChange}
                      >
                        Active Banner
                      </Checkbox>
                    )}
                  </div>
                  <div className="w-1/2">
                    {updateData.status ? (
                      <Checkbox
                        defaultSelected={updateData.data.bannerHighlights}
                        size="md"
                        className="mt-1"
                        name="bannerHighlights"
                        value={bannerData.bannerHighlights}
                        onChange={bannerDataChange}
                      >
                        Show Highlights
                      </Checkbox>
                    ) : (
                      <Checkbox
                        defaultSelected={bannerData.bannerHighlights}
                        size="md"
                        className="mt-1"
                        name="bannerHighlights"
                        value={bannerData.bannerHighlights}
                        onChange={bannerDataChange}
                      >
                        Show Highlights
                      </Checkbox>
                    )}
                  </div>
                </div>
                {postUpload > 0 && (
                  <Progress
                    aria-label="Downloading..."
                    size="sm"
                    value={postUpload}
                    className="mt-1"
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
                    Post
                  </Button>
                  <Button
                    color="danger"
                    size="sm"
                    variant="bordered"
                    onPress={onClose}
                    radius="none"
                    className="rounded-sm !uppercase tracking-wide"
                    type="reset"
                    ref={closeBtnRef}
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
