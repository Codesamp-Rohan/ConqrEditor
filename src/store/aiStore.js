import { create } from "zustand";

export const useAIStore = create(
  (set) => ({
    loading: false,

    setLoading: (loading) =>
      set({ loading }),
  })
);