"use client";

import { useState } from "react";
import {
    GripVertical,
    Plus,
} from "lucide-react";
import SlashMenu from "../slash/SlashMenu";
import { slashItems } from "../slash/items";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";

import {
    $getSelection,
    $isRangeSelection,
    $createParagraphNode,
} from "lexical";

import {
    $createHeadingNode,
    $createQuoteNode,
} from "@lexical/rich-text";

import {
    INSERT_ORDERED_LIST_COMMAND,
    INSERT_UNORDERED_LIST_COMMAND,
} from "@lexical/list";

import {
    $setBlocksType,
} from "@lexical/selection";

import {
    $createCodeNode,
} from "@lexical/code";

export default function BlockActions({
                                         position, activeBlock
                                     }) {
    const [open, setOpen] = useState(false);
    const [editor] = useLexicalComposerContext();
    const [dragging, setDragging] = useState(false);

    const handleCommand = (item) => {
        editor.update(() => {
            const selection = $getSelection();

            if (!$isRangeSelection(selection)) return;

            switch (item.type) {
                case "h1":
                    $setBlocksType(selection, () =>
                        $createHeadingNode("h1")
                    );
                    break;

                case "h2":
                    $setBlocksType(selection, () =>
                        $createHeadingNode("h2")
                    );
                    break;

                case "bullet":
                    editor.dispatchCommand(
                        INSERT_UNORDERED_LIST_COMMAND,
                        undefined
                    );
                    break;

                case "number":
                    editor.dispatchCommand(
                        INSERT_ORDERED_LIST_COMMAND,
                        undefined
                    );
                    break;

                case "quote":
                    $setBlocksType(selection, () =>
                        $createQuoteNode()
                    );
                    break;

                case "code":
                    $setBlocksType(selection, () =>
                        $createCodeNode()
                    );
                    break;

                default:
                    $setBlocksType(selection, () =>
                        $createParagraphNode()
                    );
            }
        });

        setOpen(false);
    };

    return (
        <div
            style={{
                position: "fixed",
                left: position.x,
                top: position.y,
            }}
            className="z-50 flex items-center gap-1"
        >
            <button
                draggable

                onDragStart={(e) => {
                    setDragging(true);

                    e.dataTransfer.setData(
                        "text/plain",
                        ""
                    );

                    e.dataTransfer.effectAllowed =
                        "move";

                    if (activeBlock) {
                        activeBlock.classList.add(
                            "opacity-50"
                        );
                    }
                }}

                onDragEnd={() => {
                    setDragging(false);

                    if (activeBlock) {
                        activeBlock.classList.remove(
                            "opacity-50"
                        );
                    }
                }}
                className="flex h-7 w-7 items-center justify-center rounded-md text-[var(--text-secondary)] transition-all hover:bg-[var(--hover)] hover:text-[var(--text-primary)]"
            >
                <GripVertical size={16} />
            </button>

            <div className="relative">
                <button
                    onClick={(e) => {
                        e.stopPropagation();

                        setOpen((prev) => !prev);
                    }}
                    className="flex h-7 w-7 items-center justify-center rounded-md text-[var(--text-secondary)] transition-all hover:bg-[var(--hover)] hover:text-[var(--text-primary)]"
                >
                    <Plus size={16} />
                </button>

                {open && (
                    <div className="absolute left-10 top-0">
                        <SlashMenu
                            items={slashItems}
                            onSelect={handleCommand}
                        />
                    </div>
                )}
            </div>
        </div>
    );
}