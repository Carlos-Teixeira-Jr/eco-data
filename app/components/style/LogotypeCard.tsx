"use client";
import { usePathname } from "next/navigation";
import Image from "next/image";
import SiapesLogo from "../../assets/logos/siapesqlogo.svg"

const LogotypeCard = () => {
  const pathname = usePathname();
  return (
    <>
      {pathname !== "/login" && pathname !== "/signup" ? (
        <div className="flex-1 flex flex-col md:flex-row items-center">
          <h1
            className="logo-big bg-white/20 backdrop-blur-md rounded-4xl border border-white/20 shadow-md p-5 md:p-10"
            style={{ fontFamily: "Syndra, sans-serif" }}
          >
            SIAPESQ
            <br />
            Eco•Data
          </h1>
        </div>
      ) : (
        <Image src={SiapesLogo} alt={""} className="w-40 h-40"/>
      )}
    </>
  );
};

export default LogotypeCard;
