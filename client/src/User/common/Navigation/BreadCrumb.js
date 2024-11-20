import React from "react";
import { Breadcrumbs, BreadcrumbItem } from "@nextui-org/react";
import { Link } from "react-router-dom";

export default function BreadCrumbs({
  category,
  subcategory,
  subsubcategory,
  subsubsubcategory,
  categoryLink,
  subcategoryLink,
  subsubcategoryLink,
}) {
  return (
    <div className="py-7">
      <Breadcrumbs className="custom-breadcrumbs !capitalize">
        <BreadcrumbItem>
          <Link to={"/"}>Home</Link>
        </BreadcrumbItem>
        {category && (
          <BreadcrumbItem>
            {categoryLink ? (
              <Link to={`/${categoryLink}`}>{category}</Link>
            ) : (
              <Link className="!cursor-default">{category}</Link>
            )}
          </BreadcrumbItem>
        )}
        {subcategory && (
          <BreadcrumbItem>
            {subcategoryLink ? (
              <Link to={`/${categoryLink}/${subcategoryLink}`}>
                {subcategory}
              </Link>
            ) : (
              <Link className="!cursor-default">{subcategory}</Link>
            )}
          </BreadcrumbItem>
        )}
        {subsubcategory && (
          <BreadcrumbItem>
            {subsubcategoryLink ? (
              <Link
                to={`/${categoryLink}/${subcategoryLink}/${subsubcategoryLink}`}
              >
                {subsubcategory}
              </Link>
            ) : (
              <Link className="!cursor-default">{subsubcategory}</Link>
            )}
          </BreadcrumbItem>
        )}
        {subsubsubcategory && (
          <BreadcrumbItem>
            <Link className="!cursor-default">{subsubsubcategory}</Link>
          </BreadcrumbItem>
        )}
      </Breadcrumbs>
    </div>
  );
}
