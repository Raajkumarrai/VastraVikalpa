import React from "react";
import Main from "../Main";
import { useParams } from "react-router-dom";

const Profileid = () => {
  const params = useParams();
  return (
    <>
      <Main userId={params.id} />
    </>
  );
};

export default Profileid;
