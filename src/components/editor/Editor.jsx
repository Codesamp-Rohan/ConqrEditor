'use client';

import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import EditorAutoFocusPlugin from '@/components/editor/plugins/AutoFocusPlugin';
import EditorListPlugin from '@/components/editor/plugins/ListPlugin';
import SlashCommandPlugin from '@/components/editor/plugins/SlashCommandPlugin';
import FloatingToolbarPlugin from '@/components/editor/plugins/FloatingToolbarPlugin';
import BlockHoverPlugin from '@/components/editor/plugins/BlockHoverPlugin';
import SelectionPlugin from '@/components/editor/plugins/SelectionPlugin';
import ReplaceSelectionPlugin from '@/components/editor/plugins/ReplaceSelectionPlugin';
import DocumentTrackerPlugin from '@/components/editor/plugins/DocumentTrackerPlugin';
import { useState } from 'react';
import SettingsModal from './settings/SettingsModal';
import { useAIStore } from '@/store/aiStore';
import { ibmPlex } from '@/lib/fonts';
import editorConfig from './core/config';
import Toolbar from './toolbar/Toolbar';
import LocalStoragePlugin from '@/components/editor/plugins/LocalStoragePlugin';
import ClearEditorPlugin from '@/components/editor/plugins/ClearEditorPlugin';
import { Navbar } from '../Navbar';
import AISidebar from './ai/AISidebar';

export default function Editor() {
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [clearTrigger, setClearTrigger] = useState(0);
  const { loading } = useAIStore();

  return (
    <LexicalComposer initialConfig={editorConfig}>
      {loading && (
        <div
          className="pointer-events-none fixed flex items-center gap-2 rounded-4xl border border-[var(--border)] bg-[var(--conqr-secondary)] px-4 py-1 text-sm shadow-2xl backdrop-blur-md animate-in fade-in slide-in-from-bottom-2 duration-200"
          style={{
            position: 'flxed',
            bottom: '1rem',
            left: '50%',
            transform: 'translateX(-50%)',
            width: 'fit-content',
            zIndex: 999,
          }}
        >
          <div className="h-2 w-2 rounded-full bg-[var(--conqr-muted)] animate-pulse" />

          <p style={{ color: 'var(--conqr-muted)' }}>
            Generating AI response...
          </p>
        </div>
      )}
      <div className="min-h-screen bg-[var(--conqr-primary)] flex flex-col items-center relative overflow-hidden bg-[#f6ead7]">
        {/* Background Glow */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Top Right Glow */}
          <div
            className="absolute top-[-20%] right-[-10%] h-[500px] w-[500px] rounded-full blur-3xl opacity-40"
            style={{
              background:
                'radial-gradient(circle, #f8d89a 0%, transparent 70%)',
            }}
          />

          {/* Bottom Left Glow */}
          <div
            className="absolute bottom-[-35%] left-[-20%] h-[900px] w-[900px] rounded-full blur-3xl opacity-70"
            style={{
              background:
                'radial-gradient(circle, #f2b16d 0%, #f2b16d99 25%, transparent 72%)',
            }}
          />

          {/* Soft White Center */}
          <div
            className="absolute inset-0 opacity-80"
            style={{
              background:
                'radial-gradient(circle at center, #fffdf9 0%, transparent 70%)',
            }}
          />
        </div>
        <Navbar
          setSettingsOpen={setSettingsOpen}
          onClear={() => {
            setClearTrigger((prev) => prev + 1);
          }}
        />
        <div className="mx-auto h-full w-full flex items-center justify-center bg-[var(--conqr-primary)] p-4">
          {/* Main Editor */}
          <div
            className="relative overflow-auto w-screen border border-[var(--border)] shadow-none h-screen max-h-[90vh] max-w-[1080px] bg-[#ffffff44] backdrop-blur-[4px]"
            style={{ borderRadius: '.5rem' }}
          >
            <Toolbar />
            <EditorAutoFocusPlugin />
            <EditorListPlugin />
            <SlashCommandPlugin />
            <FloatingToolbarPlugin />
            <BlockHoverPlugin />
            <SelectionPlugin />
            <ReplaceSelectionPlugin />
            <ClearEditorPlugin clearTrigger={clearTrigger} />
            <DocumentTrackerPlugin />
            <RichTextPlugin
              contentEditable={
                <ContentEditable
                  className={`editor-content ${ibmPlex.className} min-h-[500px] h-[calc(100% - 64px)] px-[4rem] py-5 outline-none text-[var(--text-conqr)]`}
                  spellCheck={false}
                  data-gramm="false"
                  data-gramm_editor="false"
                  data-enable-grammarly="false"
                />
              }
              placeholder={
                <div className="pointer-events-none absolute left-17 top-[68px] text-[12px] font-mono font-[family:var(--font-editor)] text-[var(--text-conqr)]">
                  Press "/" for commands
                </div>
              }
            />

            <HistoryPlugin />
            <LocalStoragePlugin />
          </div>
          <AISidebar />
        </div>
      </div>
      <SettingsModal
        open={settingsOpen}
        onClose={() => setSettingsOpen(false)}
      />
    </LexicalComposer>
  );
}
