import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BreadCrumbs from "../../common/Navigation/BreadCrumb";
import EachSiteContent from "./EachSiteContent";
import { Tab, Tabs } from "@nextui-org/react";
import Related from "../../common/page/Related";
import ProductComments from "./Tabs/ProductComments";
import ProductDescription from "./Tabs/ProductDescription";
import GetRelatedProductCategory from "../../../libs/GetRelatedProductCategory";
import { API_BASE_URL } from "../../../redux/config";
import axios from "axios";

const EachSite = () => {
  const { id, category, subcategory } = useParams();
  const [relatedData, setRelatedData] = useState([]);
  const [productDataFinal, setProductDataFinal] = useState({
    address: "",
    categoryId: "",
    categoryName: "",
    comment: [],
    date: "",
    description: "",
    discount: 0,
    gendertype: ``,
    image: [""],
    like: false,
    likeId: [],
    maxQuantity: 0,
    phNumber: 0,
    price: 0,
    productcolor: [""],
    subcategoryId: null,
    title: "",
    _id: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/post/blog/${id}`);
        setProductDataFinal(response.data);
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };
    fetchData();
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [id]);
  const GetRelatedData = async (catId) => {
    if (catId) {
      const data = await GetRelatedProductCategory(catId);
      const finalData = data.filter((e) => String(e._id) !== String(id));
      setRelatedData(finalData || []);
    }
  };

  useEffect(() => {
    if (productDataFinal) {
      GetRelatedData(productDataFinal.categoryId);
    }
    // eslint-disable-next-line
  }, [productDataFinal, id]);

  return (
    <>
      <div className="min-h-[50vh] flex gap-5 flex-col w-full px-4">
        <div>
          <div className="-mb-3 mt-7 text-black/80 capitalize font-semibold font-poppins text-3xl">
            {productDataFinal.title}
          </div>
          <div className="flex justify-between items-center">
            <BreadCrumbs
              category={category}
              categoryLink={category}
              subcategory={subcategory}
            />
          </div>
          <EachSiteContent data={productDataFinal} />
        </div>
        <div className="min-h-[300px] mt-3 flex-row">
          <div className="flex items-center gap-5">
            <div className="w-full">
              <Tabs radius="none" variant="bordered" aria-label="Tabs variants">
                <Tab key="comments" title="Product Comments">
                  <ProductComments />
                </Tab>
                <Tab key="details" title="Product Details">
                  <ProductDescription data={productDataFinal} />
                </Tab>
              </Tabs>
            </div>
          </div>
        </div>
        <Related data={relatedData} />
      </div>
    </>
  );
};

export default EachSite;
