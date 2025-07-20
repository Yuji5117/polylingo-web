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
        <button className="w-full bg-blue-500 text-white rounded-full p-2 shadow-md hover:bg-blue-200 active:bg-blue-300 transition-colors duration-150">
          Translate
        </button>
      </div>
    </div>
  );
}
