import { useEffect } from 'react';
import { $getSelection } from 'lexical';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';

import { useAIStore } from '@/store/aiStore';

export default function SelectionPlugin() {
  const [editor] = useLexicalComposerContext();

  const setSelectedText = useAIStore((state) => state.setSelectedText);

  useEffect(() => {
    return editor.registerUpdateListener(() => {
      editor.getEditorState().read(() => {
        const selection = $getSelection();

        if (!selection) return;

        const text = selection.getTextContent();

        setSelectedText(text);
      });
    });
  }, [editor, setSelectedText]);

  return null;
}
