import React, { useEffect, useState } from "react";
import Services from "../Services/Services";
import GetRelatedProductAll from "../../../libs/GetRelatedProductAll";
import { useParams } from "react-router-dom";
import URLConverter from "../../../libs/URLConverter";

const Page = () => {
  const { category, subcategory } = useParams();
  const [relatedData, setRelatedData] = useState([]);
  const GetRelatedData = async () => {
    const data = await GetRelatedProductAll();
    setRelatedData(data || []);
  };
  useEffect(() => {
    GetRelatedData();
  }, []);

  let filterdata = [];
  if (subcategory) {
    filterdata = relatedData.filter(
      (e) =>
        URLConverter(e.subcategoryName) === subcategory &&
        URLConverter(e.categoryName) === category
    );
  } else {
    filterdata = relatedData.filter(
      (e) => URLConverter(e.categoryName) === category
    );
  }

  return (
    <div className="mx-5">
      <Services data={filterdata} relatedData={relatedData} />
    </div>
  );
};

export default Page;
