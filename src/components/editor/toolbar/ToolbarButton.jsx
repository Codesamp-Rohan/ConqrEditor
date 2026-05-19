import { cn } from "@/lib/utils";

export default function ToolbarButton({children, active, onClick,}) {
    return (
        <button onClick={onClick} className={cn("flex h-6 w-6 items-center justify-center rounded-sm cursor-pointer", "hover:bg-[var(--foreground)]", active && "bg-[var(--foreground)]")}>
            {children}
        </button>
    );
}