"use client";

import { useEffect, useState } from "react";
import { Bold, Italic, Underline } from "lucide-react";
import { $getSelection, $isRangeSelection, FORMAT_TEXT_COMMAND } from "lexical";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import HeadingDropdown from "./HeadingDropdown";
import ToolbarButton from "./ToolbarButton";
import {
  List,
  ListOrdered,
} from "lucide-react";

import {
  INSERT_ORDERED_LIST_COMMAND,
  INSERT_UNORDERED_LIST_COMMAND,
} from "@lexical/list";

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
        <div className={`flex items-center gap-[0.5px] p-1 border-b border-b-[var(--border)] bg-[var(--background)]`}>
            <HeadingDropdown />
            <ToolbarButton
                active={activeFormats.bold}
                onClick={() => {
                    editor.dispatchCommand(FORMAT_TEXT_COMMAND, "bold");
                }}
            >
                <Bold size={14} />
            </ToolbarButton>

            <ToolbarButton
                active={activeFormats.italic}
                onClick={() => {
                    editor.dispatchCommand(FORMAT_TEXT_COMMAND, "italic");
                }}
            >
                <Italic size={14} />
            </ToolbarButton>

            <ToolbarButton
                active={activeFormats.underline}
                onClick={() => {
                    editor.dispatchCommand(FORMAT_TEXT_COMMAND, "underline");
                }}
            >
                <Underline size={14} />
            </ToolbarButton>

            <ToolbarButton
  onClick={() => {
    editor.dispatchCommand(
      INSERT_UNORDERED_LIST_COMMAND,
      undefined
    );
  }}
>
  <List size={14} />
</ToolbarButton>

<ToolbarButton
  onClick={() => {
    editor.dispatchCommand(
      INSERT_ORDERED_LIST_COMMAND,
      undefined
    );
  }}
>
  <ListOrdered size={14} />
</ToolbarButton>
        </div>
    );
}