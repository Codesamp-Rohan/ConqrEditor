import { create } from "zustand";

export const useAIStore = create((set) => ({
  loading: false,
  selectedText: "",
  aiResponse: "",
  pendingSuggestion: "",

  setPendingSuggestion: (text) => set({ pendingSuggestion: text }),
  clearPendingSuggestion: () => set({ pendingSuggestion: "" }),
  clearAIResponse: () => set({ aiResponse: "" }),
  setSelectedText: (text) => set({ selectedText: text }),
  setAIResponse: (response) => set({ aiResponse: response }),
  setLoading: (loading) => set({ loading }),
}));
