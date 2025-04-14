"use client";

import { useState } from "react";

type Tech = {
  id: number;
  name: string;
  key: string;
  image: string;
  width: string;
  resume: string;
};

const TechStack = () => {
  const [isSelected, setIsSelected] = useState<{ [key: string]: boolean }>({
    next: false,
    react: false,
    tailwind: false,
    node: false,
    mongo: false,
    typescript: false,
    git: false,
    github: false,
    nest: false,
    java: false,
  });

  const [selectedResume, setSelectedResume] = useState("");

  const techs: Tech[] = [
    {
      id: 1,
      name: "Next.js",
      key: "next",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Nextjs-logo.svg/1200px-Nextjs-logo.svg.png",
      width: "120px",
      resume:
        "Trabalho com Next.js, aproveitando seus recursos de renderização híbrida (SSR e SSG) para criar aplicações rápidas e escaláveis. Utilizo API Routes para criar proxis entre frontend e o backend, otimizo o desempenho com roteamento dinâmico e tratamento de imagens e tiro o melhor proveito do suporte integrado a TypeScript para fortalecer a tipagem do Javascript. Também tenho experiência em integrar Next.js com bancos de dados, criar fluxos de autenticação via tokens e funções rodando em Edge Servers para criar experiências web eficientes e integradas.",
    },
    {
      id: 2,
      name: "React",
      key: "react",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png",
      width: "",
      resume:
        "Trabalho com React.js criando interfaces de usuário dinâmicas e interativas usando arquitetura baseada em componentes funcionais. Utilizo hooks para gerenciamento de estado de variáveis e ciclo de vida de componentes, otimizo o desempenho com memorização e API de contexto do React e crio experiências integradas com o React Router para navegação. Também integro o React com soluções de estilo modernas, como Tailwind, MUI e Styled Components, garantindo aplicativos responsivos e escaláveis.",
    },
    {
      id: 3,
      name: "Tailwind",
      key: "tailwind",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Tailwind_CSS_Logo.svg/1200px-Tailwind_CSS_Logo.svg.png",
      width: "",
      resume:
        "Trabalho com o Tailwind CSS para criar designs altamente personalizáveis ​​e responsivos usando classes que priorizam a utilidade. Utilizo seus sistemas flexbox e grid para gerenciamento de layout, utilizo breakpoints responsivos para designs mobile first e aplico temas personalizados para atender aos requisitos da marca. O Tailwind me permite prototipar e construir estilos escaláveis ​​e sustentáveis ​​rapidamente, sem precisar escrever CSS personalizado, garantindo um código limpo e eficiente.",
    },
    {
      id: 4,
      name: "Node.js",
      key: "node",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Node.js_logo.svg/1200px-Node.js_logo.svg.png",
      width: "100px",
      resume:
        "Trabalho com Node.js para criar aplicações escaláveis ​​e eficientes de backend. Aproveito sua arquitetura assíncrona e orientada a eventos para lidar com alta concorrência e uso Express.js para criar APIs RESTful. Tenho experiência em integração de bancos de dados como MongoDB e PostgreSQL, gerenciamento de autenticação com JWT e construção de lógica do lado do servidor para diversas funcionalidades. O Node.js me permite criar backends rápidos, leves e de alto desempenho que escalam com facilidade.",
    },
    {
      id: 5,
      name: "MongoDB",
      key: "mongo",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/MongoDB_Logo.svg/1200px-MongoDB_Logo.svg.png",
      width: "150px",
      resume:
        "Trabalho com o MongoDB para construir bancos de dados flexíveis e escaláveis ​​para minhas aplicações. Aproveito seu modelo orientado a documentos para armazenar e consultar dados de forma eficiente, utilizando o Mongoose para validação de schemas e manipular dados. Tenho experiência em executar consultas complexas, indexar para otimização e lidar com relacionamentos por meio de incorporação ou referência. A escalabilidade e o desempenho do MongoDB me permitem projetar bancos de dados que crescem perfeitamente com a aplicação.",
    },
    {
      id: 6,
      name: "Typescript",
      key: "typescript",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Typescript_logo_2020.svg/1200px-Typescript_logo_2020.svg.png",
      width: "60px",
      resume:
        "Trabalho com TypeScript para aprimorar o desenvolvimento de aplicações escaláveis ​​e sustentáveis. Utilizo tipagem forte para detectar erros em tempo de compilação, implementar interfaces e alias de tipo para estruturas de dados claras e aproveitar os recursos de tipagem genérica para criar código reutilizável e flexível. O TypeScript aprimora a qualidade e a colaboração do código, garantindo melhores ferramentas, autocomplete e suporte à refatoração, tornando o processo de desenvolvimento mais eficiente e confiável.",
    },
    {
      id: 7,
      name: "Git",
      key: "git",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Git_icon.svg/1200px-Git_icon.svg.png",
      width: "65px",
      resume:
        "Trabalho com o Git para controle de versões, utilizando-o para gerenciar alterações de código e colaborar eficientemente em projetos. Sigo um fluxo de trabalho estruturado, criando branches de funcionalidades, realizando conventional commits com mensagens claras e utilizando o rebase e o merge do Git para lidar com conflitos. Também utilizo o GitHub e o GitLab para repositórios remotos, colaborando em pull requests e mantendo a qualidade do código por meio de revisões. O Git garante colaboração fluida, acompanhamento do histórico de código e fluxos de trabalho de implantação perfeitos.",
    },
    {
      id: 8,
      name: "Github",
      key: "github",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Octicons-mark-github.svg/1200px-Octicons-mark-github.svg.png",
      width: "70px",
      resume:
        "Trabalho com o GitHub para gerenciar e colaborar em projetos usando controle de versão. Utilizo-o para hospedar repositórios, criar e revisar pull requests e gerenciar problemas e projetos para acompanhar o progressode forma clara. Utilizo o GitHub Actions para integração e implantação contínuas (CI/CD), automatizando fluxos de trabalho de teste e implantação. O GitHub aprimora a colaboração, o controle de versão e o gerenciamento de projetos, tornando-o uma ferramenta central no meu processo de desenvolvimento.",
    },
    {
      id: 10,
      name: "Java",
      key: "java",
      image:
        "https://upload.wikimedia.org/wikipedia/en/thumb/3/30/Java_programming_language_logo.svg/1200px-Java_programming_language_logo.svg.png",
      width: "50px",
      resume:
        "Trabalho com Java para construir aplicações robustas e de alto desempenho. Aproveito seus princípios de orientação a objetos, como herança, polimorfismo e encapsulamento, para criar código sustentável. Utilizo frameworks populares como Spring para construir APIs e microsserviços escaláveis e utilizo ferramentas como o Hibernate para gerenciamento de banco de dados. A tipagem robusta e o vasto ecossistema do Java me permitem desenvolver aplicações seguras, escaláveis ​​e multiplataforma com eficiência.",
    },
    {
      id: 9,
      name: "Nest.js",
      key: "nest",
      image:
        "https://www.vhv.rs/dpng/d/498-4989583_nestjs-logo-hd-png-download.png",
      width: "70px",
      resume:
        "Trabalho com NestJS para criar aplicações escaláveis ​​e sustentáveis ​​do lado do servidor usando TypeScript. Aproveito sua arquitetura modular para organizar recursos e serviços, implementar injeção de dependências para um código limpo e testável e utilizar decoradores para roteamento, middleware e validação. O NestJS integra-se facilmente com bancos de dados, sistemas de autenticação e microsserviços, fornecendo uma estrutura robusta e eficiente para o desenvolvimento de APIs e serviços de back-end.",
    },
  ];

  /**
   * Lida com a seleção de um item deo array de tecnologias.
   * Se a tecnologia estiver selecionada, ela remove a seleção e limpa o resumo.
   * Se a tecnologia não estiver selecionada, ela adiciona a seleção e mostra o resumo.
   * Faz o scroll suave para o elemento de resumo selecionado, se ele existir.
   * @param {Tech} tech A tecnologia selecionada.
   */
  const handleSelectTech = (tech: Tech) => {
    if (isSelected[tech.key]) {
      setIsSelected({ ...isSelected, [tech.key]: false });
      setSelectedResume("");
      return;
    } else {
      setIsSelected({ ...isSelected, [tech.key]: true });
      setSelectedResume(tech.resume);
      const resumeDiv = document.getElementById("resume");
      if (resumeDiv) {
        resumeDiv.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <section
      className="flex flex-col gap-4 md:px-20 px-5 py-12 w-full justify-center items-center"
      id="resume"
    >
      <div className="grid grid-cols-2 md:grid-cols-10 gap-8 w-full">
        {techs.map((tech) => (
          <div
            key={tech.id}
            className="flex flex-col items-center justify-center md:justify-between h-full cursor-pointer"
            onClick={() => handleSelectTech(tech)}
          >
            <img
              src={tech.image}
              alt={tech.name}
              className="md:w-20 w-10"
              style={{ width: tech.width }}
            />
            <h5 className="hidden md:block">{tech.name}</h5>
          </div>
        ))}
      </div>
      <div className="md:w-2/3 py-8">
        <h5 className="font-normal text-neutral-500">{selectedResume}</h5>
      </div>
    </section>
  );
};

export default TechStack;
