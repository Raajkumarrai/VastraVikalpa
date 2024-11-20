import React from "react";
import { Link, useLocation } from "react-router-dom";
import URLConverter from "../../../libs/URLConverter";

const SubcategorySmall = ({ category, subcategories }) => {
  const location = useLocation().pathname;

  return (
    <div className="absolute top-9 z-50 min-w-[150px] hidden group-hover:block border border-black/10 rounded bg-gray-100 !py-1">
      <div radius="none">
        <ul>
          {subcategories.map((subcategory, index) => {
            const subcategoryURL = `/${URLConverter(category)}/${URLConverter(subcategory.subCategoryName)}`;
            return (
              <li key={index} className="flex justify-start w-full">
                <Link
                  className={`text-nowrap capitalize py-2 text-sm px-3 w-full ${
                    location === subcategoryURL ? "bg-slate-300" : ""
                  }`}
                  to={subcategoryURL}
                >
                  {subcategory.subCategoryName}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default SubcategorySmall;
