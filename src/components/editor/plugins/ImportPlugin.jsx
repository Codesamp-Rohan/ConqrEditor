import { useEffect } from 'react';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';

import { $getRoot, $createParagraphNode, $createTextNode } from 'lexical';

export default function ImportPlugin({ content }) {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    if (!content) return;

    editor.update(() => {
      const root = $getRoot();

      root.clear();

      const lines = content.split('\n');

      lines.forEach((line) => {
        const paragraph = $createParagraphNode();

        paragraph.append($createTextNode(line));

        root.append(paragraph);
      });
    });
  }, [content, editor]);

  return null;
}
