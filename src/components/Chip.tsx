import { ChipOption } from "@/constants";
import React from "react";

interface ChipType {
  label: ChipOption;
  onClick: (option: ChipOption) => void;
  isSelected: boolean;
}

const Chip: React.FC<ChipType> = ({ label, onClick, isSelected }) => {
  return (
    <button
      type="button"
      onClick={() => onClick(label)}
      className={`border rounded-full py-1 px-2 text-sm font-medium transition-colors duration-100 ${
        isSelected
          ? "bg-blue-50 border-blue-400 text-blue-600"
          : "bg-gray-50 border-gray-400 text-gray-600"
      } `}
    >
      {label}
    </button>
  );
};

export default Chip;
