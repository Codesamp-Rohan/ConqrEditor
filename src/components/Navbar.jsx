import Image from "next/image";
import logo from "../../public/logo.png";
import { ArrowLeft } from "lucide-react";

export const Navbar = () => {

  return (
    <div className="flex flex-col items-start justify-between w-full pt-2 px-4 z-[9999]">
      <a href="https://conqr-site.vercel.app/" className="text-[#bbb] flex items-center gap-2 mb-8">
      <ArrowLeft size={20} /> View All Demos</a>
      <div className="flex flex-col items-center gap-2 w-full mt-4">
        <h1 className="text-3xl !font-medium !text-[var(--text-conqr)] is-font">Conqr Words-Add In</h1>
        <p className="text-[16px] text-[#777] text-center" style={{ lineHeight: "1.2" }}>No new software. No training.<br/> Just better contracts on MS word.</p>
      </div>
        <div className="bg-[#e0e0e0] w-full !w-[100%] p-4 border-x-4 border-[var(--conqr-secondary)] mt-8">
        <h3 className="text-[16px] !font-medium !text-[var(--text-conqr)]">This demo showcases many of Conqr Words Add-in AI features. Try it out by typing a word in the text editor.</h3>
      </div>
    </div>
  );
};
