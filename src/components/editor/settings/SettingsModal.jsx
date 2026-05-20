"use client";

import { useState, useEffect } from "react";
import { X, Eye, EyeOff } from "lucide-react";
import { useSettingsStore } from "@/store/settingsStore";

export default function SettingsModal({open,onClose}) {
  const {
    geminiApiKey,
    setGeminiApiKey,
  } = useSettingsStore();

  const [value, setValue] = useState(geminiApiKey);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
  setValue(geminiApiKey);
}, [geminiApiKey]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-2xl border border-[var(--border)] bg-[var(--conqr-muted)] p-5 shadow-2xl">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-lg font-semibold !text-[var(--conqr-secondary)]">
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
          <div className="flex gap-2 items-center">
          <input
            type={isVisible ? "text" : "password"}
            value={value}
            onChange={(e) =>
              setValue(e.target.value)
            }
            placeholder="your-gemini-key..."
            className="w-full rounded-lg border border-[var(--conqr-secondary)] bg-transparent px-2 text-[11px] py-2 font-mono outline-none focus:border-[var(--primary)]"
          />
          {
            isVisible ? (
              <button
                onClick={() => {
                  setIsVisible(false);
                }}
                className="relative rounded-md text-sm font-mono text-[var(--conqr-secondary)] mx-2"
              >
                <Eye size={18} />
              </button>
            ) : (
              <button
                onClick={() => {
                  setIsVisible(true);
                }}
                className="relative rounded-md text-sm font-mono text-[var(--conqr-secondary)] mx-2"
              >
                <EyeOff size={18} />
              </button>
            )
          }
          </div>
        </div>
         <a href="https://www.merge.dev/blog/gemini-api-key" target="_blank" rel="noopener noreferrer" className="relative !text-xs !font-mono !text-[var(--text-muted)] !underline ml-2">
                    Know about Gemini API key?
                </a>
        <button
          onClick={() => {
            setGeminiApiKey(value);

            onClose();
          }}
          className="mt-5 w-full rounded-lg bg-[var(--conqr-secondary)] px-2 py-2 text-sm font-medium font-mono text-white transition-all hover:opacity-90"
        >
          Save Settings
        </button>
      </div>
    </div>
  );
}