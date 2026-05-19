"use client";

import { useEffect, useState } from "react";
import { Bold, Italic, Underline } from "lucide-react";
import { $getSelection, $isRangeSelection, FORMAT_TEXT_COMMAND } from "lexical";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import HeadingDropdown from "./HeadingDropdown";
import ToolbarButton from "./ToolbarButton";
import {List, ListOrdered, LucideMessageSquareQuote, Code2,} from "lucide-react";
import {$createQuoteNode} from "@lexical/rich-text";
import {$createCodeNode,} from "@lexical/code";
import {$setBlocksType,} from "@lexical/selection";
import {INSERT_ORDERED_LIST_COMMAND, INSERT_UNORDERED_LIST_COMMAND,} from "@lexical/list";
import {FORMAT_ELEMENT_COMMAND} from "lexical";
import {AlignLeft,AlignCenter,AlignRight,AlignJustify} from "lucide-react";
import { Palette } from "lucide-react";
import {$patchStyleText} from "@lexical/selection";
import ColorPicker from "./ColorPicker";

export default function Toolbar() {
    const [editor] = useLexicalComposerContext();
    const [activeFormats, setActiveFormats] = useState({bold: false,italic: false,underline: false});
    const [showColors, setShowColors] = useState(false);

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
        <div className={`sticky top-0 z-50 flex items-center !gap-[3.5px] p-1 border-b border-b-[var(--border)] bg-[var(--background)]`}>
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
<div className="mx-1 h-6 w-px bg-[var(--border)]" />
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
    <div className="mx-1 h-6 w-px bg-[var(--border)]" />
            <ToolbarButton
                onClick={() => {
                    editor.update(() => {
                        const selection = $getSelection();

                        if ($isRangeSelection(selection)) {
                            $setBlocksType(selection, () =>
                                $createQuoteNode()
                            );
                        }
                    });
                }}
            >
                <LucideMessageSquareQuote size={14} />
            </ToolbarButton>
            <ToolbarButton
                onClick={() => {
                    editor.update(() => {
                        const selection = $getSelection();

                        if ($isRangeSelection(selection)) {
                            $setBlocksType(selection, () =>
                                $createCodeNode()
                            );
                        }
                    });
                }}
            >
                <Code2 size={14} />
            </ToolbarButton>
    <div className="mx-1 h-6 w-px bg-[var(--border)]" />
            <ToolbarButton
  onClick={() => {
    editor.dispatchCommand(
      FORMAT_ELEMENT_COMMAND,
      "left"
    );
  }}
>
  <AlignLeft size={14} />
</ToolbarButton>

<ToolbarButton
  onClick={() => {
    editor.dispatchCommand(
      FORMAT_ELEMENT_COMMAND,
      "center"
    );
  }}
>
  <AlignCenter size={14} />
</ToolbarButton>

<ToolbarButton
  onClick={() => {
    editor.dispatchCommand(
      FORMAT_ELEMENT_COMMAND,
      "right"
    );
  }}
>
  <AlignRight size={14} />
</ToolbarButton>

<ToolbarButton
  onClick={() => {
    editor.dispatchCommand(
      FORMAT_ELEMENT_COMMAND,
      "justify"
    );
  }}
>
  <AlignJustify size={14} />
</ToolbarButton>
    <div className="mx-1 h-6 w-px bg-[var(--border)]" />

    {/* Colour */}
    <div className="relative">
  <ToolbarButton
    onClick={() =>
      setShowColors(
        (prev) => !prev
      )
    }
  >
    <Palette size={14} />
  </ToolbarButton>

  {showColors && (
    <ColorPicker
      onSelect={(color) => {
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
                color,
              }
            );
          }
        });

        setShowColors(false);
      }}
    />
  )}
</div>
        </div>
    );
}