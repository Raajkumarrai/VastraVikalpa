import React, { useEffect, useRef, useState } from "react";
import TablePage from "./Table";
import { useDispatch, useSelector } from "react-redux";
import {
  registerUser,
  getUsers,
  deleteUser,
  updateAdmin,
} from "../../../../redux/slices/authSlice";
import { toast } from "sonner";

const Page = () => {
  const dispatch = useDispatch();
  const userRef = useRef(false);
  const [finalData, setFinalData] = useState([]);
  const { allUserData } = useSelector((state) => state.authReducer);

  useEffect(() => {
    if (userRef.current === false) {
      dispatch(getUsers());
    }
    return () => {
      userRef.current = true;
    };
  }, [dispatch]);

  useEffect(() => {
    let finalCategoryData = allUserData.map((item, index) => ({
      ...item,
      sn: index + 1,
    }));
    setFinalData(finalCategoryData);
  }, [allUserData, dispatch]);

  const handelregisterUser = async (data) => {
    try {
      const response = await dispatch(registerUser(data));
      if (response.payload?.success) {
        toast.success("User registered successfully");
      } else if (response.payload?.error) {
        toast.error(response.payload?.error);
      } else {
        toast.error("Cannot register user");
      }
    } catch (error) {
      toast.error("Some error occurred");
    }
  };

  const handelDelete = async (data) => {
    try {
      const response = await dispatch(deleteUser(data));
      if (response.meta?.requestStatus === "fulfilled") {
        toast.warning("User deleted successfully");
      } else if (response.payload?.error) {
        toast.error(response.payload?.error);
      } else {
        toast.error("Cannot delete user");
      }
    } catch (error) {
      toast.error("Some error occurred");
    }
  };

  const handelUpdate = async (data) => {
    try {
      const response = await dispatch(updateAdmin(data));
      if (Number(response.payload?.user?.privilege) === 1) {
        toast.success("User update admin");
      } else {
        toast.warning("User remove admin");
      }
    } catch (error) {
      toast.error("Some error occurred");
    }
  };

  return (
    <>
      <TablePage
        contentData={finalData[0]?.sn ? finalData : []}
        handelPost={handelregisterUser}
        handelDelete={handelDelete}
        handelUpdate={handelUpdate}
      />
    </>
  );
};

export default Page;
