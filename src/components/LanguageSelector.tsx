import { LanguageOption } from "@/constants";
import React from "react";

interface LanguageSelectorProps {
  value: string;
  onChange: (value: string) => void;
  options: LanguageOption[];
}

const LanguageSelector = ({
  value,
  onChange,
  options,
}: LanguageSelectorProps) => {
  return (
    <div>
      <select value={value} onChange={(e) => onChange(e.target.value)}>
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
