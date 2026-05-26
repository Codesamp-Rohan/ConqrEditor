import Groq from "groq-sdk";

import { useSettingsStore } from "@/store/settingsStore";

export async function generateWithGroq({
  prompt,
  selectedText,
  documentText,
  history,
}) {
  const { groqApiKey } = useSettingsStore.getState();

  // Fallback to ENV key
  const apiKey = groqApiKey || process.env.NEXT_PUBLIC_GROQ_API_KEY;

  if (!apiKey) {
    throw new Error("No Groq API key found in settings or .env.local");
  }

  const groq = new Groq({
    apiKey,
    dangerouslyAllowBrowser: true,
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

  const completion = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",

    messages: [
      {
        role: "user",
        content: finalPrompt,
      },
    ],
  });

  return completion.choices[0]?.message?.content || "";
}
