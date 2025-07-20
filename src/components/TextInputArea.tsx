import React from "react";

interface TextInputAreaProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const TextInputArea: React.FC<TextInputAreaProps> = ({
  value,
  onChange,
  placeholder = "テキストを入力してください...",
}) => {
  return (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      rows={1}
      placeholder={placeholder}
      className="w-full border border-gray-500 rounded-md bg-white p-2"
    />
  );
};

export default TextInputArea;
