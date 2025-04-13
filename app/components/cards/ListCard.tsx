"use client";

import { GbifDescription, GbifResult } from "@/app/interfaces/data.interface";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/16/solid";
import { useRouter } from "next/navigation";
import { useLayoutEffect, useRef, useState } from "react";
import ButtonLoader from "../info/loaders/ButtonLoader";

interface IListCard {
  data: GbifResult;
}

type DataInfo = {
  label: string;
  value: string | number | undefined | GbifDescription[];
};

type CardDescExpantion = {
  card: number | null;
  description: number | null;
};

export const ListCard = ({ data }: IListCard) => {
  const {
    key,
    canonicalName,
    class: taxonClass,
    genus,
    kingdom,
    order,
    phylum,
    species,
    descriptions,
    scientificName,
    authorship,
  } = data;

  const navigator = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  const [expandedDescription, setExpandedDescription] =
    useState<CardDescExpantion>({
      card: null,
      description: null,
    });

  const [overflowingDescriptions, setOverflowingDescriptions] = useState<
    Record<string, boolean>
  >({});
  const descriptionRefs = useRef<Record<string, HTMLParagraphElement | null>>(
    {}
  );

  /**
   * Atualiza o estado após a renderização do layout para rastrear
   * quais descrições estão transbordando.
   * Itera sobre todos os elementos de descrição e verifica se o conteúdo
   * está transbordando o seu container para renderizar um botão de expandir
   * a descrição caso necessário.
   */
  useLayoutEffect(() => {
    const result: Record<string, boolean> = {};

    for (const key in descriptionRefs.current) {
      const element = descriptionRefs.current[key];
      if (element) {
        result[key] = element.scrollHeight > element.clientHeight;
      }
    }
    setOverflowingDescriptions(result);
  }, [data])

  const dataInfo: DataInfo[] = [
    {
      label: "Nome",
      value: canonicalName ? canonicalName : scientificName,
    },
    {
      label: "Autor",
      value: authorship,
    },
    {
      label: "Classe",
      value: taxonClass,
    },
    {
      label: "Gênero",
      value: genus,
    },
    {
      label: "Reino",
      value: kingdom,
    },
    {
      label: "Ordem",
      value: order,
    },
    {
      label: "Filo",
      value: phylum,
    },
    {
      label: "Espécie",
      value: species,
    },
    {
      label: "Descições",
      value: descriptions,
    },
  ];

  /**
   * Função para alternar a expansão da descrição no card,
   * recebe o índice do card e o índice da descrição que deve ser
   * expandida ou recolhida. Se a descrição já  está  expandida,
   * o estado volta para o valor padrãoo (null) e caso contr rio,
   * o estado  atualizado com o índice do card e da descrição.
   * @param {number} cardIndex índice do card
   * @param {number} descriptionIndex índice da descrição
   */
  const toggleDescriptionExpansion = (
    cardIndex: number,
    descriptionIndex: number
  ) => {
    if (
      cardIndex === expandedDescription.card &&
      descriptionIndex === expandedDescription.description
    ) {
      setExpandedDescription({ card: null, description: null });
    } else {
      setExpandedDescription({
        card: cardIndex,
        description: descriptionIndex,
      });
    }
  };

  const handleDetailsClick = () => {
    setIsLoading(true);
    navigator.push(`/search/${key}`);
  };

  return (
    <div className="card min-w-57 min-h-62 h-full flex flex-col justify-between">
      <div className="flex gap-2">
        <h6>Chave taxônomica: </h6>
        <p className="text-primary-300 text-xs">{key}</p>
      </div>
      <div>
        {dataInfo.map(({ label, value }) => {
          if (!value || Array.isArray(value)) return null;

          return (
            <div className="flex flex-col py-2" key={label}>
              <label>{label}</label>
              <h5 className="text-primary-100">{value}</h5>
            </div>
          );
        })}
      </div>

      <div>
        {isLoading ? (
          <ButtonLoader btnIsDark={false} className="w-full mx-0" />
        ) : (
          <button
            className="btn-dark w-full mx-0"
            disabled={isLoading}
            onClick={handleDetailsClick}
          >
            Detalhes
          </button>
        )}

        {dataInfo.map(({ label, value }, cardIdx) => {
          if (!value) return null;

          if (Array.isArray(value)) {
            const filtered = value.filter(
              (desc) => desc.description?.trim() !== ""
            );

            return (
              <div className="flex flex-col py-2" key={label}>
                <Disclosure>
                  {({ open }) => (
                    <div>
                      <DisclosureButton
                        disabled={filtered.length === 0}
                        className="flex justify-between m-0 w-full p-2 text-left bg-tertiary-100 disabled:bg-neutral-600 text-white rounded-lg focus:outline-none"
                      >
                        {label} • {filtered.length}
                        {filtered.length > 0 && (
                          <ChevronUpIcon
                            className={`h-5 w-5 transform ${
                              open ? "rotate-180" : ""
                            }`}
                          />
                        )}
                      </DisclosureButton>

                      <DisclosurePanel className="px-4 pt-4 pb-2 text-sm text-gray-500">
                        <ul>
                          {filtered.map((item, descIdx) => {
                            const refKey = `${cardIdx}-${descIdx}`;
                            const isExpanded =
                              expandedDescription.card === cardIdx &&
                              expandedDescription.description === descIdx;

                            return (
                              <li
                                key={refKey}
                                className="w-full hover:scale-100"
                              >
                                <label className="card-description-label">
                                  Descrição - {descIdx + 1}
                                </label>
                                <p
                                  ref={(el) => {
                                    descriptionRefs.current[refKey] = el;
                                    setTimeout(() => {
                                      if (el) {
                                        const isOverflowing =
                                          el.scrollHeight > el.clientHeight;
                                        setOverflowingDescriptions((prev) => ({
                                          ...prev,
                                          [refKey]: isOverflowing,
                                        }));
                                      }
                                    }, 50);
                                  }}
                                  className={`p-dark text-xs font-normal overflow-hidden break-words ${
                                    isExpanded
                                      ? "line-clamp-none"
                                      : "line-clamp-5"
                                  }`}
                                >
                                  {item.description}
                                </p>

                                {(overflowingDescriptions[refKey] ||
                                  isExpanded) && (
                                  <div className="text-end w-full h-fit">
                                    <span
                                      className="inline-block h-fit text-info-900 hover:text-blue-950 transition-all hover:scale-110 transform duration-200 ease-in-out cursor-pointer"
                                      onClick={() =>
                                        toggleDescriptionExpansion(
                                          cardIdx,
                                          descIdx
                                        )
                                      }
                                    >
                                      {isExpanded ? "ver menos" : "ver mais"}
                                    </span>
                                  </div>
                                )}
                              </li>
                            );
                          })}
                        </ul>
                      </DisclosurePanel>
                    </div>
                  )}
                </Disclosure>
              </div>
            );
          }
        })}
      </div>
    </div>
  );
};

export default ListCard;
