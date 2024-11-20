import React, { useCallback, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import BreadCrumbs from "../../common/Navigation/BreadCrumb";
import EachSiteContent from "./EachSiteContent";
import { Tab, Tabs } from "@nextui-org/react";
import Related from "../../common/page/Related";
import { useDispatch } from "react-redux";
import { getSingleProduct } from "../../../redux/slices/productSlice";
import ProductComments from "./Tabs/ProductComments";
import ProductDescription from "./Tabs/ProductDescription";
import GetRelatedProductCategory from "../../../libs/GetRelatedProductCategory";

const EachSite = () => {
  const data = useParams();
  const scrollUP = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  useEffect(() => {
    scrollUP();
  }, []);
  const dispatch = useDispatch();
  const userRef = useRef(false);
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
  const singledata = useCallback(async () => {
    let singleData = await dispatch(getSingleProduct(data.id));
    setProductDataFinal(singleData.payload);
  }, [dispatch, data.id]);

  useEffect(() => {
    if (userRef.current === false) {
      singledata();
    }
    return () => {
      userRef.current = true;
    };
  }, [singledata]);

  useEffect(() => {
    if (productDataFinal) {
      GetRelatedData(productDataFinal ? productDataFinal?.categoryId : "");
    }
  }, [productDataFinal]);

  const GetRelatedData = async (id) => {
    if (id) {
      const data = await GetRelatedProductCategory(id ? id : "");
      setRelatedData(data ? data : []);
    }
  };

  return (
    <>
      <div className="min-h-[50vh] flex gap-5 flex-col w-full px-4">
        <div>
          <div className="-mb-3 mt-7 text-black/80 capitalize font-semibold font-poppins text-3xl">
            {data.subcategory || data.category} Product
          </div>
          <div className="flex justify-between items-center">
            <BreadCrumbs
              category={data.category}
              categoryLink={data.category}
              subcategory={data.subcategory}
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
