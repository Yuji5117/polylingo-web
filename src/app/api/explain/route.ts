import { env } from "@/lib/env";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const { originalText, translatedResult, tags } = await req.json();

  if (!originalText || !translatedResult || !tags) {
    throw new Error("Request parameter should not be empty!");
  }

  const response = await fetch(`${env.TRANSLATION_API_KEY}/translate/explain`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": env.API_KEY,
    },
    body: JSON.stringify({ originalText, translatedResult, tags }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error("API Error:", errorText);
    throw new Error(`API returned status ${response.status}`);
  }

  const result = await response.json();

  return NextResponse.json(result);
};
