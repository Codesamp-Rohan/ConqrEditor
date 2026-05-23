import { GoogleGenerativeAI } from "@google/generative-ai";
import { useSettingsStore } from "@/store/settingsStore";

export async function generateWithGemini({
  prompt,
  selectedText,
  documentText,
  history,
}) {
  const { geminiApiKey } = useSettingsStore.getState();

  if (!geminiApiKey) {
    throw new Error("Missing Gemini API Key");
  }

  const genAI = new GoogleGenerativeAI(geminiApiKey);

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
