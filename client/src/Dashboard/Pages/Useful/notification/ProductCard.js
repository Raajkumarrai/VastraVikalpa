import React from "react";

import { Card, CardBody, CardFooter, Image } from "@nextui-org/react";

export default function App() {
  return (
    <Card shadow="sm" isPressable onPress={() => console.log("item pressed")}>
      <CardBody className="overflow-visible p-0">
        <Image
          shadow="sm"
          radius="lg"
          width="100%"
          alt="Jhumka"
          className="w-full object-cover h-[140px]"
          src={
            "https://time.com/shopping/static/cd09eba6652ee627f5e53b645dbd36fa/57e17/best-online-jewelry-stores.jpg"
          }
        />
      </CardBody>
      <CardFooter className="text-small justify-between">
        <b>Jhumka</b>
        <p className="text-default-500">RS 500</p>
      </CardFooter>
    </Card>
  );
}
