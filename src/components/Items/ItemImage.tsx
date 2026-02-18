import { Skeleton, Image } from "@heroui/react";
import React from "react";
// This separate component exists for the purpose of better future introduction of skeletons
export function ItemImage({ src }: { src: string }) {
  return (
    <Image src={src} width={160} height={160}/>
  );
}