// Prompt reverse API - through terrakinc relay
import { NextRequest, NextResponse } from "next/server";
import { ZMO_API, LLM_MODELS } from "@/lib/api-config";

export async function POST(req: NextRequest) {
  try {
    const { image_url, model = "deepseek" } = await req.json();
    if (!image_url) {
      return NextResponse.json({ error: "Please provide image URL" }, { status: 400 });
    }
    if (!ZMO_API.key) {
      return NextResponse.json({ error: "Missing TERRAKINC_API_KEY" }, { status: 500 });
    }
    const modelInfo = LLM_MODELS[model as keyof typeof LLM_MODELS] || LLM_MODELS["deepseek"];
    const resp = await fetch(ZMO_API.baseUrl + "/chat/completions", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: "Bearer " + ZMO_API.key },
      body: JSON.stringify({
        model: modelInfo.id,
        messages: [{ role: "user", content: [
          { type: "text", text: "Analyze this image and generate an AI image prompt. Output JSON with prompt (English), negative_prompt, style_tags array." },
          { type: "image_url", image_url: { url: image_url } },
        ] }],
        temperature: 0.5,
        max_tokens: 2000,
      }),
      signal: AbortSignal.timeout(60000),
    });
    if (!resp.ok) {
      const err = await resp.text();
      return NextResponse.json({ error: "API error " + resp.status + ": " + err }, { status: 500 });
    }
    const data = await resp.json();
    const content = data.choices?.[0]?.message?.content || "";
    let parsed;
    try {
      const jsonStr = content.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
      parsed = JSON.parse(jsonStr);
    } catch {
      parsed = { prompt: content, style_tags: [] };
    }
    return NextResponse.json({ success: true, data: parsed });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Reverse failed" }, { status: 500 });
  }
}
