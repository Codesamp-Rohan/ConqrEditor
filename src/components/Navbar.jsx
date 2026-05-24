import UploadButton from "@/components/editor/upload/UploadButton";
import ImportPlugin from "@/components/editor/plugins/ImportPlugin";
import { Bean, Eraser, Download } from "lucide-react";
import SlashMenu from "@/components/editor/slash/SlashMenu";
import { useState } from "react";
import Image from "next/image";
import logo from "../../public/logo.png";
import { saveAs } from "file-saver";
import { Document, Packer, Paragraph } from "docx";
import jsPDF from "jspdf";
import MarkdownIt from "markdown-it";

export const Navbar = ({ setSettingsOpen, onClear }) => {
  const [uploadedContent, setUploadedContent] = useState("");

  const handleExport = () => {
    const content = localStorage.getItem("editor-content");

    if (!content) return;

    const blob = new Blob([content], {
      type: "application/json",
    });

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");

    a.href = url;

    a.download = "conqr-document.json";

    a.click();

    URL.revokeObjectURL(url);
  };

  const md = new MarkdownIt();

  const getEditorContent = () => {
    return localStorage.getItem("editor-content");
  };

  const downloadFile = (content, filename, type) => {
    const blob = new Blob([content], {
      type,
    });

    saveAs(blob, filename);
  };

  const exportMarkdown = () => {
    const editor = document.querySelector(".editor-content");

    if (!editor) return;

    const content = editor.innerText;

    const blob = new Blob([content], {
      type: "text/markdown;charset=utf-8",
    });

    saveAs(blob, "conqr-document.md");
  };

  const exportPDF = () => {
    const editor = document.querySelector(".editor-content");

    if (!editor) return;

    const content = editor.innerText;

    const pdf = new jsPDF();

    const lines = pdf.splitTextToSize(content, 180);

    pdf.text(lines, 10, 10);

    pdf.save("conqr-document.pdf");
  };

  const exportDOCX = async () => {
    const editor = document.querySelector(".editor-content");

    if (!editor) return;

    const content = editor.innerText;

    const doc = new Document({
      sections: [
        {
          children: [
            new Paragraph({
              text: content,
            }),
          ],
        },
      ],
    });

    const blob = await Packer.toBlob(doc);

    saveAs(blob, "conqr-document.docx");
  };

  return (
    <div className="flex items-center justify-between w-full pt-2 px-4">
      <Image src={logo} width={60} alt="conqr-logo" className="brightness-0" />
      <div className="flex items-center gap-2">
        <button
          onClick={onClear}
          className="flex items-center gap-2 rounded-md px-2 py-1 text-[11px] bg-[var(--foreground)] hover:bg-[var(--conqr-secondary)] cursor-pointer hover:text-[var(--hover)] hover:shadow-xl shadow-black/5 hover:translate-y-[-1px] transition-[800ms]"
        >
          <Eraser size={12} />
          Clear
        </button>
        <button
          onClick={exportMarkdown}
          className="flex items-center gap-1 rounded-md px-2 py-1 text-[11px] bg-[var(--foreground)] hover:bg-[var(--conqr-secondary)] hover:text-[var(--hover)]"
        >
          <Download size={12} />
          MD
        </button>

        <button
          onClick={exportPDF}
          className="flex items-center gap-1 rounded-md px-2 py-1 text-[11px] bg-[var(--foreground)] hover:bg-[var(--conqr-secondary)] hover:text-[var(--hover)]"
        >
          <Download size={12} />
          PDF
        </button>

        <button
          onClick={exportDOCX}
          className="flex items-center gap-1 rounded-md px-2 py-1 text-[11px] bg-[var(--foreground)] hover:bg-[var(--conqr-secondary)] hover:text-[var(--hover)]"
        >
          <Download size={12} />
          DOCX
        </button>
        <button
          onClick={handleExport}
          className="flex items-center gap-2 rounded-md px-2 py-1 text-[11px] bg-[var(--foreground)] hover:bg-[var(--conqr-secondary)] cursor-pointer hover:text-[var(--hover)] hover:shadow-xl shadow-black/5 hover:translate-y-[-1px] transition-[800ms]"
        >
          <Download size={14} />
          Export
        </button>
        <UploadButton onLoad={setUploadedContent} />
        <ImportPlugin content={uploadedContent} />
        <button
          onClick={() => setSettingsOpen(true)}
          className="flex items-center gap-2 rounded-md px-2 py-1 text-[11px] bg-[var(--conqr-secondary)] hover:bg-[var(--conqr-secondary)] cursor-pointer text-[var(--white)] hover:text-[var(--hover)] hover:shadow-xl shadow-black/5 hover:translate-y-[-1px] transition-[800ms]"
          style={{ right: "4px", top: "4px", zIndex: 100 }}
        >
          <Bean size={14} />
          AI API
        </button>
      </div>
    </div>
  );
};
