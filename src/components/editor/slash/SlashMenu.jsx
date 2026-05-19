import SlashMenuItem from "./SlashMenuItem";

export default function SlashMenu({
                                      items,
                                      onSelect,
    selectedIndex
                                  }) {
    return (
        <div className="absolute left-[-2px] top-0 z-50 w-72 rounded-lg border border-[var(--border)] bg-[var(--foreground)] p-2 shadow-[0_8px_30px_rgba(0,0,0,0.08)]">
            {items.map((item, index) => (
                <SlashMenuItem
                    key={item.type}
                    title={item.title}
                    description={item.description}
                    onClick={() => onSelect(item)}
                    selected={index === selectedIndex}
                />
            ))}
        </div>
    );
}