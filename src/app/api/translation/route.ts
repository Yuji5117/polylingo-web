import { env } from "@/lib/env";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const { text, to } = await req.json();

  if (!text || !to) {
    throw new Error("Text should not be empty!");
  }
  const response = await fetch(`${env.TRANSLATION_API_KEY}/translate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": env.API_KEY,
    },
    body: JSON.stringify({ text, to }),
  });

  const result = await response.json();

  return NextResponse.json(result);
};
