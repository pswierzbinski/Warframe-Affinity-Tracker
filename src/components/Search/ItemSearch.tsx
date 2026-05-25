import { useGlobal } from "@/context/GlobalContext";
import React, { useEffect, useState } from "react";
import { Input } from "@heroui/react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";



function useDebounce<T>(value: T, delay: number = 500): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}
interface SearchProps {
  mobile: boolean;
}
const ItemSearch: React.FC<SearchProps> = ({ mobile }) => {
  const [value, setValue] = useState("");
  const { searchName, setSearchName } = useGlobal();
  const debouncedValue = useDebounce(value, 500);

  useEffect(() => {
    setSearchName(debouncedValue);
  }, [debouncedValue]);

  if (!mobile)
    return (
      <div className="ml-2 text-white">
        <Input
          label="Filter item name"
          placeholder="Enter the item name"
          value={value}
          color="primary"
          className="w-38"
          onValueChange={setValue}
          isClearable
          classNames={{
            clearButton: "text-white",
            label: "text-white",
            input: "text-white placeholder:text-white/50",
            inputWrapper: "bg-white/10 border border-white/20 data-[hover=true]:bg-white/15 focus-within:bg-white/15",
          }}
        />
      </div>
    );
  // mobile version
  else
    return (
      <div className="text-white w-full">
        <Input
          label="Filter items"
          isClearable
          value={value}
          color="primary"
          onValueChange={setValue}
          classNames={{
            clearButton: "text-white",
            label: "text-white",
            base: "w-full",
            input: "text-white placeholder:text-white/50",
            inputWrapper: "bg-white/10 border border-white/20 data-[hover=true]:bg-white/15 focus-within:bg-white/15",
          }}
          startContent={
            <MagnifyingGlassIcon className="size-4 text-white" />
          }
        />
      </div>);
};

export default ItemSearch;