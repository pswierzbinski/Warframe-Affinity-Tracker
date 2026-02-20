import { Image } from "@heroui/react";
import React from "react";

export function ItemImage({ src }: { src: string }) {
  return (
    <Image classNames={{wrapper:"bg-black/10"}} disableAnimation={true} src={src} width={160} height={160}/>
  );
}