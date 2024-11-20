import React, { useEffect, useRef, useState } from "react";
import TablePage from "./Table";
import { useDispatch, useSelector } from "react-redux";
import {
  postsubcategory,
  getsubcategorys,
  deletesubcategory,
  updatesubcategory,
} from "../../../../redux/slices/subCategorySlice";

import { getCategorys } from "../../../../redux/slices/categorySlice";
import {
  // percentCompletedValue,
  setOnProgressChangeCallback,
} from "../../../../redux/slices/subCategorySlice";
import { toast } from "sonner";

const Page = () => {
  const [postUpload, setPostUpload] = useState(0);
  const dispatch = useDispatch();
  const userRef = useRef(false);
  const [finalData, setFinalData] = useState([]);
  const { subcatData } = useSelector((state) => state.subcategoryReducer);
  const { data } = useSelector((state) => state.categoryReducer);

  const joinedData = finalData.map((subcategory) => {
    const matchingCategory = data.find(
      (category) => category._id === subcategory.categoryId
    );
    return {
      ...subcategory,
      category: matchingCategory,
    };
  });

  useEffect(() => {
    if (userRef.current === false) {
      dispatch(getsubcategorys());
      dispatch(getCategorys());
    }
    return () => {
      userRef.current = true;
    };
  }, [dispatch]);
  useEffect(() => {
    if (postUpload >= 100) {
      setTimeout(() => {
        setPostUpload(0);
      }, 1000);
    }
  }, [postUpload]);

  useEffect(() => {
    let finalsubcategoryData = subcatData.map((item, index) => ({
      ...item,
      sn: index + 1,
    }));
    setFinalData(finalsubcategoryData);
  }, [subcatData]);

  const handelpostsubcategory = async (data) => {
    try {
      const response = await dispatch(postsubcategory(data));
      if (response.payload?.success) {
        toast.success("Subcategory added successfully");
      } else if (response.payload?.error) {
        toast.error(response.payload?.error);
      } else {
        toast.error("Cannot add Subcategory");
      }
    } catch (error) {
      toast.error("Some error occurred");
    }
  };

  const handelDelete = async (data) => {
    try {
      const response = await dispatch(deletesubcategory(data));
      if (response.meta?.requestStatus === "fulfilled") {
        toast.warning("Subcategory deleted successfully");
      } else if (response.payload?.error) {
        toast.error(response.payload?.error);
      } else {
        toast.error("Cannot delete subcategory");
      }
    } catch (error) {
      toast.error("Some error occurred");
    }
  };

  const handelUpdate = async (data) => {
    try {
      const response = await dispatch(updatesubcategory(data));
      if (response.payload?.success) {
        toast.success("Subcategory updated successfully");
      } else if (response.payload?.error) {
        toast.error(response.payload?.error);
      } else {
        toast.error("Cannot update subcategory");
      }
    } catch (error) {
      toast.error("Some error occurred");
    }
  };

  setOnProgressChangeCallback((newValue) => {
    setPostUpload(newValue);
  });

  return (
    <>
      <TablePage
        subcategoryData={joinedData[0]?.sn ? joinedData : []}
        handelpostsubcategory={handelpostsubcategory}
        handelDelete={handelDelete}
        handelUpdate={handelUpdate}
        categoryDataDropdown={data}
        postUpload={postUpload}
      />
    </>
  );
};

export default Page;
