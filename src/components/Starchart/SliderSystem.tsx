import React from "react";
import { Image } from "@heroui/image";
import { MapNode } from "@/classes/MapNode";
import { Card, CardBody, CardHeader, Checkbox } from '@heroui/react';

interface SliderSystemProps {
  systemName: string;
  systemNodes: MapNode[];
  setMastered: (node: MapNode, steelPath: boolean, setTo: boolean) => void;
  setAllMastered: (nodes: MapNode[], steelPath: boolean, setTo: boolean) => void;
}

const SliderSystem: React.FC<SliderSystemProps> = ({ systemName, systemNodes, setMastered , setAllMastered}: SliderSystemProps) => {

  const allDone: boolean = systemNodes.length > 0 && systemNodes.every(node => node.isDone);
  const allSpDone: boolean = systemNodes.length > 0 && systemNodes.every(node => node.steelPathDone);

return (
  <div className="pt-24">
    <Card className="bg-white/15 border border-white/20 overflow-visible">
      <div className="absolute -top-24 left-1/2 -translate-x-1/2">
        <Image
          alt={systemName}
          width={200}
          height={200}
          src={`/Icons/Map/${systemName}.webp`}
          className="object-contain"
        />
      </div>

      <CardHeader className="flex-col pt-28 pb-4 gap-4">
        <h3 className="text-2xl font-semibold text-white tracking-tight">
          {systemName}
        </h3>

        <div className="flex gap-6 text-white/80 px-4 py-2 rounded-xl bg-white/10 ">
          <span>Mark all</span>
          <div>
            <Checkbox
              isSelected={allDone}
              onChange={(e) =>
                setAllMastered(systemNodes, false, e.target.checked)
              }/>
            <span>Normal</span>
          </div>
          <div className="light">
            <Checkbox
              isSelected={allSpDone}
              color="secondary"
              onChange={(e) =>
                setAllMastered(systemNodes, true, e.target.checked)
              }/>
            <span className="text-purple-300">SP</span>
          </div>
        </div>
      </CardHeader>

      <div className="flex px-4 text-xs text-white/60">
        <span className="flex-1">Node</span>
        <div className="flex gap-5 pr-2">
          <span className="w-6 text-center">N</span>
          <span className="w-6 text-center text-purple-300">SP</span>
        </div>
      </div>

      <CardBody className="px-4 divide-y divide-white/10">
        {systemNodes.map((node) => (
          <div
            key={node.name}
            className="flex py-2 hover:bg-white/5">
            <span className="text-sm text-white flex-1 truncate">
              {node.name}
            </span>
            <div className="flex gap-4">
              <Checkbox
                isSelected={node.isDone}
                onChange={(e) =>
                  setMastered(node, false, e.target.checked)
                }/>
              <Checkbox
                isSelected={node.steelPathDone}
                color="secondary"
                className="light"
                onChange={(e) =>
                  setMastered(node, true, e.target.checked)
                }/>
            </div>
          </div>
        ))}
      </CardBody>
    </Card>
  </div>
);
};

export default SliderSystem;