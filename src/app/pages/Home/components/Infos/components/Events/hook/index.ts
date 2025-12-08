import { useState } from "react";

export const useEvents = () => {
  const [dropDown, setDropDown] = useState<number | null>(null);

  const handleDropdown = (id: number) => {
    setDropDown((prev) => prev === id ? null : id);
  }

  return {  dropDown, handleDropdown };
}