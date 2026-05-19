"use client";

import { useEffect, useState } from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import BlockActions from "../blocks/BlockActions";
import {$getNearestNodeFromDOMNode} from "lexical";

export default function BlockHoverPlugin() {
    const [editor] = useLexicalComposerContext();
    const [position, setPosition] = useState({
        x: 0,
        y: 0,
    });
    const [visible, setVisible] = useState(false);
    const [activeBlock, setActiveBlock] = useState(null);
    const [draggedBlock, setDraggedBlock] = useState(null);

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

        const handleDragOver = (e) => {
  e.preventDefault();
};

const handleDrop = (e) => {
  e.preventDefault();

  if (!draggedBlock) return;

  const target = e.target;

  if (!(target instanceof HTMLElement)) return;

  const dropBlock = target.closest(
    "p, h1, h2, h3, pre, blockquote, li"
  );

  if (
    !dropBlock ||
    dropBlock === draggedBlock
  ) {
    return;
  }

  editor.update(() => {
    const draggedNode =
      $getNearestNodeFromDOMNode(
        draggedBlock
      );

    const targetNode =
      $getNearestNodeFromDOMNode(
        dropBlock
      );

    if (
      draggedNode &&
      targetNode
    ) {
      targetNode.insertBefore(
        draggedNode
      );
    }
  });

  draggedBlock.classList.remove(
    "opacity-50"
  );

  setDraggedBlock(null);
};

rootElement.addEventListener(
  "dragover",
  handleDragOver
);

rootElement.addEventListener(
  "drop",
  handleDrop
);

        return () => {
            rootElement.removeEventListener(
                "mousemove",
                handleMouseMove
            );
            rootElement.removeEventListener(
  "dragover",
  handleDragOver
);

rootElement.removeEventListener(
  "drop",
  handleDrop
);
        };
    }, [editor, draggedBlock]);

    if (!visible) return null;

    return (
        <BlockActions
            position={position}
            activeBlock={activeBlock}
            setDraggedBlock={setDraggedBlock}
        />
    )
}