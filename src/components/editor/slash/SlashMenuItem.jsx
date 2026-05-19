export default function SlashMenuItem({
  title,
  description,
  onClick,
    selected,
}) {
  return (
    <button
      onClick={onClick}
      className={`flex w-full flex-col rounded-md p-1 text-left transition-all cursor-pointer ${selected ? "bg-[var(--hover)]" : "hover:bg-[var(--hover)]"}`}>
      <span className="text-[12px] font-medium text-[var(--text-primary)]">
        {title}
      </span>

      <span className="text-[10px] text-[var(--text-secondary)]">
        {description}
      </span>
    </button>
  );
}