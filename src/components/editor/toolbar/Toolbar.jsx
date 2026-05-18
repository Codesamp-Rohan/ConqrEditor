"use client";

import { useEffect, useState } from "react";
import { Bold, Italic, Underline } from "lucide-react";
import { $getSelection, $isRangeSelection, FORMAT_TEXT_COMMAND } from "lexical";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import ToolbarButton from "./ToolbarButton";

export default function Toolbar() {
    const [editor] = useLexicalComposerContext();

    const [activeFormats, setActiveFormats] = useState({
        bold: false,
        italic: false,
        underline: false,
    });

    useEffect(() => {
        return editor.registerUpdateListener(({ editorState }) => {
            editorState.read(() => {
                const selection = $getSelection();

                if ($isRangeSelection(selection)) {
                    setActiveFormats({
                        bold: selection.hasFormat("bold"),
                        italic: selection.hasFormat("italic"),
                        underline: selection.hasFormat("underline"),
                    });
                }
            });
        });
    }, [editor]);

    return (
        <div className={`flex items-center gap-[0.5px] px-2 py-1 border-b border-b-[var(--border)] bg-[var(--background)]`}>
            <ToolbarButton
                active={activeFormats.bold}
                onClick={() => {
                    editor.dispatchCommand(FORMAT_TEXT_COMMAND, "bold");
                }}
            >
                <Bold size={18} />
            </ToolbarButton>

            <ToolbarButton
                active={activeFormats.italic}
                onClick={() => {
                    editor.dispatchCommand(FORMAT_TEXT_COMMAND, "italic");
                }}
            >
                <Italic size={18} />
            </ToolbarButton>

            <ToolbarButton
                active={activeFormats.underline}
                onClick={() => {
                    editor.dispatchCommand(FORMAT_TEXT_COMMAND, "underline");
                }}
            >
                <Underline size={18} />
            </ToolbarButton>
        </div>
    );
}