"use client";

import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";

import editorConfig from "./core/config";
import Toolbar from "./toolbar/Toolbar";

export default function Editor() {
    return (
        <div className="min-h-screen bg-[--background] px-6 py-10 flex items-center">
            <div className="mx-auto h-screen w-full flex items-center justify-center bg-[--background] rounded-lg p-4">
                <div className="relative border border-[var(--border)] rounded-lg w-[90%] max-w-[1080px] bg-[var(--foreground)] overflow-hidden">
                    <LexicalComposer initialConfig={editorConfig}>
                        <Toolbar />
                        <RichTextPlugin
                            contentEditable={
                                <ContentEditable className="min-h-[500px] px-6 py-5 outline-none text-[16px] leading-7" />
                            }
                            placeholder={
                                <div
                                    className="absolute top-12 left-6 text-[16px] leading-7 text-[--text-muted] placeholder:text-[--text-muted] pointer-events-none"
                                    style={{
                                        padding: "16px",
                                    }}
                                >
                                    Press "/" for commands
                                </div>
                            }
                        />

                        <HistoryPlugin />
                    </LexicalComposer>
                </div>
            </div>
        </div>
    );
}