import { useEffect } from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";

const STORAGE_KEY = "editor-content";

export default function LocalStoragePlugin() {
    const [editor] =
        useLexicalComposerContext();

    useEffect(() => {
        const saved =
            localStorage.getItem(
                STORAGE_KEY
            );

        if (!saved) return;

        try {
            const parsed =
                JSON.parse(saved);

            const editorState =
                editor.parseEditorState(
                    parsed
                );

            editor.setEditorState(
                editorState
            );
        } catch (err) {
            console.error(
                "Failed to restore editor:",
                err
            );
        }
    }, [editor]);

    useEffect(() => {
        let timeout;

        return editor.registerUpdateListener(
            ({ editorState }) => {
                clearTimeout(timeout);

                timeout = setTimeout(() => {
                    editorState.read(() => {
                        const json =
                            editorState.toJSON();

                        localStorage.setItem(
                            STORAGE_KEY,
                            JSON.stringify(
                                json
                            )
                        );
                    });
                }, 500);
            }
        );
    }, [editor]);

    return null;
}