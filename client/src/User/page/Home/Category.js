import React from "react";
import EachCategory from "../../common/Components/EachCategory";

const Category = ({ data }) => {
  return (
    <div className="mt-5">
      <div className="row px-xl-5 grid-containerCard ">
        {data.map((e, index) => {
          return <EachCategory data={e} key={index} />;
        })}
      </div>
    </div>
  );
};

export default Category;
