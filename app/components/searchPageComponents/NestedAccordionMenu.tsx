"use client";

import PlusIcon from "@/app/assets/icons/PlusIcon";
import { Taxon } from "@/app/interfaces/taxon.interface";
import { useAppDispatch } from "@/app/redux/hooks/reduxHook";
import { setSelectedItem } from "@/app/redux/slices/fetchParamsSlicer";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import ChevronUpIcon from "@heroicons/react/16/solid/ChevronUpIcon";
import { useState } from "react";
import ButtonLoader from "../info/loaders/ButtonLoader";

const layerColors = [
  "bg-primary-100",
  "bg-secondary-500",
  "bg-tertiary-500",
  "bg-neutral-600",
  "bg-neutral-500",
  "bg-neutral-100",
  "bg-tertiary-100",
  "bg-primary-300",
];

interface INestedAccordion {
  rootData: Taxon[];
  onSearch: () => void;
}

/**
 * Componente de árvore de espécies.
 * Recebe um array de Taxon e renderiza uma lista de espécies
 * com seus respectivos filhos.
 * Cada item da lista tem um botão de seta para cima ou para baixo
 * que abre ou fecha o item.
 * O componente usa o hook Disclosure do Headless UI para controlar
 * o estado de aberto ou fechado de cada item.
 * @prop {Taxon[]} rootData - O array de Taxon a ser renderizado.
 * @returns {JSX.Element} O componente de árvore de espécies.
 */
export default function NestedAccordion({
  rootData,
  onSearch,
}: INestedAccordion) {
  return (
    <div className="w-full md:max-w-80 mx-auto bg-white p-4 rounded-lg shadow h-fit">
      {rootData.length > 0 &&
        rootData.map((item) => (
          <DisclosureItem
            key={item.key}
            item={item}
            depthLevel={0}
            onSearch={onSearch}
          />
        ))}
    </div>
  );
}

interface IDisclosureItem {
  item: Taxon;
  depthLevel: number;
  onSearch: () => void;
}

/**
 * Componente de item da lista de espécies.
 * Mostra o nome da espécie e um ícone de seta para cima ou para baixo
 * dependendo se o item esta aberto ou fechado.
 * Quando o item esta aberto, renderiza os filhos dele.
 * @param {{ item: Taxon; depthLevel: number }} props
 * @prop {Taxon} item - O item da lista de espécies.
 * @prop {number} depthLevel - O nível de profundidade na árvore de espécies.
 * @returns {JSX.Element} O componente de item da lista de espécies.
 */
function DisclosureItem({ item, depthLevel, onSearch }: IDisclosureItem) {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useAppDispatch();
  const [children, setChildren] = useState<Taxon[] | null>(null);
  const bgColor = layerColors[depthLevel % layerColors.length];
  const [loading, setLoading] = useState(false);

  /**
   * Busca os filhos do item fornecido da API GBIF.
   * Atualiza o estado do componente com os filhos.
   * Se os filhos ja foram buscados, nao faz nada.
   * @async
   */
  const fetchChildren = async (limit?: number, innerOffset?: number) => {
    let url = `https://api.gbif.org/v1/species/${item.key}/children?status=ACCEPTED`;

    if (limit) {
      url += `&limit=${limit}`;
    }

    if (innerOffset) {
      url += `&offset=${innerOffset}`;
    }

    const response = await fetch(url);
    const data = await response.json();

    if (data?.results?.length) {
      setChildren((prev) => [...(prev || []), ...data.results]);
    }
  };

  /**
   * Alterna o estado de abertura do item da lista.
   * Define o item atual como selecionado ao abrir.
   * Se o item estiver sendo aberto pela primeira vez,
   * busca os filhos do item da API GBIF.
   * @async
   */
  const handleToggle = async () => {
    const nextState = !isOpen;
    setIsOpen(nextState);

    if (nextState) {
      dispatch(setSelectedItem(item));
      if (children === null) {
        await fetchChildren();
      }
    }
  };

  const handleFetchMoreItems = async () => {
    setLoading(true);
    await fetchChildren(5, children?.length || 0);
    onSearch();
    setLoading(false);
  };

  return (
    <Disclosure>
      <div>
        <DisclosureButton
          onClick={handleToggle}
          className={`flex mx-auto text-lg items-center justify-between m-0 h-fit min-h-fit w-full p-2 text-left ${bgColor} rounded-md`}
        >
          {item.vernacularName || item.scientificName}
          {item.numDescendants > 0 && (
            <ChevronUpIcon
              className={`h-5 w-5 transform ${isOpen ? "rotate-180" : ""}`}
            />
          )}
        </DisclosureButton>

        <DisclosurePanel className="p-1 pl-4">
          {isOpen && children?.length
            ? children.map((child) => (
                <DisclosureItem
                  key={child.key}
                  item={child}
                  depthLevel={depthLevel + 1}
                  onSearch={onSearch}
                />
              ))
            : isOpen &&
              children?.length === 0 && (
                <p className="text-primary-100">{"Sem filhos"}</p>
              )}
          {/* {loading || children?.length === 0 ? (
            <ButtonLoader
              className="border-none h-7 max-h-7 flex w-full justify-end items-center"
              btnIsDark={false}
            />
          ) : (
            <div
              className={`flex gap-2 w-full justify-end items-center cursor-pointer hover:scale-105 duration-200 ease-in-out transform ${
                children?.length === 0 ? "hidden" : ""
              }`}
              onClick={() => handleFetchMoreItems()}
            >
              <PlusIcon className="w-7 h-7" />
              <h5>Buscar mais</h5>
            </div>
          )} */}
          {isOpen && children === null ? (
            <ButtonLoader
              className="border-none h-7 max-h-7 flex w-full justify-end items-center"
              btnIsDark={false}
            />
          ) : (
            <>
              {children && children.length > 0 && (
                <>
                  {loading ? (
                    <ButtonLoader
                      className="border-none h-7 max-h-7 flex w-full justify-end items-center"
                      btnIsDark={false}
                    />
                  ) : (
                    <div
                      className="flex gap-2 w-full justify-end items-center cursor-pointer hover:scale-105 duration-200 ease-in-out transform"
                      onClick={() => handleFetchMoreItems()}
                    >
                      <PlusIcon className="w-7 h-7" />
                      <h5>Buscar mais</h5>
                    </div>
                  )}
                </>
              )}
            </>
          )}
        </DisclosurePanel>
      </div>
    </Disclosure>
  );
}
