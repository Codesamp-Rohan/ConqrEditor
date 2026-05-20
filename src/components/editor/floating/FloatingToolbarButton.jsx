export default function FloatingToolbarButton({ children, onClick }) {
  return (
    <button
      onClick={onClick}
      className="flex h-8 w-8 items-center justify-center rounded-lg transition-all hover:bg-[var(--hover)] cursor-pointer text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
    >
      {children}
    </button>
  );
}
