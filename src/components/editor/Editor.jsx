"use client";

import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import EditorAutoFocusPlugin from "@/components/editor/plugins/AutoFocusPlugin";
import EditorListPlugin from "@/components/editor/plugins/ListPlugin";
import SlashCommandPlugin from "@/components/editor/plugins/SlashCommandPlugin";
import FloatingToolbarPlugin from "@/components/editor/plugins/FloatingToolbarPlugin";
import BlockHoverPlugin from "@/components/editor/plugins/BlockHoverPlugin";
import { useState } from "react";
import { Settings } from "lucide-react";
import SettingsModal from "./settings/SettingsModal";
import { useAIStore } from "@/store/aiStore";

import editorConfig from "./core/config";
import Toolbar from "./toolbar/Toolbar";
import SlashMenu from "./slash/SlashMenu";

export default function Editor() {
    const [settingsOpen, setSettingsOpen] = useState(false);
    const { loading } = useAIStore();
    
    return (
        <div className="min-h-screen bg-[--background] flex items-center">
            <div className="mx-auto h-screen w-full flex items-center justify-center bg-[--background] rounded-lg p-4">
                <div className="relative border border-[var(--border)] overflow-auto rounded-lg w-screen h-screen max-h-[95vh] max-w-[1080px] bg-[var(--foreground)]">
                    <LexicalComposer initialConfig={editorConfig}>
                            <button onClick={() =>setSettingsOpen(true)} className="absolute h-[30px] flex items-center gap-2 cursor-pointer rounded-md border border-[var(--border)] px-2 text-sm transition-all bg-[var(--foreground)] hover:bg-[var(--hover)]" style={{ right: "4px", top: "4px", zIndex: 100}}>
                                <Settings size={14} />
                                AI Settings
                            </button>
                        <Toolbar />
                        <EditorAutoFocusPlugin />
                        <EditorListPlugin />
                        <SlashCommandPlugin />
                        <FloatingToolbarPlugin />
                        <BlockHoverPlugin />
                        <RichTextPlugin
                            contentEditable={
                                <ContentEditable className="editor-content min-h-[500px] h-[calc(100% - 64px)] px-[4rem] py-5 outline-none text-[16px] leading-7 text-[var(--text-primary)]" spellCheck={false} data-gramm="false" data-gramm_editor="false" data-enable-grammarly="false"/>
                            }
                            placeholder={
                            <div className="pointer-events-none absolute left-17 top-[68px] text-[15px] text-[var(--text-muted)]">Press "/" for commands</div>
                        }
                        />

                        <HistoryPlugin />
                        <SettingsModal open={settingsOpen} onClose={() =>setSettingsOpen(false)}/>
                    </LexicalComposer>
                    {loading && (
  <div className="pointer-events-none absolute bottom-4 right-4 z-50 flex items-center gap-2 rounded-2xl border border-[var(--border)] bg-[var(--foreground)] px-4 py-2 text-sm shadow-2xl backdrop-blur-md animate-in fade-in slide-in-from-bottom-2 duration-200">
    
    <div className="h-2 w-2 rounded-full bg-[var(--primary)] animate-pulse" />

    <span className="text-[var(--text-secondary)]">
      Generating AI response...
    </span>
  </div>
)}
                </div>
            </div>
        </div>
    );
}