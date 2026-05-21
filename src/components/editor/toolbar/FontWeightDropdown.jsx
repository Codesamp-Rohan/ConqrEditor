'use client';

const weights = [
  {
    label: 'Light',
    value: 300,
  },
  {
    label: 'Regular',
    value: 400,
  },
  {
    label: 'Medium',
    value: 500,
  },
  {
    label: 'Semibold',
    value: 600,
  },
  {
    label: 'Bold',
    value: 700,
  },
];

export default function FontWeightDropdown({ onSelect }) {
  return (
    <div className="absolute top-[24px] left-0 z-50 w-40 rounded-md border border-[var(--border)] bg-[var(--foreground)] p-1 shadow-2xl">
      {weights.map((weight) => (
        <button
          key={weight.value}
          onMouseDown={(e) => {
            e.preventDefault();
          }}
          onClick={() => onSelect(weight.value)}
          className="flex w-full items-center justify-between rounded-sm p-1 text-left text-[11px] transition-all hover:bg-[var(--hover)]"
        >
          <span>{weight.label}</span>

          <span className="text-[var(--text-secondary)]">{weight.value}</span>
        </button>
      ))}
    </div>
  );
}
