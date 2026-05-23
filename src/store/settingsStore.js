import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useSettingsStore = create(
  persist(
    (set) => ({
      provider: "gemini",

      geminiApiKey: "",
      groqApiKey: "",

      setProvider: (provider) => set({ provider }),

      setGeminiApiKey: (key) => set({ geminiApiKey: key }),

      setGroqApiKey: (key) => set({ groqApiKey: key }),
    }),
    {
      name: "conqr-settings",
    },
  ),
);
