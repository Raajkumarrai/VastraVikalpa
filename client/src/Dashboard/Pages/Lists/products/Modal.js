import React, { useEffect, useState, useRef } from "react";
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
// import { CKEditor } from "ckeditor4-react";
import TextEditor from "./TextEditor";

const gendertype = [
  { id: 1, name: "Men" },
  { id: 2, name: "Women" },
  { id: 3, name: "Unisex" },
];

function getGenderName(id) {
  const gendertypeItem = gendertype.find(
    (item) => String(item.id) === String(id)
  );
  return gendertypeItem ? gendertypeItem.name : "";
}

export default function ModalApp(props) {
  const {
    handelpostproduct,
    handelUpdate,
    updateBtnRef,
    updateData,
    setUpdateData,
    categoryDataDropdown,
    subcategoryDataDropdown,
    postUpload,
  } = props;

  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [discriptionData, setDescriptionData] = useState("");
  const closeBtn = useRef();
  const [productColor, setProductColor] = useState([]);
  const [productData, setProductData] = useState({
    productTitle: "",
    categoryId: "",
    subCategoryId: null,
    gendertype: "",
    gendertypeName: "",
    productImage: [],
    productcolor: [],
    productDiscount: "",
    productPrice: "",
    productQuantity: "",
  });

  const [validationErrors, setValidationErrors] = useState({
    productTitle: "",
    categoryId: "",
    productImage: [],
    productcolor: [],
    productDiscount: "",
    productPrice: "",
    gendertype: "",
    productQuantity: "",
  });

  useEffect(() => {
    setProductData({
      productTitle: updateData.status ? updateData.data.title : "",
      categoryId: updateData.status ? updateData.data.categoryId : "",
      subCategoryId: updateData.status ? updateData.data.subcategoryId : null,
      gendertype: updateData.status ? updateData.data.gendertype : "",
      gendertypeName: updateData.status
        ? getGenderName(updateData.data.gendertype)
        : "",
      productcolor: updateData.status ? updateData.data.productcolor : [],
      productDiscount: updateData.status ? updateData.data.discount : "",
      productQuantity: updateData.status ? updateData.data.maxQuantity : "",
      productPrice: updateData.status ? updateData.data.price : "",
      productImage: updateData.status ? "" : [],
    });
    setDescriptionData(updateData.status ? updateData.data.description : "");
    setProductColor(updateData.status ? updateData.data.productcolor : []);
  }, [updateData]);

  const productDataChange = (e) => {
    const newValidationErrors = { ...validationErrors, [e.target.name]: "" };
    setValidationErrors(newValidationErrors);

    if (e.target.name === "productImage") {
      setProductData({
        ...productData,
        productImage: Array.from(e.target.files),
      });
    } else if (e.target.name === "categoryId") {
      setProductData({
        ...productData,
        categoryId: e.target.value,
        subCategoryId: null,
      });
    } else if (e.target.name === "subCategoryId") {
      setProductData({
        ...productData,
        subCategoryId: e.target.value,
      });
    } else if (e.target.name === "gendertype") {
      setProductData({
        ...productData,
        gendertype: e.target.value,
        gendertypeName: getGenderName(e.target.value),
      });
    } else {
      setProductData({ ...productData, [e.target.name]: e.target.value });
    }
  };

  const filteredSubcategoryData = subcategoryDataDropdown.filter(
    (item) => String(item.categoryId) === String(productData.categoryId)
  );
  // const descriptionDataChange = (event) => {
  //   setDescriptionData(event.editor.getData());
  // };

  const colorchange = (data) => {
    const colorIndex = productColor.indexOf(data);

    if (colorIndex !== -1) {
      const updatedColorArray = [...productColor];
      updatedColorArray.splice(colorIndex, 1);
      setProductColor(updatedColorArray);
    } else {
      setProductColor([...productColor, data]);
    }
  };

  const clearData = () => {
    setProductData({
      productTitle: "",
      categoryId: "",
      subCategoryId: null,
      productImage: [],
      productcolor: [],
      productDiscount: "",
      gendertype: "",
      productQuantity: "",
      productPrice: "",
    });
    setDescriptionData("");
    setUpdateData({ status: false, data: {} });
    setValidationErrors({
      productTitle: "",
      categoryId: "",
      productImage: [],
      productcolor: [],
      productDiscount: "",
      gendertype: "",
      productQuantity: "",
      productPrice: "",
      productDescription: "",
    });
    setProductColor([]);
  };

  const formsubmit = (e) => {
    e.preventDefault();
    const newValidationErrors = {};
    let isValid = true;

    // Validate Product Title
    if (!productData.productTitle.trim()) {
      newValidationErrors.productTitle = "Product Title is required";
      isValid = false;
    }
    // Validate Product Title
    if (!discriptionData.trim()) {
      newValidationErrors.productDescription =
        "Product Description is required";
      isValid = false;
    }

    // Validate Category ID
    if (!productData.categoryId) {
      newValidationErrors.categoryId = "Category is required";
      isValid = false;
    }

    if (Array.isArray(productData.productImage)) {
      // Validate Product Image
      if (productData.productImage.length < 1) {
        newValidationErrors.productImage = "Product Image is required";
        isValid = false;
      }
    }

    // Validate Product Discount
    if (!productData.productDiscount) {
      newValidationErrors.productDiscount = "Product Discount is required";
      isValid = false;
    }

    // Validate Product productPrice
    if (!productData.productPrice) {
      newValidationErrors.productPrice = "Product price is required";
      isValid = false;
    }

    // Validate Product gendertype
    if (!productData.gendertype) {
      newValidationErrors.gendertype = "Suit Gender is required";
      isValid = false;
    }

    // Validate Product Quantity
    if (!productData.productQuantity) {
      newValidationErrors.productQuantity = "Total Quantity is required";
      isValid = false;
    }
    // Validate Product Quantity
    if (productColor.length < 1) {
      newValidationErrors.productColor = "Product color is required";
      isValid = false;
    }

    setValidationErrors(newValidationErrors);

    if (isValid) {
      const finalData = {
        ...productData,
        description: discriptionData,
        productcolor: productColor,
      };

      const finalDataAfterSubcat = {
        ...finalData,
        subCategoryId: finalData.subCategoryId || "",
      };

      // return;
      if (updateData.status) {
        handelUpdate({ ...finalDataAfterSubcat, id: updateData.data._id });
      } else {
        handelpostproduct(finalDataAfterSubcat);
      }
    }
  };
  useEffect(() => {
    if (postUpload === 100) {
      setTimeout(() => {
        closeBtn.current?.click();
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
        onOpenChange={onOpenChange}
        onClose={() => {
          clearData();
          onOpenChange();
        }}
        size="3xl"
        radius="sm"
        className="rounded-sm"
      >
        <ModalContent>
          {(onClose) => (
            <div id="ProductModal">
              <form onSubmit={formsubmit} method="post">
                <ModalHeader className="flex flex-col gap-1 uppercase text-slate-600 dark:text-slate-200">
                  Add Product
                </ModalHeader>
                <ModalBody>
                  <div className="flex gap-3 w-full">
                    <div className="flex flex-col w-1/3">
                      <Input
                        type="text"
                        variant="underlined"
                        label="Product Name"
                        radius="sm"
                        name="productTitle"
                        value={productData.productTitle}
                        onChange={productDataChange}
                      />
                      {validationErrors.productTitle && (
                        <div className="text-red-500 errorFront !mt-[1px]">
                          {validationErrors.productTitle}
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col w-1/3">
                      {updateData.status ? (
                        <Select
                          label="Category Name"
                          className="max-w-xs"
                          variant="underlined"
                          radius="sm"
                          name="categoryId"
                          value={productData.categoryId}
                          onChange={productDataChange}
                          defaultSelectedKeys={[updateData.data.categoryId]}
                        >
                          {categoryDataDropdown.map((e) => (
                            <SelectItem key={e._id} value={e._id} radius="sm">
                              {e.categoryName}
                            </SelectItem>
                          ))}
                        </Select>
                      ) : (
                        <Select
                          label="Category Name"
                          className="max-w-xs"
                          variant="underlined"
                          radius="sm"
                          name="categoryId"
                          value={productData.categoryId}
                          onChange={productDataChange}
                        >
                          {categoryDataDropdown.map((e) => (
                            <SelectItem key={e._id} value={e._id} radius="sm">
                              {e.categoryName}
                            </SelectItem>
                          ))}
                        </Select>
                      )}
                      {validationErrors.categoryId && (
                        <div className="text-red-500 errorFront !mt-[1px]">
                          {validationErrors.categoryId}
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col w-1/3">
                      {updateData.status ? (
                        <Select
                          label="Subcategory Name"
                          className="max-w-xs"
                          variant="underlined"
                          radius="sm"
                          name="subCategoryId"
                          value={productData.subCategoryId}
                          onChange={productDataChange}
                          defaultSelectedKeys={
                            updateData.data.subcategoryId !== null
                              ? [updateData.data.subcategoryId]
                              : null
                          }
                        >
                          <SelectItem value={""} key={null} radius="sm">
                            None
                          </SelectItem>
                          {filteredSubcategoryData.map((e) => (
                            <SelectItem key={e._id} value={e._id} radius="sm">
                              {e.subCategoryName}
                            </SelectItem>
                          ))}
                        </Select>
                      ) : (
                        <Select
                          label="Subcategory Name"
                          className="max-w-xs"
                          variant="underlined"
                          radius="sm"
                          name="subCategoryId"
                          value={productData.subCategoryId}
                          onChange={productDataChange}
                        >
                          <SelectItem value={""} key={null} radius="sm">
                            None
                          </SelectItem>
                          {filteredSubcategoryData.map((e) => (
                            <SelectItem key={e._id} value={e._id} radius="sm">
                              {e.subCategoryName}
                            </SelectItem>
                          ))}
                        </Select>
                      )}
                    </div>
                  </div>
                  <div>
                    {/* <CKEditor
                      initData={
                        updateData.status
                          ? updateData.data.description
                          : discriptionData
                      }
                      onChange={(event) => {
                        descriptionDataChange(event);
                      }}
                    /> */}
                    <div className="h-[150px]">
                      <TextEditor
                        initialData={
                          updateData.status
                            ? updateData.data.description
                            : discriptionData
                        }
                        setDescriptionData={setDescriptionData}
                      />
                    </div>
                    {validationErrors.productDescription && (
                      <div className="text-red-500 errorFront !mt-[3px]">
                        {validationErrors.productDescription}
                      </div>
                    )}
                  </div>
                  <div className="flex gap-3 w-full">
                    <div className="flex flex-col w-1/3">
                      <Input
                        type="file"
                        variant="underlined"
                        label="Product Image"
                        placeholder="E"
                        radius="sm"
                        className="!p-0 paddintyzero"
                        accept=".jpg, .jpeg, .png "
                        multiple
                        name="productImage"
                        onChange={productDataChange}
                      />
                      {validationErrors.productImage && (
                        <div className="text-red-500 errorFront !mt-[1px]">
                          {validationErrors.productImage}
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col w-1/3">
                      {updateData.status ? (
                        <Select
                          label="Suit Gender"
                          className="max-w-xs"
                          radius="sm"
                          name="gendertype"
                          variant="underlined"
                          value={productData.gendertype}
                          onChange={productDataChange}
                          defaultSelectedKeys={[
                            String(updateData.data.gendertype),
                          ]}
                        >
                          {gendertype.map((e) => {
                            return (
                              <SelectItem value={e.id} key={e.id} radius="sm">
                                {e.name}
                              </SelectItem>
                            );
                          })}
                        </Select>
                      ) : (
                        <Select
                          label="Suit Gender"
                          className="max-w-xs"
                          radius="sm"
                          name="gendertype"
                          variant="underlined"
                          value={productData.gendertype}
                          onChange={productDataChange}
                        >
                          {gendertype.map((e) => {
                            return (
                              <SelectItem value={e.id} key={e.id} radius="sm">
                                {e.name}
                              </SelectItem>
                            );
                          })}
                        </Select>
                      )}
                      {validationErrors.gendertype && (
                        <div className="text-red-500 errorFront !mt-[1px]">
                          {validationErrors.gendertype}
                        </div>
                      )}
                    </div>
                    {/* <Input type="color" /> */}
                    <div className="flex flex-col w-1/3">
                      <p className="text-sm px-1 text-black/70">
                        Product Color
                      </p>
                      <div className="px-2 h-full w-full flex gap-2 border-b-2 -mb-[1px] pb-1 items-center">
                        <div
                          onClick={() => colorchange("black")}
                          className={`${productColor.includes("black") && "scale-125"} h-[20px] border border-black/15  cursor-pointer hover:scale-105 w-[20px] bg-black shadow rounded-sm`}
                        ></div>
                        <div
                          onClick={() => colorchange("white")}
                          className={`${productColor.includes("white") && "scale-125"} h-[20px] border border-black/15 cursor-pointer hover:scale-105 w-[20px] bg-white shadow rounded-sm`}
                        ></div>
                        <div
                          onClick={() => colorchange("red")}
                          className={`${productColor.includes("red") && "scale-125"} h-[20px] border border-black/15 cursor-pointer hover:scale-105 w-[20px] bg-red-500 shadow rounded-sm`}
                        ></div>
                        <div
                          onClick={() => colorchange("blue")}
                          className={`${productColor.includes("blue") && "scale-125"} h-[20px] border border-black/15 cursor-pointer hover:scale-105 w-[20px] bg-blue-500 shadow rounded-sm`}
                        ></div>
                        <div
                          onClick={() => colorchange("green")}
                          className={`${productColor.includes("green") && "scale-125"} h-[20px] border border-black/15 cursor-pointer hover:scale-105 w-[20px] bg-green-500 shadow rounded-sm`}
                        ></div>
                        <div
                          onClick={() => colorchange("pink")}
                          className={`${productColor.includes("pink") && "scale-125"}  h-[20px] border border-black/15 cursor-pointer hover:scale-105 w-[20px] bg-pink-500 shadow rounded-sm`}
                        ></div>
                        <div
                          onClick={() => colorchange("gray")}
                          className={`${productColor.includes("gray") && "scale-125"} h-[20px] border border-black/15 cursor-pointer hover:scale-105 w-[20px] bg-gray-500 shadow rounded-sm`}
                        ></div>
                        <div
                          onClick={() => colorchange("other")}
                          className={`${productColor.includes("other") && "scale-125"} h-[20px] border cursor-pointer scale-105 hover:scale-110 w-[20px] rounded-sm overflow-hidden flex-wrap flex`}
                        >
                          <div className="h-1/2 bg-red-500 w-1/2 rounded-tl-sm"></div>
                          <div className="h-1/2 bg-black w-1/2 rounded-tr-sm"></div>
                          <div className="h-1/2 bg-yellow-500 w-1/2 rounded-bl-sm"></div>
                          <div className="h-1/2 bg-blue-500 w-1/2 rounded-br-sm"></div>
                        </div>
                      </div>
                      {validationErrors.productColor && (
                        <div className="text-red-500 errorFront !mt-[1px]">
                          {validationErrors.productColor}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-3 w-full">
                    <div className="flex flex-col w-1/3">
                      <Input
                        variant="underlined"
                        type="number"
                        label="Product Price"
                        radius="sm"
                        name="productPrice"
                        value={productData.productPrice}
                        onChange={productDataChange}
                      />
                      {validationErrors.productPrice && (
                        <div className="text-red-500 errorFront !mt-[1px]">
                          {validationErrors.productPrice}
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col w-1/3">
                      <Input
                        type="number"
                        variant="underlined"
                        label="Discount Percentage"
                        radius="sm"
                        name="productDiscount"
                        value={productData.productDiscount}
                        onChange={productDataChange}
                      />
                      {validationErrors.productDiscount && (
                        <div className="text-red-500 errorFront !mt-[1px]">
                          {validationErrors.productDiscount}
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col w-1/3">
                      <Input
                        type="number"
                        variant="underlined"
                        label="Total Quantity"
                        radius="sm"
                        name="productQuantity"
                        value={productData.productQuantity}
                        onChange={productDataChange}
                      />
                      {validationErrors.productQuantity && (
                        <div className="text-red-500 errorFront !mt-[1px]">
                          {validationErrors.productQuantity}
                        </div>
                      )}
                    </div>
                  </div>
                  {postUpload > 0 && (
                    <Progress
                      aria-label="Downloading..."
                      size="sm"
                      value={postUpload}
                      className=" mt-1"
                    />
                  )}
                </ModalBody>
                <ModalFooter>
                  <div className="flex gap-3 flex-row-reverse">
                    <Button
                      color="primary"
                      size="sm"
                      radius="sm"
                      className="rounded-sm !uppercase ml-2 tracking-wide"
                      // onPress={onClose}
                      type="submit"
                    >
                      Post
                    </Button>
                    <Button
                      color="danger"
                      size="sm"
                      variant="bordered"
                      onPress={onClose}
                      radius="sm"
                      className="rounded-sm !uppercase tracking-wide"
                      type="reset"
                      ref={closeBtn}
                      isDisabled={postUpload !== 0}
                    >
                      Close
                    </Button>
                  </div>
                </ModalFooter>
              </form>
            </div>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
