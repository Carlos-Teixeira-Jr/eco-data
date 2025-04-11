import { SpeciesCarousel } from "@/app/components/searchPageComponents/SpeciesCarousel";
import SpeciesMap from "@/app/components/searchPageComponents/SpeciesMap";
import {
  SpeciesProfile,
  SpeciesProfileResponse,
} from "@/app/interfaces/data/profiles.interfaces";
import Link from "next/link";
import { notFound } from "next/navigation";

function isValidJSONResponse(res: Response) {
  const contentType = res.headers.get("content-type");
  return res.ok && contentType && contentType.includes("application/json");
}

export default async function SpeciesPage({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const { id } = params;

  const results = await Promise.allSettled([
    fetch(`https://api.gbif.org/v1/species/${id}`, {
      next: { revalidate: 3600 },
    }),
    fetch(`https://api.gbif.org/v1/species/${id}/speciesProfiles`, {
      next: { revalidate: 3600 },
    }),
    fetch(`https://api.gbif.org/v1/species/${id}/media`, {
      next: { revalidate: 3600 },
    }),
    fetch(`https://api.gbif.org/v1/species/${id}/iucnRedListCategory`, {
      next: { revalidate: 3600 },
    }),
  ]);

  /**
   * Fução auxiliar para obter o conteúdo JSON de uma resposta, lidando com erros com boas práticas.
   * @param {PromiseSettledResult<Response>} res O objeto de resposta.
   * @returns {Promise<any>} O conteúdo JSON da resposta, ou nulo se a solicitação falhar.
   */
  const getJSON = async (res: PromiseSettledResult<Response>): Promise<any> =>
    res.status === "fulfilled" && isValidJSONResponse(res.value)
      ? await res.value.json()
      : null;

  const species = await getJSON(results[0]);
  const profiles = (await getJSON(results[1])) as SpeciesProfileResponse;
  const media = await getJSON(results[2]);
  const iucn = await getJSON(results[3]);

  if (!species) return notFound();

  const speciesData = [
    { value: species.class, label: "Classe" },
    { value: species.order, label: "Ordem" },
    { value: species.family, label: "Familia" },
    { value: species.genus, label: "Género" },
  ];

  /**
   * Função auxiliar para obter o valor de uma chave em SpeciesProfile,
   * lidando com a possibilidade de a chave não existir em nenhuma das
   * profiles retornadas pela API.
   * @param {keyof SpeciesProfile} key A chave do valor que desejamos obter.
   * @returns {SpeciesProfile[T] | undefined} O valor da chave, ou undefined
   * se a chave não existir em nenhuma das profiles.
   */
  function getProfileValue<T extends keyof SpeciesProfile>(
    key: T
  ): SpeciesProfile[T] | undefined {
    return profiles.results.find((p) => p[key] !== undefined)?.[key];
  }

  enum IUCNCategory {
    "NOT_EVALUATED" = "Não avaliado",
    "NOT_APPLICABLE" = "Não aplicável",
    "DATA_DEFICIENT" = "Dados deficientes",
    "NEAR_THREATENED" = "Quase ameaçado",
    "LEAST_CONCERN" = "Menor preocupação",
    "VULNERABLE" = "Vulnerável",
    "ENDANGERED" = "Ameaçado",
    "CRITICALLY_ENDANGERED" = "Criticamente ameaçado",
    "REGIONALLY_EXTINCT" = "Extinto regionalmente",
    "EXTINCT_IN_THE_WILD" = "Extinto na natureza",
    "EXTINCT" = "Extinto",
  }

  const profileData = [
    { label: "Forma de Vida", value: getProfileValue("lifeForm") },
    { label: "Habitat", value: getProfileValue("habitat") },
    { label: "Extinto", value: getProfileValue("extinct") ? "Sim" : "Não" },
    {
      label: "Categoria IUCN",
      value: IUCNCategory[iucn?.category as keyof typeof IUCNCategory],
    },
  ];

  return (
    <main className="py-6 px-5 md:px-20 flex justify-around flex-col w-full gap-10">
      <div className="flex flex-col items-center">
        <Link href={species.references} target="_blank">
          <h1 className=" text-primary-100 font-bold text-center">
            {species.canonicalName}
          </h1>
        </Link>
        <h6 className="italic">{species.scientificName}</h6>
      </div>

      <div className="flex flex-col md:flex-row gap-10 w-full justify-around">
        <div className="flex w-full justify-between gap-5 md:gap-10">
          <div className="flex-1 flex flex-col gap-5 border border-secondary-400 rounded-xl p-5">
            <h3 className="text-2xl font-semibold text-primary-100 h-16 md:h-auto">
              Taxonomia
            </h3>
            <hr className="border-secondary-400" />
            {speciesData.map(({ value, label }) => (
              <div key={label}>
                <h2
                  className={`text-xl font-semibold ${!value && "opacity-30"}`}
                >
                  {label}
                </h2>
                <h6>{value}</h6>
              </div>
            ))}
          </div>
          <div className="flex-1 flex flex-col gap-5 border border-secondary-400 rounded-xl p-5">
            <h3 className="text-2xl font-semibold text-primary-100">
              Perfil Biológico
            </h3>
            <hr className="border-secondary-400" />
            {profileData.map(({ value, label }) => (
              <div key={label}>
                <h2
                  className={`text-xl font-semibold ${!value && "opacity-30"}`}
                >
                  {label}
                </h2>
                <h6>{value}</h6>
              </div>
            ))}
          </div>
        </div>

        {media.results.length > 0 && <SpeciesCarousel images={media.results} />}
      </div>
      <div className="w-full z-20">
        {species?.key && (
          <section className="md:mt-10">
            <h3 className="text-2xl font-semibold text-primary-100 mb-5">
              Mapa de Ocorrência
            </h3>
            <SpeciesMap taxonKey={species.key} />
          </section>
        )}
      </div>
    </main>
  );
}
