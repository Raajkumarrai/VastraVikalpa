import { Checkbox } from "@nextui-org/react";
import React from "react";

const FilterProduct = () => {
  return (
    <>
      <div className="shadow px-4 flex flex-col gap-4 py-2 pb-5">
        <div>
          <div className="font-semibold mb-2">Filter With Price</div>
          <div className="flex !font-semibold flex-col gap-2 ml-1">
            <div className="flex justify-between">
              <Checkbox defaultSelected radius="sm">
                ALL
              </Checkbox>
              <div className="border px-2">1000</div>
            </div>
            <div className="flex justify-between">
              <Checkbox radius="sm">$1000-$900</Checkbox>
              <div className="border px-2">580</div>
            </div>
            <div className="flex justify-between">
              <Checkbox radius="sm">$900-$800</Checkbox>
              <div className="border px-2">200</div>
            </div>
            <div className="flex justify-between">
              <Checkbox radius="sm">$800-$700</Checkbox>
              <div className="border px-2">189</div>
            </div>
            <div className="flex justify-between">
              <Checkbox radius="sm">$700-$600</Checkbox>
              <div className="border px-2">300</div>
            </div>
            <div className="flex justify-between">
              <Checkbox radius="sm">$600-$500</Checkbox>
              <div className="border px-2">125</div>
            </div>
          </div>
        </div>
        <hr />
        <div>
          <div className="font-semibold mb-2">Filter With Price</div>
          <div className="flex !font-semibold flex-col gap-2 ml-1">
            <div className="flex justify-between">
              <Checkbox defaultSelected radius="sm">
                ALL
              </Checkbox>
              <div className="border px-2">1000</div>
            </div>
            <div className="flex justify-between">
              <Checkbox radius="sm">3XL</Checkbox>
              <div className="border px-2">580</div>
            </div>
            <div className="flex justify-between">
              <Checkbox radius="sm">2XL</Checkbox>
              <div className="border px-2">200</div>
            </div>
            <div className="flex justify-between">
              <Checkbox radius="sm">XL</Checkbox>
              <div className="border px-2">189</div>
            </div>
            <div className="flex justify-between">
              <Checkbox radius="sm">LG</Checkbox>
              <div className="border px-2">300</div>
            </div>
            <div className="flex justify-between">
              <Checkbox radius="sm">SM</Checkbox>
              <div className="border px-2">125</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FilterProduct;
