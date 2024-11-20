import React from "react";
import formatRS from "../../../../libs/FormatRS";
import FindGender from "../../../../libs/FindGender";
import ColorsShow from "../../../../libs/ColorsShow";

const ProductDescription = ({ data }) => {
  const finalPrice = Math.round(
    data.price - (data.price * data.discount) / 100
  );

  return (
    <div className="max-h-[500px] overflow-auto px-4">
      <div className="flex gap-1 flex-col w-full justify-start">
        <h2 className="text-xl text-black/80 mt-5 font-poppins font-semibold">
          {data?.title?.slice(0, 1).toUpperCase() + data?.title?.slice(1)}
        </h2>
        <div className="px-2 flex w-full gap-1 flex-col mb-2">
          <h4 className="flex gap-1 text-black/80">
            <span className="font-semibold">Price:</span>{" "}
            <div className="flex gap-1 items-end ml-1">
              <span className="text-red-600 font-poppins font-semibold">
                {formatRS(finalPrice)}
              </span>
              <div className="ml-2 gap-2 flex mb-1">
                <span className="text-sm line-through">
                  {formatRS(data?.price)}
                </span>
                <span className="text-sm">-{data?.discount}% OFF</span>
              </div>
            </div>
          </h4>
          <div className="flex gap-5">
            <h4 className="flex gap-1 text-black/80">
              <span className="font-semibold">Available Colors:</span>{" "}
              <ColorsShow productColor={data?.productcolor || []} />
            </h4>
          </div>
          <div className="flex gap-5 mb-1">
            <h4 className="flex gap-1 text-black/80">
              <span className="font-semibold">Product for:</span>
              {FindGender(data?.gendertype)}
            </h4>
          </div>
          <div className="flex gap-5">
            <h4 className="flex gap-1 text-black/80">
              <span className="font-semibold">Category:</span>
              {data?.categoryName}
            </h4>
          </div>
        </div>

        <div className="text-black/80  pt-1 flex flex-col ">
          <h3 className="font-poppins font-semibold my-1 mt-2 text-lg">
            Description
          </h3>
          <div className="px-2">
            <div
              className="text-black/80"
              dangerouslySetInnerHTML={{ __html: data?.description }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDescription;
