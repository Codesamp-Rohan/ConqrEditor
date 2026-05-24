import { create } from "zustand";

import { persist } from "zustand/middleware";

export const useAIStore = create(
  persist(
    (set) => ({
      loading: false,
      selectedText: "",
      aiResponse: "",
      pendingSuggestion: null,
      messages: [],
      documentText: "",

      setPendingSuggestion: (suggestion) =>
        set({
          pendingSuggestion: suggestion,
        }),
      clearPendingSuggestion: () =>
        set({
          pendingSuggestion: null,
        }),
      clearAIResponse: () =>
        set({
          aiResponse: "",
        }),
      setSelectedText: (text) =>
        set({
          selectedText: text,
        }),
      setAIResponse: (response) =>
        set({
          aiResponse: response,
        }),
      setLoading: (loading) =>
        set({
          loading,
        }),
      addMessage: (message) =>
        set((state) => ({
          messages: [...state.messages, message],
        })),
      clearConversation: () =>
        set({
          messages: [],
        }),
      setDocumentText: (text) =>
        set({
          documentText: text,
        }),
    }),
    {
      name: "ai-storage",

      partialize: (state) => ({
        messages: state.messages,
      }),
    },
  ),
);
