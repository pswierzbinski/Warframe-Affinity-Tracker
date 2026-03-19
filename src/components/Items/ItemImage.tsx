import { Skeleton } from "@heroui/react";
import React from "react";
import NextImage from "next/image";

export function ItemImage({ src }: { src: string }) {
    const [isLoaded, setIsLoaded] = React.useState(false);
    const toggleLoad = () => {
    setIsLoaded(!isLoaded);
  };
  return (
    <Skeleton className="w-30 h-30 3xl:w-40 3xl:h-40 4xl:w-70 4xl:h-70 bac" isLoaded={isLoaded} disableAnimation={true} classNames={{
      base: isLoaded ? "opacity-100" : "opacity-0"
    }}>
      <NextImage onLoad={event => toggleLoad()} alt="Item image" src={src} width={320} height={320} className="w-full h-full object-contain"/>
    </Skeleton >
  );
}