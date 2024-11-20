import React from "react";
import FilterProduct from "./FilterProduct";
import EachProduct from "../../common/Components/EachProduct";

const About = () => {
  return (
    <div className="grid grid-cols-12 gap-x-4">
      <div className="col-span-3">
        <FilterProduct />
      </div>
      <div className="col-span-9">
        <div className="grid-containerCard">
          <EachProduct />
          <EachProduct />
          <EachProduct />
          <EachProduct />
          <EachProduct />
          <EachProduct />
          <EachProduct />
          <EachProduct />
          <EachProduct />
        </div>
      </div>
    </div>
  );
};

export default About;
