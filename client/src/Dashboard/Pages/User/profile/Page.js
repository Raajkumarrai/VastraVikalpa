import React, { useEffect, useState } from "react";
import Main from "./Main";
import { useSelector } from "react-redux";

const Page = () => {
  const [userDatalocal, setUserDatalocal] = useState(null);
  const { renderPage } = useSelector((state) => state.authReducer);

  useEffect(() => {
    const updateUserFromLocalStorage = () => {
      const userDataString = localStorage.getItem("data");
      if (userDataString) {
        const userData = JSON.parse(userDataString);
        setUserDatalocal(userData);
      }
    };
    updateUserFromLocalStorage();
    window.addEventListener("storage", updateUserFromLocalStorage);
    return () => {
      window.removeEventListener("storage", updateUserFromLocalStorage);
    };
  }, [renderPage]);

  return <>{userDatalocal && <Main userId={userDatalocal._id} />}</>;
};

export default Page;
