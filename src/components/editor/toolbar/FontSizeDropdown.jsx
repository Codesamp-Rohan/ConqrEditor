"use client";

const sizes = [
  12,
  14,
  16,
  18,
  24,
  32,
  48,
];

export default function FontSizeDropdown({
  onSelect,
}) {
  return (
    <div className="absolute top-[24px] left-0 z-50 w-24 rounded-md border border-[var(--border)] bg-[var(--foreground)] p-1 shadow-2xl">
      {sizes.map((size) => (
        <button
  key={size}
  onMouseDown={(e) => {
    e.preventDefault();
  }}
  onClick={() =>
    onSelect(size)
  }
  className="flex w-full items-center rounded-sm p-1 text-left text-[11px] transition-all hover:bg-[var(--hover)]"
>
  {size}px
</button>
      ))}
    </div>
  );
}