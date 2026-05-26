'use client';

import { useEffect } from 'react';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $getRoot, $createParagraphNode, $createTextNode } from 'lexical';

export default function DefaultDocumentPlugin({ content }) {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    editor.update(() => {
      const root = $getRoot();

      // Prevent duplicate loading
      if (root.getTextContent().trim() !== '') return;

      root.clear();

      content.split('\n').forEach((line) => {
        const paragraph = $createParagraphNode();

        paragraph.append($createTextNode(line));

        root.append(paragraph);
      });
    });
  }, [editor, content]);

  return null;
}
