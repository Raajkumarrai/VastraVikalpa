import React from "react";
import Pagesab from "../Page";
import { useParams } from "react-router-dom";

const EachMsg = () => {
  const params = useParams();
  return (
    <div>
      <Pagesab MsgId={params.id} />
    </div>
  );
};

export default EachMsg;
