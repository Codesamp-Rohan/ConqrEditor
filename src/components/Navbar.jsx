import Image from "next/image";
import logo from "../../public/logo.png";

export const Navbar = () => {

  return (
    <div className="flex items-center justify-between w-full pt-2 px-4 z-[9999]">
      <Image src={logo} width={60} alt="conqr-logo" className="brightness-0" />
    </div>
  );
};
