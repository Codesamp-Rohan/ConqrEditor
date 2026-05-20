'use client';

import { CircleOff } from 'lucide-react';

const highlights = ['#fef08a', '#bbf7d0', '#bfdbfe', '#fecaca', '#e9d5ff'];

export default function HighlightPicker({ onSelect }) {
  return (
    <div className="absolute top-[24px] left-0 z-50  flex gap-2 rounded-2xl border border-[var(--border)] bg-[var(--foreground)] p-3 shadow-xl shadow-black/20 rounded-md">
      <button
        onMouseDown={(e) => {
          e.preventDefault();
        }}
        onClick={() => onSelect(null)}
        className="flex h-3 w-3 items-center justify-center rounded-full border border-[var(--border)] transition-all hover:bg-[var(--hover)]"
      >
        <CircleOff size={14} />
      </button>
      {highlights.map((color) => (
        <button
          key={color}
          onMouseDown={(e) => {
            e.preventDefault();
          }}
          onClick={() => onSelect(color)}
          style={{
            background: color,
          }}
          className="h-3 w-3 rounded-full border border-white/10 transition-transform hover:scale-110"
        />
      ))}
    </div>
  );
}
