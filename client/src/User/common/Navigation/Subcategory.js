import { Card, CardBody, Image } from "@nextui-org/react";
import React from "react";

const Subcategory = () => {
  return (
    <div>
      <Card
        radius="none"
        className={`absolute !rounded-sm !p-2 !m-0 top-9 z-50 hidden group-hover:block navcard`}
      >
        <div className=" py-0">
          <ul className="flex gap-3 flex-col h-[280px] md:flex-row">
            <li className="!min-h-[250px] flex justify-between flex-col">
              <Card
                isPressable
                radius="none"
                shadow="none"
                className="w-[250px] !rounded-sm h-[65px] p-2 pt-1 cursor-pointer hover:bg-[#24657018]"
              >
                <div radius="none">
                  <h3 className="w-full !text-start font-semibold text-sm tracking-wide">
                    Heading
                  </h3>
                  <p className="w-full !text-start text-xs">
                    Make beautiful websites regardless of your design
                    experience.
                  </p>
                </div>
              </Card>
              <Card
                isPressable
                radius="none"
                shadow="none"
                className="w-[250px] !rounded-sm h-[65px] p-2 pt-1 cursor-pointer hover:bg-[#24657018]"
              >
                <div radius="none">
                  <h3 className="w-full !text-start font-semibold text-sm tracking-wide">
                    Heading
                  </h3>
                  <p className="w-full !text-start text-xs">
                    Make beautiful websites regardless of your design
                    experience.
                  </p>
                </div>
              </Card>
              <Card
                isPressable
                radius="none"
                shadow="none"
                className="w-[250px] !rounded-sm h-[65px] p-2 pt-1 cursor-pointer hover:bg-[#24657018]"
              >
                <div radius="none">
                  <h3 className="w-full !text-start font-semibold text-sm tracking-wide">
                    Heading
                  </h3>
                  <p className="w-full !text-start text-xs">
                    Make beautiful websites regardless of your design
                    experience.
                  </p>
                </div>
              </Card>
              <Card
                isPressable
                radius="none"
                shadow="none"
                className="w-[250px] !rounded-sm h-[65px] p-2 pt-1 cursor-pointer hover:bg-[#24657018]"
              >
                <div radius="none">
                  <h3 className="w-full !text-start font-semibold text-sm tracking-wide">
                    Heading
                  </h3>
                  <p className="w-full !text-start text-xs">
                    Make beautiful websites regardless of your design
                    experience.
                  </p>
                </div>
              </Card>
            </li>
            <li className="!h-full flex flex-col gap-2 justify-between">
              <div className="h-[200px]">
                <Card
                  radius="none"
                  shadow="sm"
                  className="md:min-w-[200px] !h-full w-full !rounded-sm"
                  isPressable
                  // onPress={() => console.log("item pressed")}
                >
                  <CardBody className="overflow-visible p-0">
                    <Image
                      radius="none"
                      width="100% "
                      alt={"this is profile"}
                      isZoomed
                      className="w-full h-full object-cover"
                      src={
                        "https://images.unsplash.com/photo-1696945157988-5dbff7a97d02?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1964&q=80"
                      }
                    />
                  </CardBody>
                </Card>
              </div>
              <Card
                isPressable
                radius="none"
                shadow="none"
                className="w-[250px] !rounded-sm h-[65px] p-2 pt-1 cursor-pointer hover:bg-[#24657018]"
              >
                <div radius="none">
                  <h3 className="w-full !text-start font-semibold text-sm tracking-wide">
                    Heading
                  </h3>
                  <p className="w-full !text-start text-xs">
                    Make beautiful websites regardless of your design
                    experience.
                  </p>
                </div>
              </Card>
            </li>
          </ul>
        </div>
      </Card>
    </div>
  );
};

export default Subcategory;
