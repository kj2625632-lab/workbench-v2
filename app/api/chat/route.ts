// AI Chat API - through terrakinc relay
import { NextRequest, NextResponse } from "next/server";
import { ZMO_API, LLM_MODELS } from "@/lib/api-config";

export async function POST(req: NextRequest) {
  try {
    const { messages, model = "deepseek" } = await req.json();

    if (!messages?.length) {
      return NextResponse.json({ error: "Messages cannot be empty" }, { status: 400 });
    }

    if (!ZMO_API.key) {
      return NextResponse.json({ error: "Missing TERRAKINC_API_KEY" }, { status: 500 });
    }

    const modelInfo = LLM_MODELS[model as keyof typeof LLM_MODELS] || LLM_MODELS["deepseek"];

    const resp = await fetch(ZMO_API.baseUrl + "/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + ZMO_API.key,
      },
      body: JSON.stringify({
        model: modelInfo.id,
        messages: messages,
        temperature: 0.7,
        max_tokens: 4000,
      }),
      signal: AbortSignal.timeout(60000),
    });

    if (!resp.ok) {
      const err = await resp.text();
      return NextResponse.json({ error: "API error " + resp.status + ": " + err }, { status: 500 });
    }

    const data = await resp.json();
    const reply = data.choices?.[0]?.message?.content || "";

    return NextResponse.json({ success: true, reply });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Chat failed" }, { status: 500 });
  }
}
