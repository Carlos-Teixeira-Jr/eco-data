import PlusIcon from "@/app/assets/icons/PlusIcon";
import SecurityIcon from "@/app/assets/icons/SecurityIcon";
import StyleIcon from "@/app/assets/icons/StyleIcon";
import SyncIcon from "@/app/assets/icons/SyncIcon";
import ToolsIcon from "@/app/assets/icons/ToolsIcons";
import FluxogramSection from "@/app/components/aboutApp/FluxogramSection";

export default function aboutApp() {
  const technicalFeatures = [
    {
      id: 1,
      content:
        "Busca por espécies utilizando consumindo a API do GBIF com Server Side Rendering (SSR).",
    },
    {
      id: 2,
      content: "Requisições paralelas com ",
      code: "Promise.allSettled",
      suffix: " para garantir disponibilidade de dados.",
    },
    {
      id: 3,
      content:
        "Disponibilização de imagens, perfis biológicos, status de conservação, e distribuição geográfica.",
    },
    {
      id: 4,
      content: "Renderização de mapas interativos com ",
      strong: ["Leaflet", "GBIF Map Tiles API"],
      suffix: ".",
    },
    {
      id: 5,
      content:
        "Carrossel customizado de imagens com transição lateral e controles de navegação.",
    },
  ];

  const securityArchitecture = [
    {
      id: 1,
      content: "Autenticação com sistema de ",
      strong: ["JWT + Refresh Token"],
      suffix: ".",
    },
    {
      id: 2,
      content:
        "Gerenciamento de cookies via http only para conferir maior segurança.",
    },
    {
      id: 3,
      content:
        "Renovação automática de token por meio de rotas protegidas e SSR seguro.",
    },
    {
      id: 4,
      content: "Validação de token nas rotas privadas do Next App Router.",
    },
    {
      id: 5,
      content: "Uso das ",
      code: "API Routes",
      suffix: " do Next.js como ",
      strong: ["proxy"],
      end: " seguro para comunicação com o banco de dados.",
    },
    {
      id: 6,
      content: "Encriptação de senhas com ",
      strong: ["bcrypt"],
      suffix: ".",
    },
    {
      id: 7,
      content:
        "Lógica de authenticação centralizada usando middlewares a nível de edge para proteção de rotas end-to-end e boa performance ",
      suffix: ".",
    },
  ];

  const stateManagement = [
    {
      id: 1,
      content: "Persistência automática via ",
      code: "redux-persist",
      suffix: " com integração ao localStorage.",
    },
    {
      id: 2,
      content: "Separação clara de responsabilidades por ",
      strong: ["slices"],
      suffix: " (auth, params, UI).",
    },
    {
      id: 3,
      content: "Hooks customizados com ",
      code: "useAppDispatch",
      and: " e ",
      code2: "useAppSelector",
      suffix: ".",
    },
  ];

  const uiUxPerformance = [
    {
      id: 1,
      content: "Design responsivo com ",
      strong: ["Tailwind CSS v4"],
      suffix: " e sistema de tipografia e cores personalizado.",
    },
    {
      id: 2,
      content: "Lazy-loading de componentes e imagens.",
    },
    {
      id: 3,
      content:
        "Renderização estática e revalidação por tempo nas rotas dinâmicas.",
    },
    {
      id: 4,
      content:
        "Separação entre Server Components e Client Components para máxima performance.",
    },
  ];

  const otherFeatures = [
    {
      id: 1,
      content: "Componentes reutilizáveis e acessíveis.",
    },
    {
      id: 2,
      content:
        "Sistema de logout com limpeza de tokens e reset de estado Redux global.",
    },
    {
      id: 3,
      content:
        "Carregadores visuais com animações suaves e transições modernas.",
    },
    {
      id: 4,
      content:
        "Menu hamburguer com animação fluída e comportamento adaptativo mobile.",
    },
    {
      id: 5,
      content:
        "Código modularizado e com rica documentação em funções, hooks e componentes cruciais para facilitar a manutenção.",
    },
    {
      id: 6,
      content: "Tipagem de dados com ",
      strong: ["TypeScript"],
      suffix: ".",
    },
  ];

  return (
    <main className="px-5 md:px-20 py-10 w-full flex flex-col gap-10 text-neutral-500">
      <section>
        <h1 className="text-4xl font-bold text-primary-100 mb-4">
          Sobre o Eco Data
        </h1>
        <p className="text-base leading-relaxed text-neutral-500">
          O <strong>Eco Data</strong> é uma plataforma construída com{" "}
          <strong>Next.js 14 (App Router + Server Components)</strong> para
          explorar, pesquisar e visualizar informações sobre espécies animais
          utilizando a API pública do{" "}
          <a
            href="https://www.gbif.org/developer/summary"
            target="_blank"
            className="text-primary-300 hover:text-primary-100 underline"
          >
            GBIF
          </a>
          . O foco está na performance, usabilidade e arquitetura escalável.
        </p>
      </section>

      <FluxogramSection />

      <section className="w-full flex flex-col-reverse md:flex-row justify-evenly items-center">
        <div className="flex flex-col py-5 md:py-0">
          <h2 className="text-2xl font-semibold text-primary-100 mb-2 text-center md:text-start">
            Funcionalidades Técnicas
          </h2>
          <ul className="list-disc flex flex-col gap-2 bg-white/20 backdrop-blur-md rounded-xl border border-white/20 shadow-md p-10">
            {technicalFeatures.map(({ id, content, code, strong, suffix }) => (
              <li
                key={id}
                className="text-neutral-500 hover:scale-100 hover:auto"
              >
                {content}
                {code && <code className="mx-1">{code}</code>}
                {strong &&
                  strong.map((word, idx) => (
                    <strong key={idx} className="mx-1">
                      {word}
                    </strong>
                  ))}
                {suffix}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex justify-center items-center border-5 border-secondary-600 rounded-full p-5">
          <ToolsIcon className="w-20 h-20 md:w-40 md:h-40" />
        </div>
      </section>

      <section className="w-full flex flex-col md:flex-row justify-evenly items-center">
        <div className="flex justify-center items-center border-5 border-secondary-600 rounded-full p-5 md:w-53 md:h-53">
          <SecurityIcon className="w-20 h-20 md:w-40 md:h-40" />
        </div>
        <div className="flex flex-col py-5 md:py-0">
          <h2 className="text-2xl font-semibold text-primary-100 mb-2 text-center md:text-start">
            Arquitetura de Segurança
          </h2>
          <ul className="list-disc flex flex-col gap-2 bg-white/20 backdrop-blur-md rounded-xl border border-white/20 shadow-md p-10">
            {securityArchitecture.map(
              ({ id, content, code, strong, suffix }) => (
                <li
                  key={id}
                  className="text-neutral-500 hover:scale-100 hover:auto"
                >
                  {content}
                  {code && <code className="mx-1">{code}</code>}
                  {strong &&
                    strong.map((word, idx) => (
                      <strong key={idx} className="mx-1">
                        {word}
                      </strong>
                    ))}
                  {suffix}
                </li>
              )
            )}
          </ul>
        </div>
      </section>

      <section className="w-full flex flex-col-reverse md:flex-row justify-evenly items-center">
        <div className="flex flex-col py-5 md:py-0">
          <h2 className="text-2xl font-semibold text-primary-100 mb-2 text-center md:text-start">
            Gerenciamento de Estado
          </h2>
          <ul className="list-disc flex flex-col gap-2 bg-white/20 backdrop-blur-md rounded-xl border border-white/20 shadow-md p-10">
            {stateManagement.map(({ id, content, code, strong, suffix }) => (
              <li
                key={id}
                className="text-neutral-500 hover:scale-100 hover:auto"
              >
                {content}
                {code && <code className="mx-1">{code}</code>}
                {strong &&
                  strong.map((word, idx) => (
                    <strong key={idx} className="mx-1">
                      {word}
                    </strong>
                  ))}
                {suffix}
              </li>
            ))}
          </ul>
        </div>
        <div className="flex justify-center items-center border-5 border-secondary-600 rounded-full p-5">
          <SyncIcon className="w-20 h-20 md:w-40 md:h-40" />
        </div>
      </section>

      <section className="w-full flex flex-col md:flex-row justify-evenly items-center">
        <div className="flex justify-center items-center border-5 border-secondary-600 rounded-full p-5">
          <StyleIcon className="w-20 h-20 md:w-40 md:h-40" />
        </div>
        <div className="flex flex-col py-5 md:py-0">
          <h2 className="text-2xl font-semibold text-primary-100 mb-2 text-center md:text-start">
            UI/UX & Performance
          </h2>
          <ul className="list-disc flex flex-col gap-2 bg-white/20 backdrop-blur-md rounded-xl border border-white/20 shadow-md p-10">
            {uiUxPerformance.map(({ id, content, strong, suffix }) => (
              <li
                key={id}
                className="text-neutral-500 hover:scale-100 hover:auto"
              >
                {content}
                {strong &&
                  strong.map((word, idx) => (
                    <strong key={idx} className="mx-1">
                      {word}
                    </strong>
                  ))}
                {suffix}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="w-full flex flex-col-reverse md:flex-row justify-evenly items-center">
        <div className="flex flex-col py-5 md:py-0">
          <h2 className="text-2xl font-semibold text-primary-100 mb-2 text-center md:text-start">
            Outras funcionalidades
          </h2>
          <ul className="list-disc flex flex-col gap-2 bg-white/20 backdrop-blur-md rounded-xl border border-white/20 shadow-md p-10">
            {otherFeatures.map(({ id, content, strong, suffix }) => (
              <li
                key={id}
                className="text-neutral-500 hover:scale-100 hover:auto"
              >
                {content}
                {strong &&
                  strong.map((word, idx) => (
                    <strong key={idx} className="mx-1">
                      {word}
                    </strong>
                  ))}
                {suffix}
              </li>
            ))}
          </ul>
        </div>
        <div className="flex justify-center items-center border-5 border-secondary-600 rounded-full p-5">
          <PlusIcon className="w-20 h-20 md:w-40 md:h-40" />
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-primary-100 mb-2 text-center md:text-start">
          Tecnologias Usadas
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 text-center">
          {[
            "Next.js 15",
            "React 19",
            "TypeScript 5",
            "Tailwind CSS 4",
            "Leaflet",
            "Redux Toolkit",
            "jsonwebtoken / Jose",
            "Next API Routes",
            "GBIF API",
            "Supabase PostgreSQL",
            "Headless UI",
            "Bcrypt",
          ].map((tech) => (
            <span
              key={tech}
              className="bg-secondary-300 text-primary-200 rounded-full px-3 py-1 font-semibold hover:none flex items-center justify-center"
            >
              {tech}
            </span>
          ))}
        </div>
      </section>

      <section>
        <p className="text-sm text-neutral-400 mt-8">
          Desenvolvido com dedicação por Carlos Teixeira &mdash; 2025.
        </p>
      </section>
    </main>
  );
}
