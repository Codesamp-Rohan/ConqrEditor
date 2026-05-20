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
    import SettingsModal from "./settings/SettingsModal";
    import { useAIStore } from "@/store/aiStore";
    import { ibmPlex } from "@/lib/fonts";
    import editorConfig from "./core/config";
    import Toolbar from "./toolbar/Toolbar";
    import LocalStoragePlugin from "@/components/editor/plugins/LocalStoragePlugin";
    import { Navbar } from "../Navbar";

    export default function Editor() {
        const [settingsOpen, setSettingsOpen] = useState(false);
        const { loading } = useAIStore();
        
        return (
        <LexicalComposer initialConfig={editorConfig}>
            <div className="min-h-screen bg-[var(--conqr-primary)] flex flex-col items-center">
                    <Navbar setSettingsOpen={setSettingsOpen} />
                <div className="mx-auto h-full w-full flex items-center justify-center bg-[var(--conqr-primary)] rounded-lg p-4">
                    <div className="relative border border-[var(--border)] overflow-auto rounded-lg w-screen h-screen max-h-[90vh] max-w-[1080px] bg-[var(--conqr-muted)]">
                            <Toolbar />
                            <EditorAutoFocusPlugin />
                            <EditorListPlugin />
                            <SlashCommandPlugin />
                            <FloatingToolbarPlugin />
                            <BlockHoverPlugin />
                            <RichTextPlugin
                                contentEditable={
                                    <ContentEditable className={`editor-content ${ibmPlex.className} min-h-[500px] h-[calc(100% - 64px)] px-[4rem] py-5 outline-none leading-7 text-[var(--text-conqr)]`} spellCheck={false} data-gramm="false" data-gramm_editor="false" data-enable-grammarly="false"/>
                                }
                                placeholder={
                                <div className="pointer-events-none absolute left-17 top-[68px] text-[12px] font-mono font-[family:var(--font-editor)] text-[var(--text-conqr)]">Press "/" for commands</div>
                            }
                            />

                            <HistoryPlugin />
                            <LocalStoragePlugin />
                            <SettingsModal open={settingsOpen} onClose={() =>setSettingsOpen(false)}/>
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
            </LexicalComposer>
        );
    }