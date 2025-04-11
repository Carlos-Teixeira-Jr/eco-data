"use client";

import { usePathname } from "next/navigation";

export function Breadcrumb() {
  const pathname = usePathname();
  let pageName;
  let breadcrumb = "SIAPESQ";

  /**
   * Este switch statement gera o texto do breadcrumb com base no caminho
   * atual da URL. Ele define a variável `pageName` como o nome da página
   * atual e adiciona o texto do breadcrumb à variável `breadcrumb`.
   */
  switch (true) {
    case pathname.includes("signup"):
      pageName = "Cadastro";
      breadcrumb += " / Cadastro";
      break;
    case pathname.includes("login"):
      pageName = "Login";
      breadcrumb += " / Login";
      break;
    case pathname.includes("search"):
      pageName = "Busca";
      breadcrumb += " / Busca";
      break;
    case pathname.includes("aboutMe"):
      pageName = "Sobre mim";
      breadcrumb += " / Sobre mim";
      break;
    case pathname.includes("forbiddenPage"):
      pageName = "Acesso negado";
      breadcrumb += " / 403";
    case pathname.includes("aboutApp"):
      pageName = "Sobre o Eco Data";
      breadcrumb += " / Sobre o Eco Data";
    default:
      break;
  }

  return (
    <section className="bg-neutral-700 md:mt-[5.5%] shadow-primary-300 shadow-xl hidden md:block">
      <div className="md:px-41 px-8 py-2">
        <h3 className="text-shadow-2xs">{pageName}</h3>
        <nav aria-label="breadcrumb">
          <ol className="flex gap-1">
            {breadcrumb.split(" / ").map((crumb, index) => (
              <li key={index} className="flex items-center hover:none hover:scale-100">
                <span
                  className={`truncate hover:none hover:scale-100 ${
                    index === 0 ? "text-neutral-100" : "text-neutral-500"
                  }`}
                >
                  {crumb}
                </span>
                {index < breadcrumb.split(" / ").length - 1 && (
                  <p className="text-neutral-400 px-2 text-2xl">•••</p>
                )}
              </li>
            ))}
          </ol>
        </nav>
      </div>
    </section>
  );
}
