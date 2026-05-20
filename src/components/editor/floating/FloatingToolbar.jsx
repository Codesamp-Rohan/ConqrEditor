import {
    Bold,
    Italic,
    Underline,
} from "lucide-react";

import FloatingToolbarButton from "./FloatingToolbarButton";
import { motion } from "framer-motion";
import { useState } from "react";

import {
    $getSelection,
    $isRangeSelection,
    FORMAT_TEXT_COMMAND,
} from "lexical";

import { $patchStyleText } from "@lexical/selection";

export default function FloatingToolbar({
                                            position,
                                            editor,
                                        }) {
    const [fontSize, setFontSize] =
        useState(16);

    const changeFontSize = (size) => {
        editor.update(() => {
            const selection =
                $getSelection();

            if (
                $isRangeSelection(
                    selection
                )
            ) {
                $patchStyleText(
                    selection,
                    {
                        "font-size": `${size}px`,
                    }
                );
            }
        });
    };

    return (
        <motion.div
            initial={{
                opacity: 0,
                scale: 0.95,
                y: 6,
            }}
            animate={{
                opacity: 1,
                scale: 1,
                y: 0,
            }}
            exit={{
                opacity: 0,
                scale: 0.95,
                y: 6,
            }}
            transition={{
                duration: 0.15,
            }}
            style={{
                position: "fixed",
                left: position.x,
                top: position.y,
            }}
            className="z-50 flex items-center gap-1 rounded-lg bg-[var(--background)] p-1 text-[var(--text-secondary)] shadow-2xl !shadow-black/60 border border-[var(--border)]"
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

            <select
                value={fontSize}
                onChange={(e) => {
                    const size =
                        parseInt(
                            e.target.value,
                            10
                        );

                    setFontSize(size);
                    changeFontSize(size);
                }}
                className="h-8 px-2 rounded-md bg-[var(--foreground)] text-[var(--text-secondary)] border border-[var(--border)]"
            >
                {[
                    10, 12, 14, 16, 18,
                    20,
                ].map((size) => (
                    <option
                        key={size}
                        value={size}
                    >
                        {size}px
                    </option>
                ))}
            </select>
        </motion.div>
    );
}