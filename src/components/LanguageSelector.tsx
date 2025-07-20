import { LanguageCode, LanguageOption } from "@/constants";
import React from "react";

interface LanguageSelectorProps {
  value: string;
  onChange: (value: LanguageCode) => void;
  options: readonly LanguageOption[];
}

const LanguageSelector = ({
  value,
  onChange,
  options,
}: LanguageSelectorProps) => {
  return (
    <div className="w-full border border-gray-500 rounded-md bg-white px-2 py-1">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as LanguageCode)}
        className="w-full"
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LanguageSelector;
