import { generateWithGemini } from "./gemini";
import { generateWithGroq } from "./groq";

export async function generateAIResponse({
  provider,
  prompt,
  selectedText,
  documentText,
  history,
}) {
  const payload = {
    prompt,
    selectedText,
    documentText,
    history,
  };

  if (provider === "groq") {
    return generateWithGroq(payload);
  }

  return generateWithGemini(payload);
}
