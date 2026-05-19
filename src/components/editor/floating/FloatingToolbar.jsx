import {
    Bold,
    Italic,
    Underline,
} from "lucide-react";

import FloatingToolbarButton from "./FloatingToolbarButton";
import { FORMAT_TEXT_COMMAND } from "lexical";
import { motion } from "framer-motion";

export default function FloatingToolbar({position, editor,}) {
    return (
        <motion.div initial={{opacity: 0, scale: 0.95, y: 6}} animate={{ opacity: 1, scale: 1, y: 0,}} exit={{opacity: 0, scale: 0.95, y: 6 }} transition={{duration: 0.15}} style={{position: "fixed", left: position.x, top: position.y,}}
            className="z-50 flex items-center gap-1 rounded-lg bg-[var(--background)] p-1 text-[var(--text-secondary)] shadow-2xl !shadow-black/60 z-999 border border-[var(--border)]"
        >
            <FloatingToolbarButton
                onClick={() => {
                    editor.dispatchCommand(
                        FORMAT_TEXT_COMMAND,
                        "bold"
                    );
                }}
            >
                <Bold size={16} />
            </FloatingToolbarButton>

            <FloatingToolbarButton
                onClick={() => {
                    editor.dispatchCommand(
                        FORMAT_TEXT_COMMAND,
                        "italic"
                    );
                }}
            >
                <Italic size={16} />
            </FloatingToolbarButton>

            <FloatingToolbarButton
                onClick={() => {
                    editor.dispatchCommand(
                        FORMAT_TEXT_COMMAND,
                        "underline"
                    );
                }}
            >
                <Underline size={16} />
            </FloatingToolbarButton>
        </motion.div>
    );
}