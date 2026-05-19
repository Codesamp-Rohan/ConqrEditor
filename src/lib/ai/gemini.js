import { GoogleGenerativeAI } from "@google/generative-ai";

export async function askGemini({
  apiKey,
  prompt,
}) {
  if (!apiKey) {
    throw new Error("Missing Gemini API Key");
  }

  const genAI = new GoogleGenerativeAI(apiKey);

  const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash",
  });

  const result = await model.generateContent(
    prompt
  );

  return result.response.text();
}