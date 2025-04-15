import Image from "next/image";
import Logo from "../../assets/logos/siapesqlogo.svg";

const LogoBanner = () => (
  <div className="relative drop-shadow-2xl">
    <div className="absolute inset-0 bg-[url(/tartaruga.jpg)] bg-cover bg-fixed grayscale opacity-55" />
    <div className="relative z-10 flex flex-col items-center justify-center gap-10 md:flex-row h-full py-20 text-tertiary-400 ">
      <h2 className="font-bold text-4xl flex-1 text-center">Sustentabilidade</h2>
      <Image src={Logo} alt="Logo" width={350} height={350} className=" flex-1"/>
      <h2 className="font-bold text-4xl flex-1 text-center">Tecnologia</h2>
    </div>
  </div>
);

export default LogoBanner;
