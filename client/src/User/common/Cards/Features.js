import React from "react";
import {
  RiCustomerService2Fill,
  RiMoneyDollarBoxFill,
  RiSeoFill,
} from "react-icons/ri";
import { MdOutlineWeb } from "react-icons/md";

const Features = () => {
  return (
    <div className="min-h-[100px] mt-5">
      <div className="flex items-center gap-2 mt-5 mb-12">
        <span className="uppercase text-nowrap text-[var(--text-light-color)] font-Orbitron tracking-wider">
          Services
        </span>
        <div className="w-full h-[1px] border-t border-dashed border-[var(--border-dark-color)]"></div>
      </div>
      <div className="grid gap-4 grid-cols-4">
        <div className="min-h-[125px] overflow-hidden group   relative p-2 rounded-md shadow col-span-1 border border-[var(--primary-color)] flex justify-center items-center  beforeContent gap-2 font-Orbitron tracking-wider bg-[var(--browser-color)]">
          <div className="text-[var(--text-dark-color)] !duration-200 group-hover:text-blue-200 select-none text-border-1 text-center text-2xl font-semibold">
            Affordable Web Design
            <RiMoneyDollarBoxFill className="text-3xl inline-block group-hover:text-blue-200 ml-3 text-[var(--text-dark-color)]" />
          </div>
          <div className="absolute opacity-60 !duration-200 group-hover:opacity-80 border border-[var(--border-light-color)] rotate-90 top-1 h-[30px] w-[20px] bg-[var(--primary-color)] rounded-b right-0"></div>
          <div className="absolute opacity-60 !duration-200 group-hover:opacity-80 border border-[var(--border-light-color)] -rotate-90 bottom-1 h-[30px] w-[20px] bg-[var(--primary-color)] rounded-b left-0"></div>
        </div>
        <div className="min-h-[125px] p-2 rounded-md  group  overflow-hidden relative shadow col-span-1 border border-[var(--primary-color)] flex justify-center items-center  beforeContent gap-2 font-Orbitron tracking-wider bg-[var(--browser-color)]">
          <div className="text-[var(--text-dark-color)] !duration-200 group-hover:text-blue-200 select-none text-border-1 text-center text-2xl font-semibold">
            24x7 Customer Support
            <RiCustomerService2Fill className="text-3xl inline-block group-hover:text-blue-200 ml-3 text-[var(--text-dark-color)]" />
          </div>
          <div className="absolute opacity-60 !duration-200 group-hover:opacity-80 border border-[var(--border-light-color)] rotate-90 top-1 h-[30px] w-[20px] bg-[var(--primary-color)] rounded-b right-0"></div>
          <div className="absolute opacity-60 !duration-200 group-hover:opacity-80 border border-[var(--border-light-color)] -rotate-90 bottom-1 h-[30px] w-[20px] bg-[var(--primary-color)] rounded-b left-0"></div>
        </div>
        <div className="min-h-[125px] p-2 rounded-md  group  overflow-hidden relative shadow col-span-1 border border-[var(--primary-color)] flex justify-center items-center  beforeContent gap-2 font-Orbitron tracking-wider bg-[var(--browser-color)]">
          <div className="text-[var(--text-dark-color)] !duration-200 group-hover:text-blue-200 select-none text-border-1 text-center text-2xl font-semibold">
            Proper SEO Optimization
            <RiSeoFill className="text-3xl inline-block group-hover:text-blue-200 ml-3 text-[var(--text-dark-color)]" />
          </div>
          <div className="absolute opacity-60 !duration-200 group-hover:opacity-80 border border-[var(--border-light-color)] rotate-90 top-1 h-[30px] w-[20px] bg-[var(--primary-color)] rounded-b right-0"></div>
          <div className="absolute opacity-60 !duration-200 group-hover:opacity-80 border border-[var(--border-light-color)] -rotate-90 bottom-1 h-[30px] w-[20px] bg-[var(--primary-color)] rounded-b left-0"></div>
        </div>
        <div className="min-h-[125px] p-2 rounded-md  group  overflow-hidden relative shadow col-span-1 border border-[var(--primary-color)] flex justify-center items-center  beforeContent gap-2 font-Orbitron tracking-wider bg-[var(--browser-color)]">
          <div className="text-[var(--text-dark-color)] !duration-200 group-hover:text-blue-200 select-none text-border-1 text-center text-2xl font-semibold">
            Fast Website Development
            <MdOutlineWeb className="text-3xl inline-block group-hover:text-blue-200 ml-3 text-[var(--text-dark-color)]" />
          </div>
          <div className="absolute opacity-60 !duration-200 group-hover:opacity-80 border border-[var(--border-light-color)] rotate-90 top-1 h-[30px] w-[20px] bg-[var(--primary-color)] rounded-b right-0"></div>
          <div className="absolute opacity-60 !duration-200 group-hover:opacity-80 border border-[var(--border-light-color)] -rotate-90 bottom-1 h-[30px] w-[20px] bg-[var(--primary-color)] rounded-b left-0"></div>
        </div>
      </div>
    </div>
  );
};

export default Features;
