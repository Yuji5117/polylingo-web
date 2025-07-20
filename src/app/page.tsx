"use client";

import LanguageSelector from "@/components/LanguageSelector";
import TextInputArea from "@/components/TextInputArea";
import { LANGUAGE_OPTIONS, LanguageCode } from "@/constants";
import { ArrowRightLeft } from "lucide-react";
import { useState } from "react";

export default function Home() {
  const [fromLanguage, setFromLanguage] = useState<LanguageCode>("en");
  const [toLanguage, setToLanguage] = useState<LanguageCode>("ja");
  const [text, setText] = useState<string>("");

  const isDisabled = text === "";

  const handleSwapLanguage = () => {
    const temp = fromLanguage;
    setFromLanguage(toLanguage);
    setToLanguage(temp);
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
    </div>
  );
}
