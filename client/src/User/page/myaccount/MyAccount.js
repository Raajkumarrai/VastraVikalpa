import React from "react";
import { useParams } from "react-router-dom";
import Main from "../../../Dashboard/Pages/User/profile/Main";

const Profileid = () => {
  const params = useParams();
  return (
    <>
      <Main userId={params.id} />
    </>
  );
};

export default Profileid;
