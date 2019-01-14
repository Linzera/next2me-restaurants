import React from "react";
import { Image } from "react-native";

interface IProps {
  image_url: string;
}

export const Avatar = (props: IProps) => (
  <Image
    source={{ uri: props.image_url }}
    style={{
      flex: 1,
      resizeMode: "stretch",
      borderRadius: 20,
      backgroundColor: "gray",
      margin: 15
    }}
  />
);
