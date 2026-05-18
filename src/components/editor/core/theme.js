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
        ul: "list-disc ml-6 mb-2",
        ol: "list-decimal ml-6 mb-2",
        listitem: "mb-1",
    },

    quote:
        "border-l-4 border-[var(--border)] pl-4 italic text-[--text-secondary]",

    code: "bg-[#111827] text-white rounded-xl p-4 font-mono text-sm my-4",
};

export default theme;