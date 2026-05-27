import { GoogleGenerativeAI } from "@google/generative-ai";
import { useSettingsStore } from "@/store/settingsStore";

export async function generateWithGemini({
  prompt,
  selectedText,
  documentText,
  history,
}) {
  const { geminiApiKey } = useSettingsStore.getState();

  // Fallback to ENV key
  const apiKey = geminiApiKey || process.env.GAK;

  if (!apiKey) {
    throw new Error("No Gemini API key found in settings or .env.local");
  }

  const genAI = new GoogleGenerativeAI(apiKey);

  const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash-lite",
  });

  const finalPrompt = `
You are Conqr AI, an AI writing assistant.

DOCUMENT:
${documentText}

SELECTED TEXT:
${selectedText}

CONVERSATION HISTORY:
${history}

USER MESSAGE:
${prompt}

Return response in this format:

MESSAGE:
<chat response>

SUGGESTION:
<rewritten/improved content only if needed>
`;

  const result = await model.generateContent(finalPrompt);

  return result.response.text();
}
