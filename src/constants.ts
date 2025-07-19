export const LANGUAGE_OPTIONS = [
  { label: "English", value: "en" },
  { label: "Japanese", value: "ja" },
] as const;

export type LanguageOption = (typeof LANGUAGE_OPTIONS)[number];
export type LanguageCode = LanguageOption["value"];
