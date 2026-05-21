import SlashMenuItem from './SlashMenuItem';

export default function SlashMenu({ items, onSelect, selectedIndex }) {
  // Flatten the items while preserving category headers
  const flattenedItems = [];
  const selectableIndices = []; // Keep track of selectable indices
  let currentIndex = 0;

  Object.entries({
    'Text Formatting': items.filter((item) =>
      ['h1', 'h2', 'paragraph'].includes(item.type)
    ),
    'List Formatting': items.filter((item) =>
      ['bullet', 'number'].includes(item.type)
    ),
    'Special Blocks': items.filter((item) =>
      ['quote', 'code'].includes(item.type)
    ),
    'AI Commands': items.filter((item) => item.type.startsWith('ai-')),
  }).forEach(([category, categoryItems]) => {
    if (categoryItems.length > 0) {
      flattenedItems.push({ isCategory: true, title: category });
      currentIndex++;

      categoryItems.forEach((item) => {
        selectableIndices.push(currentIndex);
        flattenedItems.push({ ...item, isCategory: false });
        currentIndex++;
      });
    }
  });

  return (
    <div className="absolute left-[-2px] top-0 z-50 w-72 rounded-lg border border-[var(--border)] bg-[var(--foreground)] shadow-[0_8px_30px_rgba(0,0,0,0.08)]">
      {flattenedItems.map((item, index) =>
        item.isCategory ? (
          <p
            key={item.title}
            className="px-2 pt-1 pb-0 !mt-0 !text-[8px] font-medium uppercase text-[var(--text-secondary)] border-t-[0.5px] border-t-[var(--border)]"
          >
            {item.title}
          </p>
        ) : (
          <SlashMenuItem
            key={item.type}
            title={item.title}
            description={item.description}
            onClick={() => onSelect(item)}
            selected={selectableIndices[selectedIndex] === index}
            item={item}
          />
        )
      )}
    </div>
  );
}
