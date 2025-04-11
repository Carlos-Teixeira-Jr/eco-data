import Logo from "../../assets/logos/siapesqlogo.svg";

const BannerSection = () => {
  return (
    <div className="relative h-[30rem] overflow-hidden drop-shadow-2xl w-[95%] px-20 rounded-tl-[125px] rounded-br-[125px]">
      <div className="absolute inset-0 bg-[url(/Tech-and-Environment-1024x614.webp)] bg-cover bg-center bg-fixed grayscale opacity-55 w-full" />

      <div className="absolute inset-0 bg-gradient-to-l from-secondary-300 to-primary-200 opacity-70 px-20" />

      <div className="relative z-10 top-[35%] scale-125">
        <div className="flex flex-col md:flex-row items-center gap-5 justify-center">
          <img
            src={Logo.src}
            alt="logo"
            className="md:w-40 md:h-40 w-40 h-40"
          />
        </div>
      </div>
    </div>
  );
};

export default BannerSection;
