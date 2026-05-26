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
  const [exportOpen, setExportOpen] = useState(false);

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

    const pdf = new jsPDF({
      unit: "pt",
      format: "a4",
    });

    const margin = 40;

    const pageWidth = pdf.internal.pageSize.getWidth();

    const pageHeight = pdf.internal.pageSize.getHeight();

    const maxLineWidth = pageWidth - margin * 2;

    const lineHeight = 18;

    const lines = pdf.splitTextToSize(content, maxLineWidth);

    let cursorY = margin;

    lines.forEach((line) => {
      // ADD NEW PAGE IF OVERFLOW
      if (cursorY > pageHeight - margin) {
        pdf.addPage();

        cursorY = margin;
      }

      pdf.text(line, margin, cursorY);

      cursorY += lineHeight;
    });

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
    <div className="flex items-center justify-between w-full pt-2 px-4 z-[9999]">
      <Image src={logo} width={60} alt="conqr-logo" className="brightness-0" />
      <div className="flex items-center gap-2">
        <button
          onClick={onClear}
          className="flex items-center gap-2 rounded-md px-2 py-1 text-[11px] bg-[var(--foreground)] hover:bg-[var(--conqr-secondary)] cursor-pointer hover:text-[var(--hover)] hover:shadow-xl shadow-black/5 hover:translate-y-[-1px] transition-[800ms]"
        >
          <Eraser size={12} />
          Clear
        </button>
        <div className="relative z-[1000]">
          <button
            onClick={() => setExportOpen((prev) => !prev)}
            className="flex items-center gap-2 rounded-md px-2 py-1 text-[11px] bg-[var(--foreground)] hover:bg-[var(--conqr-secondary)] cursor-pointer hover:text-[var(--hover)] hover:shadow-xl shadow-black/5 hover:translate-y-[-1px] transition-[800ms]"
          >
            <Download size={12} />
            Export As
          </button>

          {exportOpen && (
            <div className="absolute right-0 top-[110%] min-w-[120px] overflow-hidden rounded-xl border border-[#ece7df] bg-white shadow-2xl">
              <button
                onClick={() => {
                  exportMarkdown();
                  setExportOpen(false);
                }}
                className="flex w-full items-center gap-2 cursor-pointer px-3 py-2 text-left text-[11px] text-[#555] transition-all hover:bg-[#f7f4ef]"
              >
                <Download size={11} />
                Markdown
              </button>

              <button
                onClick={() => {
                  exportPDF();
                  setExportOpen(false);
                }}
                className="flex w-full items-center gap-2 cursor-pointer px-3 py-2 text-left text-[11px] text-[#555] transition-all hover:bg-[#f7f4ef]"
              >
                <Download size={11} />
                PDF
              </button>

              <button
                onClick={() => {
                  exportDOCX();
                  setExportOpen(false);
                }}
                className="flex w-full items-center gap-2 cursor-pointer px-3 py-2 text-left text-[11px] text-[#555] transition-all hover:bg-[#f7f4ef]"
              >
                <Download size={11} />
                DOCX
              </button>
            </div>
          )}
        </div>
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
