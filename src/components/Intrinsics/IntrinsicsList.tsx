import React from "react";
import { Card, CardBody, CardHeader, Input, NumberInput } from '@heroui/react';
import { Intrinsic } from "@/classes/Intrinsic";
import { TotalMastery } from "@/classes/TotalMastery";
interface IntrinsicsListProps {
  intrinsics: Intrinsic[];
  drifter: boolean;
  updateIntrinsicLevel: (listName: keyof TotalMastery, name: string, level: number) => void;
}

const IntrinsicsList: React.FC<IntrinsicsListProps> = ({intrinsics, drifter, updateIntrinsicLevel}: IntrinsicsListProps) => {
  const category: string = drifter ? "drifterIntrinsics" : "railjackIntrinsics";
  const setIntrinsicLevel = (intrinsic: Intrinsic, newLevel: number) => {
      if (newLevel >= 0 && newLevel <= 10)
        updateIntrinsicLevel(category as keyof TotalMastery, intrinsic.name, newLevel);
      else if (newLevel < 0)
        intrinsic.level = 0;
      else if (intrinsic.level && newLevel > 10)
        intrinsic.level = 10;
    }

  const intrinsicImageSrc = (name: string, drifter: boolean) => 
    drifter ? `./DrifterIntrinsics/${name}.webp` : `./RailjackIntrinsics/${name}.webp`;
return (
  <div className="w-full h-[calc(100vh-16rem)]  px-8 flex gap-6">
    {intrinsics.map((intrinsic) => (
      <Card
        key={intrinsic.name}
        className="flex-1 flex flex-col bg-white/15 backdrop-blur-md border border-white/20 rounded-3xl shadow-xl">
        <CardHeader className="pt-6 pb-2 flex justify-center">
          <h3 className="text-4xl font-semibold text-white text-center">
            {intrinsic.name}
          </h3>
        </CardHeader>
        <CardBody className="flex-1 flex items-center justify-center">
          <img
            alt={`${intrinsic.name}-detail`}
            src={intrinsicImageSrc(intrinsic.name, drifter)}
            className="w-3/4 h-3/4 object-contain opacity-75"/>
        </CardBody>
        <div className="p-6">
          <NumberInput
            value={intrinsic.level}
            label="Current level"
            min={0}
            onValueChange={(val) =>
              setIntrinsicLevel(intrinsic, val)
            }
            size="lg"
            labelPlacement="outside"
            className="w-full"
            classNames={
              {label: "text-white"}}/>
        </div>
      </Card>
    ))}
  </div>
);
};

export default IntrinsicsList;