import Groq from "groq-sdk";

import { useSettingsStore } from "@/store/settingsStore";

export async function generateWithGroq({
  prompt,
  selectedText,
  documentText,
  history,
}) {
  const { groqApiKey } = useSettingsStore.getState();

  if (!groqApiKey) {
    throw new Error("Missing Groq API Key");
  }

  const groq = new Groq({
    apiKey: groqApiKey,
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
