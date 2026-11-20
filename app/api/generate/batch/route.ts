// Batch image generation API
import { NextRequest, NextResponse } from "next/server";
import { ZMO_API, IMAGE_MODELS } from "@/lib/api-config";

export async function POST(req: NextRequest) {
  try {
    const { prompt, model = "banana-flash", count = 4, width = 1024, height = 1024 } = await req.json();
    if (!prompt?.trim()) {
      return NextResponse.json({ error: "Prompt cannot be empty" }, { status: 400 });
    }
    if (!ZMO_API.key) {
      return NextResponse.json({ error: "Missing TERRAKINC_API_KEY" }, { status: 500 });
    }
    const modelInfo = IMAGE_MODELS[model as keyof typeof IMAGE_MODELS];
    if (!modelInfo) {
      return NextResponse.json({ error: `Unsupported model: ${model}` }, { status: 400 });
    }
    const results = [];
    for (let i = 0; i < Math.min(count, 8); i++) {
      try {
        const resp = await fetch(`${ZMO_API.baseUrl}/images/generations`, {
          method: "POST",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${ZMO_API.key}` },
          body: JSON.stringify({ model: modelInfo.id, prompt, n: 1, size: `${width}x${height}` }),
          signal: AbortSignal.timeout(120000),
        });
        if (resp.ok) {
          const data = await resp.json();
          results.push({ success: true, url: data.data?.[0]?.url || (data.data?.[0]?.b64_json ? `data:image/png;base64,${data.data[0].b64_json}` : "") });
        } else {
          results.push({ success: false, error: await resp.text() });
        }
      } catch (e: any) {
        results.push({ success: false, error: e.message });
      }
    }
    return NextResponse.json({ success: true, model: modelInfo.name, results });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Batch generation failed" }, { status: 500 });
  }
}
