// components/editor/upload/UploadButton.jsx

import { useRef } from "react";
import { parseDocument } from "./parseDocument";
import { FileDown } from "lucide-react";

export default function UploadButton({ onLoad }) {
    const inputRef = useRef(null);

    async function handleFileChange(event) {
        const file = event.target.files?.[0];

        if (!file) return;

        try {
            const content = await parseDocument(file);

            onLoad(content);
        } catch (error) {
            console.error(error);
            alert("Failed to load document");
        }
    }

    return (
        <>
            <button
                onClick={() => inputRef.current?.click()}
                className="flex items-center gap-2 py-1 px-2 rounded-md hover:bg-[var(--conqr-secondary)] hover:text-[var(--hover)] text-sm bg-[var(--foreground)] cursor-pointer hover:shadow-xl shadow-black/5 hover:translate-y-[-1px] transition-[800ms]"
            >
                <FileDown size={14} />
                Upload
            </button>

            <input
                ref={inputRef}
                type="file"
                accept=".docx,.txt,.md"
                className="hidden"
                onChange={handleFileChange}
            />
        </>
    );
}