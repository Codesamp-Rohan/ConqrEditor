"use client";

import { useEffect, useState } from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import BlockActions from "../blocks/BlockActions";

export default function BlockHoverPlugin() {
    const [editor] = useLexicalComposerContext();
    const [position, setPosition] = useState({
        x: 0,
        y: 0,
    });
    const [visible, setVisible] = useState(false);
    const [activeBlock, setActiveBlock] = useState(null);

    useEffect(() => {
        const rootElement = editor.getRootElement();

        if (!rootElement) return;

        const handleMouseMove = (event) => {
            const target = event.target;

            if (!(target instanceof HTMLElement)) return;

            const block = target.closest(
                "p, h1, h2, h3, pre, blockquote, li"
            );

            if (!block) {
                setVisible(false);
                return;
            }
            setActiveBlock(block);
            block.ondragover = (e) => {
                e.preventDefault();
            };

            block.ondrop = (e) => {
                e.preventDefault();

                const draggingEl =
                    document.querySelector(".opacity-50");

                if (
                    draggingEl &&
                    draggingEl !== block
                ) {
                    block.parentNode.insertBefore(
                        draggingEl,
                        block
                    );

                    draggingEl.classList.remove(
                        "opacity-50"
                    );
                }
            };
            const rect = block.getBoundingClientRect();

            setPosition({
                x: rect.left - 60,
                y: rect.top + 4,
            });

            setVisible(true);
        };

        rootElement.addEventListener(
            "mousemove",
            handleMouseMove
        );

        return () => {
            rootElement.removeEventListener(
                "mousemove",
                handleMouseMove
            );
        };
    }, [editor]);

    if (!visible) return null;

    return (
        <BlockActions
            position={position}
            activeBlock={activeBlock}
        />
    )
}