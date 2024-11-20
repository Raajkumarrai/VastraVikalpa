import { Card } from "@nextui-org/react";
import Lottie from "lottie-react";
import React from "react";
import { IoCallSharp } from "react-icons/io5";
import Animat from "../../../Assets/animation1.json";

const ContactList = () => {
  return (
    <div className="w-full min-h-screen py-10 overflow-hidden relative">
      <div className="flex z-10 w-[66%] mx-auto justify-center items-center flex-col gap-6">
        <h2 className="text-[3.5rem] text-[var(--primary-color)] tracking-wide text-border font-Orbitron font-bold">
          Get Site Faster
        </h2>
        <h3 className="text-[2.3rem] text-center text-[var(--text-dark-color)] font-Orbitron tracking-wide font-semibold">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit.
        </h3>
        <p className="text-xl font-poppins text-center text-[var(--text-light-color)]">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sint,
          numquam rem impedit illum veniam beatae commodi laborum quis
          distinctio veritatis!
        </p>
        <Card
          variant="ghost"
          color="primary"
          className="uppercase font-poppins inline-block px-9 py-4 rounded-full mt-5 border  border-dark-color text-dark-color buttonBg hover:border-[var(--border-dark-color)] hover:bg-[var(--border-light-color)] text-sm tracking-wider hover:tracking-widest"
          radius="none"
          shadow="none"
          isPressable
        >
          <div className="flex text-base text-primary-color justify-center gap-1 border-dark-color font-semibold duration-150 items-center">
            <IoCallSharp className="text-xl" />
            +977 9810000000
          </div>
        </Card>
        <div className="mt-7 z-10 mb-14">
          <Lottie animationData={Animat} />
        </div>
        <div className="z-[1] flex flex-row-reverse gap-1 absolute top-[400px] -right-5 rotate-45">
          <div className="h-[300px] shadow w-[40px] border buttonBg border-[var(--primary-color)] rounded-b-full"></div>
          <div className="h-[240px] shadow w-[40px] border buttonBg border-[var(--primary-color)] rounded-b-full"></div>
          <div className="h-[180px] shadow w-[40px] border buttonBg border-[var(--primary-color)] rounded-b-full"></div>
        </div>
      </div>
    </div>
  );
};

export default ContactList;
