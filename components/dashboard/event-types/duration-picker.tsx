"use client"; // Menandakan bahwa ini adalah komponen client

import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { Input } from "@/components/ui/input";

export function DurationPicker(key?: any, name?: any, defaultValue?: any) {
  const [duration, setDuration] = useState<number | "">(15);

  const incrementDuration = () => {
    setDuration((prev) => (prev === "" ? 1 : prev + 1));
  };

  const decrementDuration = () => {
    setDuration((prev) => (prev === "" || prev <= 5 ? 5 : prev - 1));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim(); // Hilangkan spasi kosong
    if (value === "") {
      setDuration(""); // Biarkan kosong jika user menghapus input
    } else {
      const numericValue = Number(value);
      if (!isNaN(numericValue) && numericValue > 0) {
        setDuration(numericValue);
      }
    }
  };

  return (
    <div className="flex justify-between items-center border rounded-md">
      <Input
        key={key}
        name={name}
        defaultValue={defaultValue}
        placeholder="15"
        value={duration}
        min={5}
        onChange={handleInputChange}
        className="border-0 rounded-none rounded-l-md"
      />
      <div className="flex gap-1 pl-3 items-center">
        <button
          type="button"
          className="hover:bg-accent hover:text-accent-foreground rounded-md p-1"
          onClick={incrementDuration}
        >
          <Plus />
        </button>
        <button
          type="button"
          className="hover:bg-accent hover:text-accent-foreground rounded-md p-1"
          onClick={decrementDuration}
        >
          <Minus />
        </button>
        <span className="mr-3">Minutes</span>
      </div>
    </div>
  );
}
