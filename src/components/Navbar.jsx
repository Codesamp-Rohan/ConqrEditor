import UploadButton from "@/components/editor/upload/UploadButton";
import ImportPlugin from "@/components/editor/plugins/ImportPlugin";
import { Bean } from "lucide-react";
import SlashMenu from "@/components/editor/slash/SlashMenu";
import { useState } from "react";
import Image from "next/image";
import logo from "../../public/logo.png";

export const Navbar = ({ setSettingsOpen }) => {
  const [uploadedContent, setUploadedContent] = useState("");

  return (
    <div className="flex items-center justify-between w-full pt-2 px-4">
      <Image src={logo} width={60} alt="conqr-logo" className="brightness-0" />
      <div className="flex items-center gap-2">
        <UploadButton onLoad={setUploadedContent} />
        <ImportPlugin content={uploadedContent} />
        <button
          onClick={() => setSettingsOpen(true)}
          className="flex items-center gap-2 rounded-md px-2 py-1 text-sm bg-[var(--foreground)] hover:bg-[var(--conqr-secondary)] cursor-pointer hover:text-[var(--hover)] hover:shadow-xl shadow-black/5 hover:translate-y-[-1px] transition-[800ms]"
          style={{ right: "4px", top: "4px", zIndex: 100 }}
        >
          <Bean size={14} />
          AI API
        </button>
      </div>
    </div>
  );
};
