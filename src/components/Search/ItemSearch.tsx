import { useGlobal } from "@/context/GlobalContext";
import React, { useEffect, useState } from "react";
import {Input} from "@heroui/react";


function useDebounce<T>(value: T, delay: number = 500): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}

const ItemSearch: React.FC = () => {
  const [value, setValue] = useState("");
  const { searchName, setSearchName } = useGlobal();
  const debouncedValue = useDebounce(value, 500);

  useEffect(() => {
    setSearchName(debouncedValue);
  }, [debouncedValue]);

  return (
<div className="ml-2 text-white">
  <Input 
    label="Filter item name" 
    placeholder="Enter the item name" 
    value={value} 
    color="primary"
    className="w-38"
    onValueChange={setValue}
    classNames={{
      label: "text-white",
      input: "text-white placeholder:text-white/50",
      inputWrapper: "bg-white/10 backdrop-blur-md border border-white/20 data-[hover=true]:bg-white/15 focus-within:bg-white/15",
    }}
  />
</div>
  );
};

export default ItemSearch;