// Video generation API - through terrakinc relay
import { NextRequest, NextResponse } from "next/server";
import { ZMO_API, VIDEO_MODELS } from "@/lib/api-config";

export async function POST(req: NextRequest) {
  try {
    const { prompt, model = "minimax-768", duration = 5, image_url } = await req.json();
    if (!prompt?.trim()) {
      return NextResponse.json({ error: "Prompt cannot be empty" }, { status: 400 });
    }
    if (!ZMO_API.key) {
      return NextResponse.json({ error: "Missing TERRAKINC_API_KEY" }, { status: 500 });
    }
    const modelInfo = VIDEO_MODELS[model as keyof typeof VIDEO_MODELS];
    if (!modelInfo) {
      return NextResponse.json({ error: `Unsupported model: ${model}` }, { status: 400 });
    }
    const resp = await fetch(ZMO_API.baseUrl + "/video/generations", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: "Bearer " + ZMO_API.key },
      body: JSON.stringify({ model: modelInfo.id, prompt, duration, image: image_url }),
      signal: AbortSignal.timeout(300000),
    });
    if (!resp.ok) {
      const err = await resp.text();
      return NextResponse.json({ error: "API error " + resp.status + ": " + err }, { status: 500 });
    }
    const data = await resp.json();
    return NextResponse.json({ success: true, model: modelInfo.name, price: modelInfo.price, video: data });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Video generation failed" }, { status: 500 });
  }
}
