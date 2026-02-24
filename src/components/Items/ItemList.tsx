import React, { useState } from "react";
import { Item } from "../../classes/Item";
import { TotalMastery } from "../../classes/TotalMastery";
import { Card, CardBody, NumberInput, Divider, Checkbox } from "@heroui/react";
import { Pagination } from "@heroui/pagination";
import { ItemImage } from "@/components/Items/ItemImage";
import { useGlobal } from '@/context/GlobalContext';

interface ItemListProps {
  items: Item[];
  setLevel: (item: keyof TotalMastery, name: string, level: number) => void;
}

export const CheckIcon = (props: any) => {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height="1em"
      stroke="white"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={3}
      viewBox="0 0 24 24"
      width="1em"
      {...props}
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
};

const ItemList: React.FC<ItemListProps> = ({ items, setLevel }: ItemListProps) => {
  const [page, setPage] = useState(1);
  const itemsPerPage = 9;
  const { hideMastered, setHideMastered } = useGlobal();
  const tempItems = items.filter((item) => !hideMastered || item.currentLevel != item.maxLevelCap);
  const totalPages = Math.ceil(tempItems.length / itemsPerPage);
  const startIndex = (page - 1) * itemsPerPage;
  const currentItems = tempItems.slice(startIndex, startIndex + itemsPerPage);

  const updateItemLevel = (item: Item, newLevel: number) => {
    if (newLevel >= 0 && item.maxLevelCap && newLevel <= item.maxLevelCap)
      setLevel(item.category as keyof TotalMastery, item.name, newLevel);
    else if (newLevel < 0)
      item.currentLevel = 0;
    else if (item.maxLevelCap && newLevel > item.maxLevelCap)
      item.currentLevel = item.maxLevelCap;
  }

  const higherMastery: string[] = ["Warframes", "Pets", "Sentinels", "Kdrives", "Necramech", "Archwing",]
  const affinityPerLevel = higherMastery.includes(items[0].category) ? 200 : 100;
  return (
    <div>
      <div className="grid lg:grid-cols-3 gap-4">
        {currentItems.map((item) => {
          const isMaxed = item.currentLevel === item.maxLevelCap;
          return (
            <Card
              key={item.name}
              className="3xl:max-h-55 4xl:max-h-80 bg-white/10 backdrop-blur-md border border-white/15 shadow-lg rounded-xl">
              <CardBody className="p-4 4xl:p-4  gap-3">

                <div className="grid grid-cols-[auto_1fr] gap-4">
                  <div className="rounded-xl bg-black/20 h-fit self-center">
                    <ItemImage
                      src={`https://cdn.warframestat.us/img/${item.imageName}`}
                    />
                  </div>
                  <div className="flex flex-col ">
                    <div className="text-white text-center text-2xl font-bold select-text">
                      {item.name}
                    </div>
                    <div className="flex flex-row 4xl:flex-col flex-1 justify-center 3xl:self-start">
                      <div className="text-white/80 self-center pr-3">
                        Current affinity: <a className="text-lg text-white leading-none ml-1">{item.currentLevel * (affinityPerLevel ?? 0)}</a>
                      </div>
                        <Checkbox
                          isSelected={isMaxed}
                          size="md"
                          onValueChange={(checked) =>
                            updateItemLevel(
                              item,
                              checked ? item.maxLevelCap : 0
                            )
                          }
                          classNames={{
                            label: "text-md text-white/70 group-data-[selected=true]:text-white",
                          }}>
                          Set max level
                        </Checkbox>
                    </div>
                    <Divider className="mb-2"/>
                    <NumberInput
                          label="Current level"
                          variant="faded"
                          minValue={0}
                          maxValue={item.maxLevelCap}
                          value={item.currentLevel}
                          onValueChange={(val) => updateItemLevel(item, val)}
                          className="max-w-full bg-white/5 rounded-lg"
                          classNames={{
                            input: "text-md",
                            label: "text-white 2xl:text-lg",
                            stepperWrapper:"flex flex-row-reverse",
                            stepperButton: "w-9 h-9 border-2 border-black/20"
                          }}
                        />
                  </div>
                </div>
              </CardBody>
            </Card>
          );
        })}
      </div>
      {totalPages > 1 && (
        <div className="flex justify-center mt-5">
          <Pagination
            page={page}
            total={totalPages}
            onChange={setPage}
          />
        </div>
      )}
    </div>
  );
};

export default ItemList;