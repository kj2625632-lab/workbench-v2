// Models list API
import { NextResponse } from "next/server";
import { IMAGE_MODELS, VIDEO_MODELS, LLM_MODELS, TTS_MODELS } from "@/lib/api-config";

export async function GET() {
  return NextResponse.json({
    success: true,
    image: IMAGE_MODELS,
    video: VIDEO_MODELS,
    llm: LLM_MODELS,
    tts: TTS_MODELS,
  });
}
