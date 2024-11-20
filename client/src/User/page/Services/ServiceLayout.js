import React, { useState } from "react";
import Filter from "./Filter";
import Products from "./Products";
import Services from "../../common/page/Services";
import Related from "../../common/page/Related";

const ServiceLayout = ({ data, filterData, setFilterData, relatedData }) => {
  const finalrelatedData = relatedData
    .sort((a, b) => b.date - a.date)
    .slice(0, 7);
  const [page, setPage] = useState(1);

  // =================== for filter (start)================
  const [searchSrt, setSearchStr] = useState("");
  const [sortDrop, setsortDrop] = useState(-1);

  const afterSearch =
    searchSrt.length > 2
      ? data.filter((e) =>
          e.title.toLowerCase().includes(searchSrt.toLowerCase())
        )
      : data;

  const sortAscending = (a, b) => a.title.localeCompare(b.title);
  const sortDescending = (a, b) => b.title.localeCompare(a.title);
  const sortByPriceAscending = (a, b) => a.price - b.price;
  const sortByPriceDescending = (a, b) => b.price - a.price;

  let lastSearch;

  if (Number(sortDrop) !== -1) {
    if (Number(sortDrop) === 0) {
      lastSearch = afterSearch;
    } else if (Number(sortDrop) === 1) {
      lastSearch = afterSearch.sort(sortAscending);
    } else if (Number(sortDrop) === 2) {
      lastSearch = afterSearch.sort(sortDescending);
    } else if (Number(sortDrop) === 3) {
      lastSearch = afterSearch.sort(sortByPriceAscending);
    } else if (Number(sortDrop) === 4) {
      lastSearch = afterSearch.sort(sortByPriceDescending);
    } else {
      lastSearch = afterSearch.sort((a, b) => b.date - a.date);
    }
  } else {
    lastSearch = afterSearch;
  }

  // =================== for filter (end)================

  const itemsPerPage = 15;
  const maxPage = Math.ceil(lastSearch.length / itemsPerPage);

  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const slicedData = lastSearch.slice(startIndex, endIndex);

  return (
    <div className="grid gap-7 px-2 grid-cols-11">
      <div className="w-full flex flex-col col-span-3 ">
        <div className="border shadow border-black/5 rounded p-3 py-5">
          <Filter filterData={filterData} setFilterData={setFilterData} />
        </div>
      </div>
      <div className="w-full col-span-8">
        <Products
          data={slicedData}
          setPage={setPage}
          page={page}
          maxPage={maxPage}
          searchSrt={searchSrt}
          setSearchStr={setSearchStr}
          sortDrop={sortDrop}
          setsortDrop={setsortDrop}
        />
      </div>
      <div className="col-span-11">
        <div>
          <Services />
        </div>
        <div>
          <Related data={finalrelatedData || []} />
        </div>
      </div>
    </div>
  );
};

export default ServiceLayout;
