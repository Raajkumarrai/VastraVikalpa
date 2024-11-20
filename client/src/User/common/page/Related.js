import React from "react";
import CardsProduct from "../Cards/CardsProduct";

const Related = ({ heading, data }) => {
  return (
    <div className="min-h-[300px] py-10">
      <div className="flex items-center gap-2 mt-0 mb-8">
        <span className="uppercase text-nowrap text-[var(--text-light-color)] font-Orbitron tracking-wider">
          {heading || "Related"}
        </span>
        <div className="w-full h-[1px] border-t border-dashed border-[var(--border-dark-color)]"></div>
      </div>
      <div className="grid-container">
        {data.map((e) => {
          return <CardsProduct key={e._id} data={e} />;
        })}
      </div>
    </div>
  );
};

export default Related;
