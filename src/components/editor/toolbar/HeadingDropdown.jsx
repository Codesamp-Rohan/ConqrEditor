'use client';

import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';

import {
  $getSelection,
  $isRangeSelection,
  $createParagraphNode,
} from 'lexical';

import { $createHeadingNode } from '@lexical/rich-text';

import { $setBlocksType } from '@lexical/selection';

export default function HeadingDropdown() {
  const [editor] = useLexicalComposerContext();

  const formatHeading = (headingSize) => {
    editor.update(() => {
      const selection = $getSelection();

      if ($isRangeSelection(selection)) {
        if (headingSize === 'paragraph') {
          $setBlocksType(selection, () => $createParagraphNode());
        } else {
          $setBlocksType(selection, () => $createHeadingNode(headingSize));
        }
      }
    });
  };

  return (
    <select
      onChange={(e) => formatHeading(e.target.value)}
      className="h-5 rounded-md border border-[var(--border)] bg-[var(--foreground)] px-3 text-sm outline-none"
    >
      <option value="paragraph">Paragraph</option>
      <option value="h1">Heading 1</option>
      <option value="h2">Heading 2</option>
      <option value="h3">Heading 3</option>
    </select>
  );
}
