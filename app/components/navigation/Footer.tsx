import Link from "next/link";
import GithubIcon from "../../assets/icons/Github.svg";
import InstagramIcon from "../../assets/icons/Instagram.svg";
import YoutubeIcon from "../../assets/icons/Youtube.svg";
import Image from "next/image";
import FurgIcon from "../../assets/logos/logo-furg.png";
import CnpqIcon from "../../assets/logos/cnpq.png";
import CentelhaIcon from "../../assets/logos/centelha.png";
import FooterBackground from "../../assets/images/footer-bg.png";

const Footer = () => {
  const footerListItens = [
    {
      title: "LINKS ÚTEIS",
      links: ["FAQ", "Contato", "Sobre"],
    },
    {
      title: "INFORMAÇÕES",
      links: ["Termos de uso", "Privacidade", "Acessibilidade"],
    },
    {
      title: "SOFTWARE",
      links: ["Minha conta", "Desenvolvedor", "Documentação"],
    },
  ];

  const socialIcons = [
    {
      name: "github",
      link: "https://www.github.com",
      icon: GithubIcon,
    },
    {
      name: "instagram",
      link: "https://www.instagram.com",
      icon: InstagramIcon,
    },
    {
      name: "youtube",
      link: "https://youtube.com",
      icon: YoutubeIcon,
    },
  ];

  const partners = [
    {
      name: "FURG",
      link: "https://www.furg.br",
      icon: FurgIcon,
    },
    {
      name: "CNPq",
      link: "https://www.gov.br/cnpq",
      icon: CnpqIcon,
    },
    {
      name: "Centelha",
      link: "https://programacentelha.com.br",
      icon: CentelhaIcon,
    },
  ];

  return (
    <footer className="flex flex-col justify-between bg-secondary-600 px-5 md:px-42 pt-16 md:pt-26 mt-10 relative">
      <div className="absolute inset-0">
        <Image
          src={FooterBackground}
          alt="Background Image"
          fill
          quality={100}
          priority
          className="object-cover opacity-30"
          sizes="100vw"
        />
      </div>
      <div className="flex flex-col md:flex-row justify-between w-full pb-10 relative z-10">
        <div className="flex flex-col justify-center items-center w-fit mb-8 md:mb-0 mx-auto md:mx-0">
          <h1>SIAPESQ</h1>
          <div className="pb-8 text-primary-100">
            <h5>siapesq@gmail.com</h5>
            <h5>53 99950-3671</h5>
          </div>

          <div className="flex gap-6">
            {socialIcons.map((item) => (
              <Link href={item.link} key={item.name}>
                <Image
                  src={item.icon}
                  alt={item.name}
                  width={24}
                  height={24}
                  className="w-10 h-10"
                />
              </Link>
            ))}
          </div>
        </div>

        <div className="flex justify-between gap-5 md:gap-18 pt-5 md:pt-0">
          {footerListItens.map((item, i) => (
            <ul className="flex flex-col gap-4 mx-0 md:mx-auto" key={i}>
              <h6 className="md:mb-4 text-primary-100">{item.title}</h6>
              {item.links.map((link) => (
                <li key={link}>{link}</li>
              ))}
            </ul>
          ))}
        </div>

        <div className="flex flex-col gap-4 md:gap-8 items-center pt-8 md:pt-0">
          <h6 className="md:mb-4 text-primary-100">PARCEIROS</h6>
          <div className="flex w-full justify-around items-center gap-8">
            {partners.map((item) => (
              <Link href={item.link} key={item.name}>
                <Image
                  src={item.icon}
                  alt={item.name}
                  width={item.name === "FURG" ? 35 : 75}
                  height={item.name === "FURG" ? 35 : 75}
                />
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-col pb-5 relative z-10">
        <hr className="w-full text-white" />
        <h6 className="text-primary-100 text-center pt-5">
          © {new Date().getFullYear()} desenvolvido por Carlos Teixeira.
        </h6>
      </div>
    </footer>
  );
};

export default Footer;
