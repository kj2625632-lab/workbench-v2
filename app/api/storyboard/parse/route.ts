// AI storyboard parsing API - through terrakinc relay
import { NextRequest, NextResponse } from "next/server";
import { ZMO_API, LLM_MODELS } from "@/lib/api-config";

const SYSTEM_PROMPT = "You are a professional storyboard artist. Break down the script into JSON storyboard with characters and scenes arrays. Each scene has shots array with type, description, dialogue, duration, image_prompt (English), video_prompt (English). Output pure JSON.";

export async function POST(req: NextRequest) {
  try {
    const { script, style = "", model = "deepseek" } = await req.json();
    if (!script?.trim()) {
      return NextResponse.json({ error: "Script cannot be empty" }, { status: 400 });
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
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content: "Parse script: " + script },
        ],
        temperature: 0.7,
        max_tokens: 4000,
      }),
      signal: AbortSignal.timeout(120000),
    });
    if (!resp.ok) {
      const err = await resp.text();
      return NextResponse.json({ error: "LLM API error " + resp.status + ": " + err }, { status: 500 });
    }
    const data = await resp.json();
    const content = data.choices?.[0]?.message?.content || "";
    let parsed;
    try {
      const jsonStr = content.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
      parsed = JSON.parse(jsonStr);
    } catch {
      parsed = { raw: content, scenes: [], characters: [] };
    }
    return NextResponse.json({ success: true, data: parsed });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Parse failed" }, { status: 500 });
  }
}
