export default function SlashMenuItem({
  title,
  description,
  onClick,
}) {
  return (
    <button
      onClick={onClick}
      className="flex w-full flex-col rounded-xl px-3 py-2 text-left transition-all hover:bg-[var(--hover)]"
    >
      <span className="text-sm font-medium text-[var(--text-primary)]">
        {title}
      </span>

      <span className="text-xs text-[var(--text-secondary)]">
        {description}
      </span>
    </button>
  );
}