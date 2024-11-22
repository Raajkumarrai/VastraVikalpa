import React from "react";
import CardsProduct from "../../common/Cards/CardsProduct";
import { Pagination } from "@nextui-org/react";
import { IoIosArrowDown } from "react-icons/io";
import { IoSearchSharp } from "react-icons/io5";

const Products = ({
  heading,
  data,
  setPage,
  page,
  maxPage,
  searchSrt,
  setSearchStr,
  sortDrop,
  setsortDrop,
}) => {
  return (
    <div>
      <div className="flex items-center justify-between gap-2 font-poppins border-b pb-2 border-black/15 text-black/80">
        <div className="text-sm capitalize">
          {data.length} Item{data.length > 1 && "s"} found
        </div>
        <div className="flex gap-2">
          <div className="w-[250px] flex items-center h-[35px] border  border-black/20 rounded-sm relative">
            <input
              type="text"
              name="search"
              id="search"
              className="outline-none absolute inset-0 pr-7 text-sm px-3 bg-transparent h-full w-full"
              value={searchSrt}
              onChange={(e) => setSearchStr(e.target.value)}
              placeholder="Search with name..."
            />
            <IoSearchSharp className="absolute right-1 text-xl text-black/80 hover:text-[var(--text-dark-color)] cursor-pointer" />
          </div>
          <div className="w-[160px] group relative pb-1 text-xs  rounded-sm">
            <div className="h-[35px] flex justify-between pl-3 pr-2 cursor-pointer border font-poppins border-gray-500 rounded-sm items-center w-full">
              {Number(sortDrop) === -1
                ? "Sort Product"
                : Number(sortDrop) === 0
                  ? "Normal"
                  : Number(sortDrop) === 1
                    ? "Aa-Zz"
                    : Number(sortDrop) === 2
                      ? "Zz-Aa"
                      : Number(sortDrop) === 3
                        ? "Price Assending"
                        : "Price Desending"}

              <IoIosArrowDown />
            </div>
            <div className="absolute z-50 top-[37px] bg-slate-50 border border-black/15 rounded-sm hidden group-hover:block w-full right-0">
              <ul>
                <li
                  className="p-2 px-3 cursor-pointer hover:bg-blue-200"
                  onClick={() => setsortDrop(1)}
                >
                  Aa-Zz
                </li>
                <li
                  className="p-2 px-3 cursor-pointer hover:bg-blue-200"
                  onClick={() => setsortDrop(2)}
                >
                  Zz-Aa
                </li>
                <li
                  className="p-2 px-3 cursor-pointer hover:bg-blue-200"
                  onClick={() => setsortDrop(3)}
                >
                  Price Ascending
                </li>
                <li
                  className="p-2 px-3 cursor-pointer hover:bg-blue-200"
                  onClick={() => setsortDrop(4)}
                >
                  Price Descending
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      {data.length > 0 ? (
        <>
          <div className="mt-5 grid-container px-1">
            {data.map((e) => {
              return <CardsProduct key={e._id} data={e} />;
            })}
          </div>
        </>
      ) : (
        <h3 className="w-full text-center mt-32 text-xl font-poppins text-gray-500 font-semibold">
          Sorry!!! Products Are Not Available Now.
        </h3>
      )}
      {maxPage > 1 && (
        <div className="mt-10 float-right" id="pagination">
          <Pagination
            isCompact
            showControls
            total={maxPage}
            initialPage={page}
            onChange={setPage}
          />
        </div>
      )}
    </div>
  );
};

export default Products;
