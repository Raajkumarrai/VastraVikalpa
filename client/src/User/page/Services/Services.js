import React, { useEffect, useState } from "react";
import ServiceLayout from "./ServiceLayout";
import { useParams } from "react-router-dom";
import Breadcrumb from "../../../Dashboard/common/Navigation/BredCrumb";

const Services = ({ data, relatedData }) => {
  const scrollUP = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  useEffect(() => {
    scrollUP();
  }, []);
  const datas = useParams();

  const [filterData, setFilterData] = useState({
    price: "all",
    color: "all",
    gender: "all",
  });

  const [afterFilter, setAfterFilter] = useState([]);

  useEffect(() => {
    const filteredData = data.filter((item) => {
      const priceFilter = () => {
        switch (filterData.price) {
          case "above-10K":
            return item.price > 10000;
          case "10K-8K":
            return item.price >= 8000 && item.price < 10000;
          case "8K-6K":
            return item.price >= 6000 && item.price < 8000;
          case "6K-4K":
            return item.price >= 4000 && item.price < 6000;
          case "4K-2K":
            return item.price >= 2000 && item.price < 4000;
          case "2K-below":
            return item.price < 2000;
          default:
            return true;
        }
      };

      const genderFilter = () => {
        switch (filterData.gender) {
          case "men":
            return Number(item.gendertype) === 1;
          case "women":
            return Number(item.gendertype) === 2;
          case "unisex":
            return Number(item.gendertype) === 3;
          default:
            return true;
        }
      };
      const colorFilter = () => {
        switch (filterData.color) {
          case "white":
            return item.productcolor.includes("white");
          case "black":
            return item.productcolor.includes("black");
          case "red":
            return item.productcolor.includes("red");
          case "green":
            return item.productcolor.includes("green");
          case "other":
            return (
              !item.productcolor.includes("white") &&
              !item.productcolor.includes("black") &&
              !item.productcolor.includes("red") &&
              !item.productcolor.includes("green")
            );
          default:
            return true;
        }
      };

      return priceFilter() && genderFilter() && colorFilter();
    });

    setAfterFilter(filteredData);
  }, [filterData, data]);

  return (
    <div className="min-h-[70vh]">
      <div className="-mb-3 mt-7 text-black/80 capitalize font-semibold font-poppins text-3xl">
        {datas.category} Products
      </div>
      <div className="flex my-5 justify-between items-center">
        <Breadcrumb
          category={"services"}
          categoryLink={"services"}
          subsubcategory={datas.category}
        />
      </div>
      <div>
        <ServiceLayout
          data={afterFilter}
          filterData={filterData}
          setFilterData={setFilterData}
          relatedData={relatedData}
        />
      </div>
    </div>
  );
};

export default Services;
