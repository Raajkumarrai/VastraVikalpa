import React from "react";
import { User } from "@nextui-org/react";
export default function App(props) {
  const data = props.data;
  return (
    <User
      name={data.name}
      description={data.email}
      avatarProps={{
        src: data.image,
      }}
    />
  );
}
