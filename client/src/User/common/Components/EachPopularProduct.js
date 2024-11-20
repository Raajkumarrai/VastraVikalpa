import React from "react";

import { Card, CardFooter, Image, Button } from "@nextui-org/react";

export default function EachPopularProduct() {
  return (
    <Card
      isFooterBlurred
      radius="lg"
      className="border-none !bg-black !rounded-sm"
    >
      <Image
        radius="none"
        isZoomed
        alt="Woman listing to music"
        className="object-cover !opacity-70 w-full h-full max-w-[350px] max-h-[350px]"
        src="https://time.com/shopping/static/cd09eba6652ee627f5e53b645dbd36fa/57e17/best-online-jewelry-stores.jpg"
      />
      <CardFooter className="justify-between !rounded-sm before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
        <p className="text-tiny text-white/80">Available now.</p>
        <Button
          className="text-tiny text-white bg-black/20 hover:bg-black/60  rounded-sm"
          variant="flat"
          color="default"
          radius="none"
          size="sm"
        >
          Buy Now
        </Button>
      </CardFooter>
    </Card>
  );
}
