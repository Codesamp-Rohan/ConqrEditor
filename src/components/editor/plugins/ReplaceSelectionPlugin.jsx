import { useEffect } from 'react';
import { $getSelection, $isRangeSelection } from 'lexical';

import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';

import { useAIStore } from '@/store/aiStore';

export default function ReplaceSelectionPlugin() {
  const [editor] = useLexicalComposerContext();

  const aiResponse = useAIStore((state) => state.aiResponse);

  let clearAIResponse = useAIStore((state) => state.clearAIResponse);

  useEffect(() => {
    if (!aiResponse) return;

    editor.update(() => {
      const selection = $getSelection();

      if (!$isRangeSelection(selection)) return;

      selection.insertText(aiResponse);
    });

    clearAIResponse();
  }, [aiResponse, editor, clearAIResponse]);

  return null;
}
