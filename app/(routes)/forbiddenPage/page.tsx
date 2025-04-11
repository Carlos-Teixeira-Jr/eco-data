'use client';

import { useRouter } from "next/navigation";
import Logo from "../../assets/logos/siapesqlogo.svg";

const ForbiddenPage = () => {
  const navigator = useRouter();
  return (
    <div className="relative h-[25rem] overflow-hidden drop-shadow-2xl w-[95%] px-10 rounded-tl-[125px] rounded-br-[125px] mt-10">
      <div className="absolute inset-0 bg-[url(/Tech-and-Environment-1024x614.webp)] bg-cover bg-center bg-fixed grayscale opacity-55 w-full" />

      <div className="absolute inset-0 bg-gradient-to-l from-secondary-300 to-primary-200 opacity-70 px-20" />

      <div className="relative z-10 top-[5%] scale-125">
        <div className="flex flex-col items-center gap-2 justify-center py-5">
          <img
            src={Logo.src}
            alt="logo"
            className="md:w-40 md:h-40 w-30 h-30"
          />
          <h3 className="text-tertiary-400 text-lg text-center">Você precisa estar logado para acessar essa página</h3>
          <h5>Por favor, faca login e tente novamente</h5>
          <button className="btn-dark" onClick={() => navigator.push("/login")}>Login</button>
        </div>
      </div>
    </div>
  );
};

export default ForbiddenPage;
