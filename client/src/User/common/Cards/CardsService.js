import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardFooter, Image, Button } from "@nextui-org/react";

export default function CardsService({ data }) {
  const navigate = useNavigate();

  // const handleExploreClick = () => {
  //   navigate(`/products/${data.id}`);
  // };

  return (
    <Card
      radius="none"
      isFooterBlurred
      className="border-none w-full h-[250px] !rounded !overflow-hidden"
      id="mainCardLink"
    >
      <Image
        isZoomed={false}
        shadow="sm"
        radius="none"
        width={300}
        alt="Image not found!"
        className="w-full absolute object-cover image-transition"
        src={data.image}
        style={{ height: "250px" }}
      />
      <CardFooter className="before:bg-white/30 border-white/20 rounded border-1 overflow-hidden py-1 absolute bottom-1 w-[calc(100%_-_8px)] shadow-small bg-white/50 ml-1 flex justify-center z-10">
        <p className="text-xs line-clamp-1 capitalize font-poppins block !text-start pl-1 font-semibold -ml-2 !-tracking-wide font-poppins min-w-[140px]">
          {data.title}
        </p>
        {/* <Button
          className="rounded bg-white/40 border border-black/20 tracking-wide !p-3 font-semibold font-poppins text-[.65rem] -mr-2 scale-95"
          variant="flat"
          color="default"
          radius="none"
          size="sm"
          onClick={handleExploreClick}
        >
          Explore
        </Button> */}
      </CardFooter>
    </Card>
  );
}
