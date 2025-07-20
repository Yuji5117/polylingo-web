"use client";

import React, { useEffect, useRef } from "react";

interface TextInputAreaProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
}

const TextInputArea: React.FC<TextInputAreaProps> = ({
  value,
  onChange,
  placeholder = "テキストを入力してください...",
}) => {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = "auto";
      textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
    }
  }, [value]);

  return (
    <textarea
      ref={textAreaRef}
      value={value}
      onChange={(e) => onChange(e)}
      rows={1}
      placeholder={placeholder}
      className="w-full border border-gray-500 rounded-md bg-white p-2 resize-none overflow-hidden"
    />
  );
};

export default TextInputArea;
