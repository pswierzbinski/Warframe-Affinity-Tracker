import React, { useState } from "react";
import { Item } from "../../classes/Item";
import { TotalMastery } from "../../classes/TotalMastery";
import { Card, CardBody, NumberInput, Divider, Checkbox } from "@heroui/react";
import { Pagination } from "@heroui/pagination";
import { ItemImage } from "@/components/Items/ItemImage";

interface ItemListProps {
  items: Item[];
  setLevel: (item: keyof TotalMastery, name: string, level: number) => void;
}
const setMaxLevel = (item: Item) => {
  item.currentLevel = item.maxLevelCap ?? 0;
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
  const totalPages = Math.ceil(items.length / itemsPerPage);
  const startIndex = (page - 1) * itemsPerPage;
  const currentItems = items.slice(startIndex, startIndex + itemsPerPage);

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
      <div className="grid lg:grid-cols-3 gap-6">
        {currentItems.map((item) => {
          const isMaxed = item.currentLevel === item.maxLevelCap;
          return (
            <Card
              key={item.name}
              className="min-h-77.5 bg-white/10 backdrop-blur-md border border-white/15 shadow-lg rounded-xl">
              <CardBody className="p-4 flex flex-col gap-3">
                <div className="text-white text-center text-2xl font-bold  select-text">
                  {item.name}
                </div>
                <div className="grid grid-cols-[auto_1fr] gap-4">
                    <div className="rounded-xl bg-black/20">
                      <ItemImage
                        src={`https://cdn.warframestat.us/img/${item.imageName}`}
                      />
                  </div>

                  <div className="flex flex-col justify-center gap-3">
                    <div className="text-white/80">
                      Current affinity
                      <div className="text-lg text-white leading-none">
                        {item.currentLevel * (affinityPerLevel ?? 0)}
                      </div>
                    </div>
                    <Checkbox
                      isSelected={isMaxed}
                      onValueChange={(checked) =>
                        updateItemLevel(
                          item,
                          checked ? item.maxLevelCap : 0
                        )
                      }
                      classNames={{
                        label: "text-sm text-white/70 group-data-[selected=true]:text-white",
                      }}>
                      Set max level
                    </Checkbox>
                  </div>

                </div>
                <Divider/>
                <NumberInput
                  label="Current level"
                  min={0}
                  max={item.maxLevelCap}
                  value={item.currentLevel}
                  onValueChange={(val) => updateItemLevel(item, val)}
                  className="max-w-full bg-white/5 rounded-lg" />
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