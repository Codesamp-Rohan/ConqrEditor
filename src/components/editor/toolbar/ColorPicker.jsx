"use client";

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
    <div className="absolute top-12 left-0 z-50 flex gap-2 rounded-2xl border border-[var(--border)] bg-[var(--foreground)] p-3 shadow-2xl">
      {colors.map((color) => (
        <button
          key={color}
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