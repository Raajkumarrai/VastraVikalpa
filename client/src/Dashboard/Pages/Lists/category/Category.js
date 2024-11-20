import React, { useEffect, useRef, useState } from "react";
import TablePage from "./Table";
import { useDispatch, useSelector } from "react-redux";
import {
  postCategory,
  getCategorys,
  deleteCategory,
  updateCategory,
} from "../../../../redux/slices/categorySlice";
import {
  // percentCompletedValue,
  setOnProgressChangeCallback,
} from "../../../../redux/slices/categorySlice";
import { toast } from "sonner";

const CategoryPage = () => {
  const [postUpload, setPostUpload] = useState(0);
  const dispatch = useDispatch();
  const userRef = useRef(false);
  const [finalData, setFinalData] = useState([]);
  const { data } = useSelector((state) => state.categoryReducer);

  useEffect(() => {
    if (userRef.current === false) {
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
    let finalCategoryData = data.map((item, index) => ({
      ...item,
      sn: index + 1,
    }));
    setFinalData(finalCategoryData);
  }, [data]);

  const handelPostCategory = async (data) => {
    try {
      const response = await dispatch(postCategory(data));
      if (response.payload?.success) {
        toast.success("Category added successfully");
      } else if (response.payload?.error) {
        toast.error(response.payload?.error);
      } else {
        toast.error("Cannot add category");
      }
    } catch (error) {
      toast.error("Some error occurred");
    }
  };

  const handelDelete = async (data) => {
    try {
      const response = await dispatch(deleteCategory(data));
      if (response.meta?.requestStatus === "fulfilled") {
        toast.warning("Category deleted successfully");
      } else if (response.payload?.error) {
        toast.error(response.payload?.error);
      } else {
        toast.error("Cannot delete category");
      }
    } catch (error) {
      toast.error("Some error occurred");
    }
  };

  const handelUpdate = async (data) => {
    try {
      const response = await dispatch(updateCategory(data));
      if (response.payload?.success) {
        toast.success("Category updated successfully");
      } else if (response.payload?.error) {
        toast.error(response.payload?.error);
      } else {
        toast.error("Cannot update category");
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
        categoryData={finalData[0]?.sn ? finalData : []}
        handelPostCategory={handelPostCategory}
        handelDelete={handelDelete}
        handelUpdate={handelUpdate}
        postUpload={postUpload}
      />
    </>
  );
};

export default CategoryPage;
