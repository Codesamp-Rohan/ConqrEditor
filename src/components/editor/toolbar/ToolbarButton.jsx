import { cn } from "@/lib/utils";

export default function ToolbarButton({children, active, onClick,}) {
    return (
        <button onClick={onClick} className={cn("flex h-9 w-9 items-center justify-center rounded-sm cursor-pointer", "hover:bg-[var(--foreground)]", active && "bg-gray-200")}>
            {children}
        </button>
    );
}