"use client";

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
export default function NestedAccordion({ rootData }: INestedAccordion) {
  return (
    <div className="w-full md:max-w-80 mx-auto bg-white p-4 rounded-lg shadow h-fit">
      {rootData.length > 0 &&
        rootData.map((item) => (
          <DisclosureItem key={item.key} item={item} depthLevel={0} />
        ))}
    </div>
  );
}

interface IDisclosureItem {
  item: Taxon;
  depthLevel: number;
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
function DisclosureItem({ item, depthLevel }: IDisclosureItem) {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useAppDispatch();
  const [children, setChildren] = useState<Taxon[] | null>(null);
  const bgColor = layerColors[depthLevel % layerColors.length];

  /**
   * Busca os filhos do item fornecido da API GBIF.
   * Atualiza o estado do componente com os filhos.
   * Se os filhos ja foram buscados, nao faz nada.
   * @async
   */
  const fetchChildren = async () => {
    const response = await fetch(
      `https://api.gbif.org/v1/species/${item.key}/children`
    );
    const data = await response.json();
    setChildren(data.results || []);
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
                />
              ))
            : isOpen &&
              children?.length === 0 && (
                <p className="text-primary-100">{"Sem filhos"}</p>
              )}
        </DisclosurePanel>
      </div>
    </Disclosure>
  );
}
