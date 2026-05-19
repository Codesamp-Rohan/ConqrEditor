export default function SlashMenuItem({title, description, onClick, selected, item }) {
  const Icon = item.icon
  return (
      <div className="flex w-full flex-col px-2 mb-1">
    <button
      onClick={onClick}
      title={description}
      className={`flex w-full flex-col rounded-md p-1 text-left transition-all cursor-pointer ${selected ? "bg-[var(--hover)]" : "hover:bg-[var(--hover)]"}`}>
      <span className="text-[12px] font-medium text-[var(--text-primary)] flex items-center gap-2">
          <Icon size={10}/>
        {title}
      </span>
    </button>
      </div>
  );
}