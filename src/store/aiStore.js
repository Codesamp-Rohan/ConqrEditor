import { create } from "zustand";

export const useAIStore = create((set) => ({
  loading: false,
  selectedText: "",
  aiResponse: "",
  pendingSuggestion: "",
  messages: [],

  setPendingSuggestion: (text) => set({ pendingSuggestion: text }),
  clearPendingSuggestion: () => set({ pendingSuggestion: "" }),
  clearAIResponse: () => set({ aiResponse: "" }),
  setSelectedText: (text) => set({ selectedText: text }),
  setAIResponse: (response) => set({ aiResponse: response }),
  setLoading: (loading) => set({ loading }),
  addMessage: (message) =>
    set((state) => ({ messages: [...state.messages, message] })),

  clearConversation: () =>
    set({
      messages: [],
    }),
}));
