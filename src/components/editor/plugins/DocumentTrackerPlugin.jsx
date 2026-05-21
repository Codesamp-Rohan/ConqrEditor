'use client';

import { useEffect } from 'react';

import { $getRoot } from 'lexical';

import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';

import { useAIStore } from '@/store/aiStore';

export default function DocumentTrackerPlugin() {
  const [editor] = useLexicalComposerContext();

  const setDocumentText = useAIStore((state) => state.setDocumentText);

  useEffect(() => {
    return editor.registerUpdateListener(({ editorState }) => {
      editorState.read(() => {
        const text = $getRoot().getTextContent();

        setDocumentText(text);
      });
    });
  }, [editor]);

  return null;
}
