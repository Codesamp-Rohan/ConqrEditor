"use client";

import { useState } from "react";

import { X } from "lucide-react";

import { useSettingsStore } from "@/store/settingsStore";

export default function SettingsModal({
  open,
  onClose,
}) {
  const {
    geminiApiKey,
    setGeminiApiKey,
  } = useSettingsStore();

  const [value, setValue] = useState(
    geminiApiKey
  );

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-2xl border border-[var(--border)] bg-[var(--foreground)] p-5 shadow-2xl">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-lg font-semibold">
            AI Settings
          </h2>

          <button
            onClick={onClose}
            className="rounded-md p-1 hover:bg-[var(--hover)]"
          >
            <X size={18} />
          </button>
        </div>

        <div className="space-y-2">
          <label className="text-sm text-[var(--text-secondary)] font-mono ml-2">
            Gemini API Key
          </label>

          <input
            type="password"
            value={value}
            onChange={(e) =>
              setValue(e.target.value)
            }
            placeholder="AIza..."
            className="w-full rounded-lg border border-[var(--border)] bg-transparent px-2 text-sm py-2 font-mono outline-none focus:border-[var(--primary)]"
          />
        </div>
         <a href="https://www.merge.dev/blog/gemini-api-key" target="_blank" rel="noopener noreferrer" className="relative !text-xs !font-mono !text-[var(--text-muted)] !underline ml-2">
                    Know about Gemini API key?
                </a>
        <button
          onClick={() => {
            setGeminiApiKey(value);

            onClose();
          }}
          className="mt-5 w-full rounded-lg bg-[var(--primary)] px-2 py-2 text-sm font-medium text-sm font-mono text-white transition-all hover:opacity-90"
        >
          Save Settings
        </button>
      </div>
    </div>
  );
}