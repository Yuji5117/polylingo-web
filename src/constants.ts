export const LANGUAGE_OPTIONS = [
  { label: "English", value: "en" },
  { label: "Japanese", value: "ja" },
] as const;

export type LanguageOption = (typeof LANGUAGE_OPTIONS)[number];
export type LanguageCode = LanguageOption["value"];

export const CHIP_OPTIONS = [
  "Grammar",
  "Idiom",
  "Nuance",
  "Vocabulary",
  "Context",
] as const;

export type ChipOption = (typeof CHIP_OPTIONS)[number];
