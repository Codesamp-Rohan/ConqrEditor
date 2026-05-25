'use client';

import { useState, useEffect } from 'react';
import { X, Eye, EyeOff, Copy, Check } from 'lucide-react';
import { useSettingsStore } from '@/store/settingsStore';

export default function SettingsModal({ open, onClose }) {
  const {
    provider,
    setProvider,
    geminiApiKey,
    setGeminiApiKey,
    groqApiKey,
    setGroqApiKey,
  } = useSettingsStore();
  const [copied, setCopied] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const handleCopy = async () => {
    const currentKey = provider === 'groq' ? groqApiKey : geminiApiKey;

    if (!currentKey) return;

    try {
      await navigator.clipboard.writeText(currentKey);

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm top-0 bottom-0 right-0 left-0 z-[9999]">
      <div className="w-full max-w-md rounded-2xl border border-[var(--border)] bg-white shadow-2xl">
        <div className="mb-2 flex items-center justify-between border-b-1 border-b-[var(--border-bold)] px-2">
          <p className="text-lg font-semibold !text-[var(--conqr-secondary)] heading-serif">
            API Key
          </p>

          <button
            onClick={onClose}
            className="rounded-md p-1 hover:text-[#00000077] cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        <div className="space-y-2 px-2">
          <div className="flex flex-col gap-1 items-start">
            <div className="mt-1 flex gap-1 bg-[var(--secondary)] border-1 border-[#ddd] p-[2px] rounded-md">
              <button
                onClick={() => setProvider('gemini')}
                className={`rounded-md border-none px-2 py-1 text-[10px] cursor-pointer ${
                  provider === 'gemini' ? 'bg-black text-white' : ''
                }`}
              >
                Gemini
              </button>

              <button
                onClick={() => setProvider('groq')}
                className={`rounded-md border-none px-2 py-1 text-[10px] cursor-pointer ${
                  provider === 'groq' ? 'bg-black text-white' : ''
                }`}
              >
                Groq
              </button>
            </div>
            <div className="flex flex-row gap-1 items-center w-full">
              <input
                type={isVisible ? 'text' : 'password'}
                value={provider === 'groq' ? groqApiKey : geminiApiKey}
                onChange={(e) => {
                  if (provider === 'groq') {
                    setGroqApiKey(e.target.value);
                  } else {
                    setGeminiApiKey(e.target.value);
                  }
                }}
                placeholder={
                  provider === 'groq'
                    ? 'Enter Groq API Key'
                    : 'Enter Gemini API Key'
                }
                className="w-full rounded-md border border-[#ddd] p-1 mr-1 text-[11px] outline-none"
              />

              <button
                onClick={handleCopy}
                className="rounded-md text-[var(--conqr-secondary)] hover:opacity-80 transition"
              >
                {copied ? (
                  <Check size={14} style={{ color: '#0ba300' }} />
                ) : (
                  <Copy size={14} />
                )}
              </button>

              <button
                onClick={() => setIsVisible(!isVisible)}
                className="rounded-md text-[var(--conqr-secondary)] hover:opacity-80 transition mr-2"
              >
                {isVisible ? <Eye size={14} /> : <EyeOff size={14} />}
              </button>
            </div>
          </div>
        </div>
        <a
          href="https://www.merge.dev/blog/gemini-api-key"
          target="_blank"
          rel="noopener noreferrer"
          className="relative !text-xs !font-mono !text-[var(--text-muted)] !underline ml-2"
        >
          Know about Gemini API key?
        </a>

        <div className="px-2 pb-2">
          <button
            onClick={() => {
              onClose();
            }}
            className="mt-3 w-full rounded-md bg-[var(--conqr-secondary)] p-1 text-[11px] font-medium font-mono text-white transition-all hover:opacity-90 cursor-pointer"
          >
            Save Settings
          </button>
        </div>
      </div>
    </div>
  );
}
