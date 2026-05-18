const theme = {
    paragraph: "mb-2 text-[16px] leading-7 text-[--text-primary]",

    heading: {
        h1: "text-4xl font-bold mb-4 mt-6",
        h2: "text-3xl font-semibold mb-3 mt-5",
        h3: "text-2xl font-semibold mb-3 mt-4",
    },
    text: {
        bold: "font-bold",
        italic: "italic",
        underline: "underline",
        code: "bg-muted px-1 py-0.5 rounded text-sm font-mono",
    },
    list: {
        ul: "list-disc ml-6 my-2",
        ol: "list-decimal ml-6 my-2",
        listitem: "mb-1",
    },
    quote:
        "border-l-4 border-[var(--border)] pl-4 italic text-[--text-secondary]",
    code: "bg-[var(--background)] text-[#d4d4d4] px-1 py-0.5 rounded font-mono text-sm",
    codeHighlight: {
        keyword: "text-[#c586c0]",
        string: "text-[#ce9178]",
        comment: "text-[#6a9955]",
        variable: "text-[#9cdcfe]",
        punctuation: "text-[#d4d4d4]",
    },
    codeBlock:
        "editor-content relative block overflow-x-auto rounded-2xl px-4 py-4 my-4 font-mono text-[14px] leading-6 text-[#e5e7eb]",
};

export default theme;