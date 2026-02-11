
import { GoogleGenAI, Modality } from "@google/genai";

let ai: GoogleGenAI | null = null;

function getAI(): GoogleGenAI | null {
  if (ai) return ai;
  const key = process.env.API_KEY;
  if (!key) return null;
  ai = new GoogleGenAI({ apiKey: key });
  return ai;
}

export const getSpiritualReflection = async (verse: string) => {
  try {
    const client = getAI();
    if (!client) return "The Word of God is always a lamp to our feet. Take a moment to be still and listen to His voice today.";
    const response = await client.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Provide a 3-sentence spiritual reflection for the following Bible verse: "${verse}". Focus on encouragement and daily application.`,
      config: {
        temperature: 0.7,
        maxOutputTokens: 200,
      }
    });
    return response.text;
  } catch (error) {
    console.error("Gemini reflection error:", error);
    return "The Word of God is always a lamp to our feet. Take a moment to be still and listen to His voice today.";
  }
};

export const generateSermonOutline = async (topic: string) => {
  try {
    const client = getAI();
    if (!client) return "Error generating outline. Please configure your API key and try again.";
    const response = await client.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: `Create a structured sermon outline for the topic: "${topic}". Include a hook, 3 main biblical points with scripture references, and a call to action.`,
      config: {
        temperature: 1,
        thinkingConfig: { thinkingBudget: 4000 }
      }
    });
    return response.text;
  } catch (error) {
    console.error("Gemini sermon error:", error);
    return "Error generating outline. Please try again.";
  }
};

export const generateVisualAsset = async (prompt: string) => {
  try {
    const client = getAI();
    if (!client) return null;
    const response = await client.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [{ text: `A high-quality, aesthetic social media post for a church community. Style: Minimalist, spiritual, high-end photography. Content: ${prompt}` }],
      },
      config: {
        imageConfig: { aspectRatio: "1:1" }
      }
    });
    
    for (const part of response.candidates[0].content.parts) {
      if (part.inlineData) {
        return `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
      }
    }
    return null;
  } catch (error) {
    console.error("Gemini image error:", error);
    return null;
  }
};

export const startLivePrayerSession = (callbacks: any) => {
  const client = getAI();
  if (!client) return Promise.reject(new Error("API key not configured"));
  return client.live.connect({
    model: 'gemini-2.5-flash-native-audio-preview-12-2025',
    callbacks,
    config: {
      responseModalities: [Modality.AUDIO],
      speechConfig: {
        voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Kore' } },
      },
      systemInstruction: 'You are a compassionate, wise, and patient spiritual prayer partner. Your goal is to listen deeply, provide biblical comfort, and pray with the user. Keep your tone gentle, slow, and meditative. If the user stops talking, wait patiently or offer a short comforting verse.',
    },
  });
};
