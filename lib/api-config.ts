// API config - all through api.terrakinc.com relay
// Just fill in TERRAKINC_API_KEY
// Prices set at x2 (sale price = cost x 2)

export const ZMO_API = {
  baseUrl: "https://api.terrakinc.com/v1",
  key: process.env.TERRAKINC_API_KEY || "",
};

// ===== Image Models =====
export const IMAGE_MODELS = {
  "flare-1k": { id: "gpt-image-2.5-flare", name: "Flare 1K", price: "¥0.04/张" },
  "flare-4k": { id: "gpt-image-2.5-flare", name: "Flare 4K", price: "¥0.04/张" },
  "sunburst": { id: "gpt-image-2.5-sunburst", name: "Sunburst", price: "¥0.13/张" },
  "sunburst-v2": { id: "gpt-image-2.6-sunburst", name: "Sunburst 2.6", price: "¥0.13/张" },
  "banana-pro": { id: "gemini-3.0-pro-image", name: "Banana Pro", price: "¥0.10/张" },
  "banana-2.1": { id: "gemini-nano-banana-2.1", name: "Banana 2.1", price: "¥0.10/张" },
  "banana-flash": { id: "gemini-2.5-flash-image", name: "Banana Flash", price: "¥0.04/张" },
  "upscale": { id: "image2.5超分", name: "超分修复", price: "¥0.02/张" },
};

// ===== Video Models =====
export const VIDEO_MODELS = {
  "seedance-720": { id: "sd2.0-720p-official", name: "Seedance 2.0 720P", price: "¥1.4/条" },
  "seedance-1080": { id: "sd2.0-1080p-official", name: "Seedance 2.0 1080P", price: "¥3.5/条" },
  "seedance25": { id: "sd2.5-720p-official", name: "Seedance 2.5 720P", price: "¥2.1/条" },
  "minimax-768": { id: "海螺minimax-768P", name: "MiniMax H3 768P", price: "¥0.3/秒" },
  "minimax-full": { id: "海螺minih3-满参-特惠价", name: "MiniMax H3 满参", price: "¥4/条" },
  "omni-flash": { id: "omni-1.1-flash-720p", name: "Omni Flash 720P", price: "¥0.6/条" },
};

// ===== LLM Models (script parsing / prompt reverse) =====
export const LLM_MODELS = {
  "deepseek": { id: "DeepSeek-v4.1-flash", name: "DeepSeek V4.1" },
  "gemini-3.5-flash": { id: "gemini-3.5-flash", name: "Gemini 3.5 Flash" },
  "gemini-3.8-flash": { id: "gemini-3.8-flash", name: "Gemini 3.8 Flash" },
  "gpt-6-sol": { id: "gpt-6-sol", name: "GPT-6 Sol" },
  "gpt-6-luna": { id: "gpt-6-luna", name: "GPT-6 Luna" },
};

// ===== TTS =====
export const TTS_MODELS = {
  "gemini-tts": { id: "gemini-3.8-flash-tts", name: "Gemini TTS" },
  "gemini-tts-lite": { id: "gemini-3.8-flash-lite-tts", name: "Gemini TTS Lite" },
};
