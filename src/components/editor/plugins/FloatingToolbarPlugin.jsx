"use client";

import { useEffect, useState } from "react";

import {
    $getSelection,
    $isRangeSelection,
} from "lexical";

import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";

import FloatingToolbar from "../floating/FloatingToolbar";

export default function FloatingToolbarPlugin() {
    const [editor] = useLexicalComposerContext();

    const [visible, setVisible] = useState(false);

    const [position, setPosition] = useState({
        x: 0,
        y: 0,
    });

    useEffect(() => {
        return editor.registerUpdateListener(
            ({ editorState }) => {
                editorState.read(() => {
                    const selection = $getSelection();

                    if (
                        !$isRangeSelection(selection) ||
                        selection.isCollapsed()
                    ) {
                        setVisible(false);
                        return;
                    }

                    const domSelection =
                        window.getSelection();

                    if (
                        !domSelection ||
                        domSelection.rangeCount === 0
                    ) {
                        return;
                    }

                    const range =
                        domSelection.getRangeAt(0);

                    const rect =
                        range.getBoundingClientRect();

                    setPosition({
                        x:
                            rect.left +
                            rect.width / 2 -
                            60,

                        y: rect.top - 50,
                    });

                    setVisible(true);
                });
            }
        );
    }, [editor]);

    if (!visible) return null;

    return (
        <FloatingToolbar
            position={position}
            editor={editor}
        />
    );
}