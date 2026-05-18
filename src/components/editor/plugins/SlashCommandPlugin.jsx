"use client";

import { useEffect, useState } from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import SlashMenu from "@/components/editor/slash/SlashMenu";
import { slashItems } from "@/components/editor/slash/items";
import {
    $createParagraphNode,
    $getSelection,
    $isRangeSelection,
    COMMAND_PRIORITY_LOW,
    KEY_DOWN_COMMAND,
} from "lexical";
import { $createHeadingNode, $createQuoteNode } from "@lexical/rich-text";
import {
    INSERT_ORDERED_LIST_COMMAND,
    INSERT_UNORDERED_LIST_COMMAND,
} from "@lexical/list";
import { $setBlocksType } from "@lexical/selection";
import { $createCodeNode } from "@lexical/code";

export default function SlashCommandPlugin() {
    const [editor] = useLexicalComposerContext();
    const [open, setOpen] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [query, setQuery] = useState("");
    const [selectedIndex, setSelectedIndex] = useState(0);

    const handleCommand = (item) => {
        editor.update(() => {
            const selection = $getSelection();

            if (!$isRangeSelection(selection)) return;

            // Perform action based on the selected item
            switch (item.type) {
                case "h1":
                    $setBlocksType(selection, () => $createHeadingNode("h1"));
                    break;

                case "h2":
                    $setBlocksType(selection, () => $createHeadingNode("h2"));
                    break;

                case "bullet":
                    editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined);
                    break;

                case "number":
                    editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined);
                    break;

                case "quote":
                    $setBlocksType(selection, () => $createQuoteNode());
                    break;

                case "code":
                    $setBlocksType(selection, () => $createCodeNode());
                    break;

                default:
                    $setBlocksType(selection, () => $createParagraphNode());
                    break;
            }
        });

        // Close the menu
        setOpen(false);
        setQuery(""); // Clear query after execution
    };

    const filteredItems = slashItems.filter((item) =>
        item.title.toLowerCase().includes(query.toLowerCase())
    );

    useEffect(() => {
        setSelectedIndex(0); // Reset selection index when query changes
    }, [query]);

    useEffect(() => {
        const removeUpdateListener = editor.registerUpdateListener(({ editorState }) => {
            editorState.read(() => {
                const selection = $getSelection();

                if (!$isRangeSelection(selection)) return;

                const anchorNode = selection.anchor.getNode();
                const text = anchorNode.getTextContent();
                const cursorOffset = selection.anchor.offset;
                const textBeforeCursor = text.slice(0, cursorOffset);

                // Detect `/` to open the menu but close on specific conditions
                const slashIndex = textBeforeCursor.lastIndexOf("/");
                if (/^<\/?[\w\s]*>$/.test(textBeforeCursor)) {
                    // If it's a valid opening/closing tag, close the dropdown
                    setOpen(false);
                    setQuery(""); // Clear query
                    return;
                }

                if (slashIndex !== -1) {
                    const searchText = textBeforeCursor.slice(slashIndex + 1);

                    setQuery(searchText);

                    const domSelection = window.getSelection();
                    if (!domSelection || domSelection.rangeCount === 0) return;

                    const range = domSelection.getRangeAt(0);
                    const rect = range.getBoundingClientRect();

                    setPosition({
                        x: rect.left,
                        y: rect.bottom + 8,
                    });

                    setOpen(true);
                } else {
                    setOpen(false);
                    setQuery(""); // Also clear the search query
                }
            });
        });

        const removeKeyListener = editor.registerCommand(
            KEY_DOWN_COMMAND,
            (event) => {
                if (!open) return false;

                switch (event.key) {
                    case "ArrowDown":
                        event.preventDefault();

                        // Navigate through items using arrow keys
                        setSelectedIndex((prev) =>
                            prev < filteredItems.length - 1 ? prev + 1 : 0
                        );

                        return true;

                    case "ArrowUp":
                        event.preventDefault();

                        setSelectedIndex((prev) =>
                            prev > 0 ? prev - 1 : filteredItems.length - 1
                        );

                        return true;

                    case "Enter":
                        event.preventDefault();

                        if (filteredItems[selectedIndex]) {
                            handleCommand(filteredItems[selectedIndex]);
                        }

                        return true;

                    case "Escape":
                        event.preventDefault();

                        setOpen(false);

                        return true;

                    default:
                        return false;
                }
            },
            COMMAND_PRIORITY_LOW
        );

        return () => {
            removeUpdateListener();
            removeKeyListener();
        };
    }, [editor, open, filteredItems, selectedIndex]);

    if (!open) return null;

    return (
        <div
            style={{ position: "fixed", left: position.x, top: position.y }}
            className="z-50"
        >
            <SlashMenu items={filteredItems} onSelect={handleCommand} selectedIndex={selectedIndex} />
        </div>
    );
}