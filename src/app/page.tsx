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
import { ArrowRightLeft, Text } from "lucide-react";
import { useState } from "react";

type ExplanationType = {
  title: string;
  body: string;
};

export default function Home() {
  const [fromLanguage, setFromLanguage] = useState<LanguageCode>("en");
  const [toLanguage, setToLanguage] = useState<LanguageCode>("ja");
  const [text, setText] = useState<string>("");
  const [translatedResult, setTranslatedResult] = useState<string>("");
  const [explainResult, setExplainResult] = useState<ExplanationType[]>([]);
  const [selectedChips, setSelectedChips] = useState<ChipOption[]>([]);

  const isTranslationDisabled = text === "";
  const isExplanationDisabled = selectedChips.length === 0;

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

  const handleChangeTextInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const handleTranslateText = async (text: string) => {
    try {
      const response = await fetch("/api/translation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text, to: toLanguage }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const result = await response.json();

      setTranslatedResult(result.data.translated);
    } catch (error) {
      console.error("翻訳エラー:", error);
    }
  };

  const handleExplainTranslatedText = async (
    originalText: string,
    translatedResult: string,
    tags: ChipOption[]
  ) => {
    try {
      const response = await fetch("api/explain", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ originalText, translatedResult, tags }),
      });

      const result = await response.json();

      const sections: string[] = result.data.explanation
        .trim()
        .split(/##\s*/)
        .filter(Boolean);

      const explanationList = sections.map((section) => {
        const split = section.trim().split("\n");
        return { title: split[0], body: split[1] };
      });

      setExplainResult(explanationList);
    } catch (error) {
      console.error("解説エラー:", error);
    }
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
        <TextInputArea value={text} onChange={handleChangeTextInput} />
        <button
          disabled={isTranslationDisabled}
          onClick={() => handleTranslateText(text)}
          className={`w-full rounded-full p-2 shadow-md transition-colors duration-150 ${
            isTranslationDisabled
              ? "bg-gray-200 cursor-not-allowed text-gray-400"
              : "bg-blue-500 text-white hover:bg-blue-200 active:bg-blue-300"
          }`}
        >
          Translate
        </button>
      </div>
      {translatedResult && (
        <>
          <div className="flex flex-col gap-2">
            <label className="text-blue-500">Translation</label>
            <div className="w-full bg-white p-2 rounded-md">
              {translatedResult}
            </div>
          </div>
          <div className="flex justify-start flex-wrap gap-2">
            <p className="text-sm text-gray-500 mb-2">
              Select at least one category to get an explanation.
            </p>

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
          <div className="flex justify-end">
            <button
              disabled={isExplanationDisabled}
              onClick={() =>
                handleExplainTranslatedText(
                  text,
                  translatedResult,
                  selectedChips
                )
              }
              className={`rounded-full py-2 px-6 shadow-md transition-colors duration-150 ${
                isExplanationDisabled
                  ? "bg-gray-200 cursor-not-allowed text-gray-400"
                  : "bg-blue-500 text-white hover:bg-blue-200 active:bg-blue-300"
              }`}
            >
              Explain
            </button>
          </div>
        </>
      )}
      {translatedResult && explainResult && (
        <div className="flex flex-col gap-2">
          <label className="text-blue-500">Explanation</label>
          <div className="flex flex-col gap-5 w-full bg-white px-2 py-4 rounded-md">
            {explainResult.map((exp) => (
              <div className="flex flex-col gap-2" key={exp.title}>
                <div className="text-blue-500 text-lg font-medium">
                  {exp.title}
                </div>
                <div>{exp.body}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
