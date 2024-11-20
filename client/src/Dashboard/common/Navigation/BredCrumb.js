import React from "react";
import { Breadcrumbs, BreadcrumbItem } from "@nextui-org/react";
import { Link } from "react-router-dom";

const BredCrumbFun = ({
  category,
  categoryLink,
  subcategory,
  subcategoryLink,
  subsubcategory,
  subsubcategoryLink,
}) => {
  return (
    <Breadcrumbs>
      <BreadcrumbItem>
        <Link to={"/dashboard"}>Dashboard</Link>
      </BreadcrumbItem>
      {category && (
        <BreadcrumbItem>
          <Link className="capitalize mb-[1px]" to={categoryLink}>
            {category}
          </Link>
        </BreadcrumbItem>
      )}
      {subcategory && (
        <BreadcrumbItem>
          <Link className="capitalize mb-[1px]" to={subcategoryLink}>
            {subcategory}
          </Link>
        </BreadcrumbItem>
      )}
      {subsubcategory && (
        <BreadcrumbItem>
          <Link className="capitalize mb-[1px]" to={subsubcategoryLink}>
            {subsubcategory}
          </Link>
        </BreadcrumbItem>
      )}
    </Breadcrumbs>
  );
};

export default BredCrumbFun;
