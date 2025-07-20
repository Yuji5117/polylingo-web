"use client";

import Chip from "@/components/Chip";
import LanguageSelector from "@/components/LanguageSelector";
import TextInputArea from "@/components/TextInputArea";
import {
  CHIP_OPTIONS,
  ChipOption,
  LANGUAGE_OPTIONS,
  LanguageCode,
} from "@/constants";
import { ArrowRightLeft } from "lucide-react";
import { useState } from "react";

export default function Home() {
  const [fromLanguage, setFromLanguage] = useState<LanguageCode>("en");
  const [toLanguage, setToLanguage] = useState<LanguageCode>("ja");
  const [text, setText] = useState<string>("");
  const [selectedChips, setSelectedChips] = useState<ChipOption[]>([]);

  const isDisabled = text === "";

  const handleSwapLanguage = () => {
    const temp = fromLanguage;
    setFromLanguage(toLanguage);
    setToLanguage(temp);
  };

  const selectChip = (option: ChipOption) => {
    if (selectedChips.includes(option)) {
      setSelectedChips((prev) => prev.filter((chip) => chip !== option));
      return;
    }

    setSelectedChips((prev) => [...prev, option]);
  };

  return (
    <div className="w-full my-6 flex flex-col gap-5">
      <div className="flex justify-center gap-10">
        <LanguageSelector
          value={fromLanguage}
          onChange={setFromLanguage}
          options={LANGUAGE_OPTIONS}
        />
        <button onClick={handleSwapLanguage}>
          <ArrowRightLeft className="w-4 h-4" />
        </button>
        <LanguageSelector
          value={toLanguage}
          onChange={setToLanguage}
          options={LANGUAGE_OPTIONS}
        />
      </div>
      <div className="flex flex-col gap-5">
        <TextInputArea value={text} onChange={setText} />
        <button
          disabled={isDisabled}
          className={`w-full rounded-full p-2 shadow-md transition-colors duration-150 ${
            isDisabled
              ? "bg-gray-200 cursor-not-allowed text-gray-400"
              : "bg-blue-500 text-white hover:bg-blue-200 active:bg-blue-300"
          }`}
        >
          Translate
        </button>
      </div>
      <div className="flex flex-col gap-2">
        <label className="text-blue-500">Translation</label>
        <div className="w-full bg-white p-2 rounded-md">Hello!!</div>
      </div>
      <div className="flex justify-start flex-wrap gap-2">
        {CHIP_OPTIONS.map((opt) => {
          const isSelected = selectedChips.includes(opt);
          return (
            <Chip
              key={opt}
              label={opt}
              onClick={selectChip}
              isSelected={isSelected}
            />
          );
        })}
      </div>
    </div>
  );
}
