"use client";

import { CircleOff } from "lucide-react";

const colors = [
  "#ef4444",
  "#f97316",
  "#eab308",
  "#22c55e",
  "#3b82f6",
  "#8b5cf6",
  "#ec4899",
  "#ffffff",
  "#444444",
  "#000000",
];

export default function ColorPicker({
  onSelect,
}) {
  return (
    <div className="absolute top-[24px] left-0 z-50 flex gap-2 border border-[var(--border)] bg-[var(--foreground)] p-3 shadow-xl shadow-black/20 rounded-md">
      <button
  onMouseDown={(e) => {
    e.preventDefault();
  }}
  onClick={() =>
    onSelect(null)
  }
  className="flex h-3 w-3 items-center justify-center rounded-full border border-[var(--border)] transition-all hover:bg-[var(--hover)]"
>
  <CircleOff size={14} />
</button>
      {colors.map((color) => (
        <button
          key={color}
          onMouseDown={(e) => {e.preventDefault();}}
          onClick={() =>
            onSelect(color)
          }
          style={{
            background: color,
          }}
          className="h-3 w-3 rounded-full border border-black/40 transition-transform hover:scale-110"
        />
      ))}
    </div>
  );
}