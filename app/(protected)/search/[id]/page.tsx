import { SpeciesCarousel } from "@/app/components/searchPageComponents/SpeciesCarousel";
import {
  SpeciesProfileResponse,
} from "@/app/interfaces/data/profiles.interfaces";
import Link from "next/link";
import { notFound } from "next/navigation";
import SpeciesMapClientWrapper from "@/app/components/searchPageComponents/SpeciesMapClientWrapper";
import { getJSON } from "@/app/lib/gbif/helpers";
import { getProfileValue } from "@/app/lib/gbif/getProfileValue";
import { IUCNCategory } from "@/app/constants/iucnCategories";
import { InfoCard } from "@/app/components/cards/InfoCard";

type Params = Promise<{ id: string }>;

export default async function Page(props: { params: Params }) {
  const params = await props.params;
  const id = params.id;


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

  const profileData = [
    { label: "Forma de Vida", value: getProfileValue(profiles, "lifeForm") },
    { label: "Habitat", value: getProfileValue(profiles, "habitat") },
    { label: "Extinto", value: getProfileValue(profiles, "extinct") ? "Sim" : "Não" },
    {
      label: "Categoria IUCN",
      value: IUCNCategory[iucn?.category as keyof typeof IUCNCategory],
    },
  ];

  return (
    <main className="py-6 px-5 md:px-20 flex justify-around flex-col w-full gap-10">
      <div className="flex flex-col items-center">
        {species.references ? (
          <Link href={species?.references} target="_blank">
            <h1 className=" text-primary-100 font-bold text-center">
              {species.canonicalName}
            </h1>
          </Link>
        ) : (
          <h1 className=" text-primary-100 font-bold text-center">
            {species.canonicalName}
          </h1>
        )}

        <h6 className="italic">{species.scientificName}</h6>
      </div>

      <div className="flex flex-col md:flex-row gap-10 w-full justify-around">
        <div className="flex w-full justify-between gap-5 md:gap-10">
          <InfoCard title="Taxonomia" data={speciesData} />
          <InfoCard title="Perfil Biológico" data={profileData} />
        </div>

        {media.results.length > 0 && <SpeciesCarousel images={media.results} />}
      </div>
      <div className="w-full z-20">
        {species?.key && (
          <section className="md:mt-10">
            <h3 className="text-2xl font-semibold text-primary-100 mb-5">
              Mapa de Ocorrência
            </h3>
            <SpeciesMapClientWrapper taxonKey={species.key}/>
          </section>
        )}
      </div>
    </main>
  );
}
