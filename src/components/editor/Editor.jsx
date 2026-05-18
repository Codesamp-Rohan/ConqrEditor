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

import editorConfig from "./core/config";
import Toolbar from "./toolbar/Toolbar";
import SlashMenu from "./slash/SlashMenu";

export default function Editor() {
    return (
        <div className="min-h-screen bg-[--background] flex items-center">
            <div className="mx-auto h-screen w-full flex items-center justify-center bg-[--background] rounded-lg p-4">
                <div className="relative border border-[var(--border)] rounded-lg w-screen h-screen max-h-[95vh] max-w-[1080px] bg-[var(--foreground)] overflow-hidden">
                    <LexicalComposer initialConfig={editorConfig}>
                        <Toolbar />
                        <EditorAutoFocusPlugin />
                        <EditorListPlugin />
                        <SlashCommandPlugin />
                        <FloatingToolbarPlugin />
                        <BlockHoverPlugin />
                        <RichTextPlugin
                            contentEditable={
                                <ContentEditable className="editor-content min-h-[500px] px-[4rem] py-5 outline-none text-[16px] leading-7" spellCheck={false} data-gramm="false" data-gramm_editor="false" data-enable-grammarly="false"/>
                            }
                            placeholder={
                            <div className="pointer-events-none absolute left-17 top-[68px] text-[15px] text-[var(--text-muted)]">Press "/" for commands</div>
                        }
                        />

                        <HistoryPlugin />
                    </LexicalComposer>
                </div>
            </div>
        </div>
    );
}