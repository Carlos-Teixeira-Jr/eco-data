'use client'

import { useRouter } from "next/navigation";

const AboutSection = () => {
  const navigator = useRouter();
  return (
    <section className="md:px-40 px-5 py-8.5 flex flex-col md:flex-row md:gap-52 gap-5 md:mt-[5.5%]">
      <div className="flex-1 flex flex-col md:flex-row items-center">
        <h1 className="logo-big" style={{ fontFamily: "Syndra, sans-serif" }}>
          SIAPESQ
          <br />
          Eco • Data
        </h1>
      </div>
      <div className="flex-1 flex flex-col items-center">
        <h4 className="font-normal text-neutral-500">
          O{" "}
          <span className="font-bold text-primary-100 text-xl">
            Siapesq Eco Data
          </span>{" "}
          é uma aplicação intuitiva voltada à exploração de informações
          taxonômicas e ecológicas sobre espécies, com base nos dados da API do Global
          <i>Biodiversity Information Facility <a href="https://www.gbif.org" about="_blank">(GBIF)</a></i>. A plataforma foi
          desenvolvida para apoiar estudantes, educadores e agentes
          socioambientais em pesquisas e projetos voltados à conservação,
          sustentabilidade e educação ambiental.
        </h4>
        <button className="btn-dark" onClick={() => navigator.push("/aboutApp")}>Saber mais</button>
      </div>
    </section>
  );
};

export default AboutSection;
