'use client';

import { useState, useEffect } from 'react';
import { X, Eye, EyeOff, Copy, Check } from 'lucide-react';
import { useSettingsStore } from '@/store/settingsStore';

export default function SettingsModal({ open, onClose }) {
  const { geminiApiKey, setGeminiApiKey } = useSettingsStore();
  const [copied, setCopied] = useState(false);
  const [value, setValue] = useState(geminiApiKey);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setValue(geminiApiKey);
  }, [geminiApiKey]);

  const handleCopy = async () => {
    if (!value) return;

    await navigator.clipboard.writeText(value);

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-lg border border-[var(--border)] bg-[var(--conqr-muted)] shadow-2xl">
        <div className="mb-5 flex items-center justify-between border-b-1 border-b-[var(--conqr-secondary)] px-2">
          <p className="text-sm font-semibold !text-[var(--conqr-secondary)]">
            AI Settings
          </p>

          <button
            onClick={onClose}
            className="rounded-md p-1 hover:bg-[#ffffff44] cursor-pointer"
          >
            <X size={14} />
          </button>
        </div>

        <div className="space-y-2 px-2">
          <label className="text-sm text-[var(--text-muted)] font-mono">
            Gemini API Key
          </label>
          <div className="flex gap-2 items-center">
            <input
              type={isVisible ? 'text' : 'password'}
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="your-gemini-key..."
              className="w-full border-b-1 border-b-[var(--conqr-secondary)] bg-[var(--conqr-primary)] px-2 text-[11px] py-2 font-mono outline-none focus:border-[var(--primary)]"
            />

            <button
              onClick={handleCopy}
              className="rounded-md text-[var(--conqr-secondary)] hover:opacity-80 transition"
            >
              {copied ? <Check size={18} style={{ color: '#0ba300' }} /> : <Copy size={18} />}
            </button>

            <button
              onClick={() => setIsVisible(!isVisible)}
              className="rounded-md text-[var(--conqr-secondary)] hover:opacity-80 transition"
            >
              {isVisible ? <Eye size={18} /> : <EyeOff size={18} />}
            </button>
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

        <div className='px-2 pb-2'>
        <button
          onClick={() => {
            setGeminiApiKey(value);

            onClose();
          }}
          className="mt-5 w-full rounded-md bg-[var(--conqr-secondary)] px-2 py-2 text-sm font-medium font-mono text-white transition-all hover:opacity-90 cursor-pointer"
        >
          Save Settings
        </button>
        </div>

      </div>
    </div>
  );
}
