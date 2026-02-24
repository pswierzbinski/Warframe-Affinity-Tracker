import { Image } from "@heroui/react";
import React from "react";
import NextImage from "next/image";

export function ItemImage({ src }: { src: string }) {
  return (
    <div className="max-w-30 max-h-30 3xl:max-w-40 3xl:max-h-40 4xl:max-w-70 4xl:max-h-70">
      <NextImage  alt="Item image" src={src} width={320} height={320} className="w-full h-full object-contain"/>
    </div>
  );
}