import { useEffect } from 'react';
import { $getRoot, $createParagraphNode } from 'lexical';

import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';

export default function ClearEditorPlugin({ clearTrigger }) {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    if (!clearTrigger) return;

    editor.update(() => {
      const root = $getRoot();

      root.clear();

      root.append($createParagraphNode());
    });
  }, [clearTrigger, editor]);

  return null;
}
