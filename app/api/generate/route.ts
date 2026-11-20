// Image generation API - through terrakinc relay
import { NextRequest, NextResponse } from "next/server";
import { ZMO_API, IMAGE_MODELS } from "@/lib/api-config";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      prompt,
      model = "flare-1k",
      width = 1024,
      height = 1024,
      style = "auto",
      num_images = 1,
      image_url,
    } = body;

    if (!prompt?.trim()) {
      return NextResponse.json({ error: "Prompt cannot be empty" }, { status: 400 });
    }

    if (!ZMO_API.key) {
      return NextResponse.json({ error: "Missing TERRAKINC_API_KEY" }, { status: 500 });
    }

    const styleMap: Record<string, string> = {
      auto: "",
      realistic: ", ultra realistic, professional product photography, 8k",
      anime: ", anime style, cel shading, vibrant colors",
      "3d": ", 3D render, octane render, cinema 4d",
      oil: ", oil painting style, warm tones",
      ins: ", instagram aesthetic, lifestyle photography, natural light",
    };
    const enhancedPrompt = prompt + (styleMap[style] || "");

    const modelInfo = IMAGE_MODELS[model as keyof typeof IMAGE_MODELS];
    if (!modelInfo) {
      return NextResponse.json({ error: `Unsupported model: ${model}` }, { status: 400 });
    }

    let result;
    if (image_url) {
      result = await editImage({ prompt: enhancedPrompt, image_url, model: modelInfo.id, num_images });
    } else {
      result = await generateImage({ prompt: enhancedPrompt, model: modelInfo.id, width, height, num_images });
    }

    return NextResponse.json({
      success: true,
      model: modelInfo.name,
      price: modelInfo.price,
      images: result.images,
    });
  } catch (error: any) {
    console.error("Image generation failed:", error);
    return NextResponse.json({ error: error.message || "Generation failed" }, { status: 500 });
  }
}

async function generateImage(params: any) {
  const resp = await fetch(`${ZMO_API.baseUrl}/images/generations`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${ZMO_API.key}`,
    },
    body: JSON.stringify({
      model: params.model,
      prompt: params.prompt,
      n: params.num_images,
      size: `${params.width}x${params.height}`,
    }),
    signal: AbortSignal.timeout(120000),
  });

  if (!resp.ok) {
    const err = await resp.text();
    throw new Error(`API error ${resp.status}: ${err}`);
  }

  const data = await resp.json();
  return {
    images: (data.data || []).map((img: any) => ({
      url: img.url || img.b64_json ? `data:image/png;base64,${img.b64_json}` : img.url,
    })),
  };
}

async function editImage(params: any) {
  const resp = await fetch(`${ZMO_API.baseUrl}/images/edits`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${ZMO_API.key}`,
    },
    body: JSON.stringify({
      model: params.model,
      prompt: params.prompt,
      image: params.image_url,
      n: params.num_images,
    }),
    signal: AbortSignal.timeout(120000),
  });

  if (!resp.ok) {
    const err = await resp.text();
    throw new Error(`API error ${resp.status}: ${err}`);
  }

  const data = await resp.json();
  return {
    images: (data.data || []).map((img: any) => ({
      url: img.url || (img.b64_json ? `data:image/png;base64,${img.b64_json}` : ""),
    })),
  };
}
