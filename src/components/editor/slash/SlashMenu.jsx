import SlashMenuItem from "./SlashMenuItem";

export default function SlashMenu() {
  return (
    <div className="absolute left-0 top-12 z-50 w-72 rounded-2xl border border-[var(--border)] bg-[var(--foreground)] p-2 shadow-[0_8px_30px_rgba(0,0,0,0.08)]">
      <SlashMenuItem
        title="Heading 1"
        description="Large section heading"
      />

      <SlashMenuItem
        title="Bullet List"
        description="Create unordered list"
      />

      <SlashMenuItem
        title="Code Block"
        description="Insert code snippet"
      />

      <SlashMenuItem
        title="Flashcard"
        description="Generate study flashcard"
      />
    </div>
  );
}