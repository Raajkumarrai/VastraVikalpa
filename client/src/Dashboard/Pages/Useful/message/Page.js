import React, { useEffect, useRef, useState } from "react";
import TablePage from "./Table";
import { useDispatch, useSelector } from "react-redux";
import {
  postContacts,
  getContacts,
  deleteContacts,
  updateunreadcontent,
  getUnreadMsg,
} from "../../../../redux/slices/messageSlice";
import { getUsers } from "../../../../redux/slices/authSlice";
import { toast } from "sonner";

const Page = (props) => {
  const { MsgId } = props;
  const dispatch = useDispatch();
  const userRef = useRef(false);
  const [finalData, setFinalData] = useState([]);
  const { contactData } = useSelector((state) => state.messageReducer);
  const { allUserData } = useSelector((state) => state.authReducer);

  const joinedData = finalData.map((contact) => {
    const userData = allUserData.find((user) => user._id === contact.userId);

    // You may want to add a check to handle cases where no matching user is found
    if (userData) {
      return {
        ...contact,
        user: userData, // You can include the user data in the result
      };
    }

    return contact; // If no matching user is found, keep the original contact data
  });

  useEffect(() => {
    if (userRef.current === false) {
      dispatch(getContacts());
      dispatch(getUsers());
      dispatch(getUnreadMsg());
    }
    return () => {
      userRef.current = true;
    };
  }, [dispatch]);

  useEffect(() => {
    let finalCategoryData = contactData.map((item, index) => ({
      ...item,
      sn: index + 1,
    }));
    setFinalData(finalCategoryData);
  }, [contactData]);

  const handelpost = async (data) => {
    try {
      const response = await dispatch(postContacts(data));
      if (response.payload?.success) {
        toast.success("Send message successfully");
      } else if (response.payload?.error) {
        toast.error(response.payload?.error);
      } else {
        toast.error("Cannot send message");
      }
    } catch (error) {
      toast.error("Some error occurred");
    }
  };

  const handelDelete = async (data) => {
    try {
      const response = await dispatch(deleteContacts(data));
      if (response.meta?.requestStatus === "fulfilled") {
        toast.warning("Message deleted successfully");
      } else if (response.payload?.error) {
        toast.error(response.payload?.error);
      } else {
        toast.error("Cannot delete message");
      }
    } catch (error) {
      toast.error("Some error occurred");
    }
  };

  const handelUpdate = async (data) => {
    try {
      await dispatch(updateunreadcontent(data));
      // console.log(response);
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };
  return (
    <>
      <TablePage
        contentData={joinedData[0]?.sn ? joinedData : []}
        handelPost={handelpost}
        handelDelete={handelDelete}
        handelUpdate={handelUpdate}
        MsgId={MsgId}
      />
    </>
  );
};

export default Page;
