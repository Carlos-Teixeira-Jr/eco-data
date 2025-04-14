const AboutMeSection = () => {
  return (
    <section className="md:px-40 px-5 py-8.5 flex flex-col md:flex-row md:gap-52 gap-5 items-center">
      <div className="flex-1">
        <h1 className="font-normal text-5xl md:text-6xl text-secondary-600">
          Carlos Teixeira
        </h1>
      </div>
      <div className="flex-1">
        <h5 className="font-normal text-lg text-neutral-500">
          Olá! Sou desenvolvedor full-stack com mais de 2 anos de experiência em
          projetos reais, liderando equipe e entregando soluções com Next.js,
          NestJS, MongoDB e TypeScript. Sigo boas práticas como Clean Code,
          SOLID e POO. Tenho vivência com deploys, servidores, metodologias
          ágeis e também com Java e design. Sou movido por desafios e
          comprometido com resultados que geram valor. Vamos conversar?
        </h5>
      </div>
    </section>
  );
};

export default AboutMeSection;
