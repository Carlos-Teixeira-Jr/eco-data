"use client";

import CloseIcon from "@/app/assets/icons/CloseIcon";
import SearchIcon from "@/app/assets/icons/SearchIcon";
import { useAppDispatch } from "@/app/redux/hooks/reduxHook";
import { clearData } from "@/app/redux/slices/dataSlice";
import { clearSelectedItem, setSelectedItem } from "@/app/redux/slices/fetchParamsSlicer";
import { useState } from "react";

interface ISearchInput {
  onSearch?: () => void
}

const SearchInput = ({onSearch}: ISearchInput) => {
  const [inputValue, setInputValue] = useState("");
  const [submittedValue, setSubmittedValue] = useState<string | null>(null);
  const dispatch = useAppDispatch();

  /**
   * Função chamada quando o usuário clica no botão de busca.
   * Verifica se o valor do input está vazio, caso não esteja, 
   * dispara a ação de busca e atualiza o valor submetido.
   * 
   * @function
   */
  const 
  handleSearch = () => {
    if (!inputValue.trim()) return;

    dispatch(
      setSelectedItem({
        key: 0,
        scientificName: inputValue.trim(),
        vernacularName: inputValue.trim(),
      })
    );

    setSubmittedValue(inputValue);
    onSearch?.()
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
      onSearch?.()
    } 
  };

  /**
   * Limpa o valor do input, o valor submetido e todas as informações
   * de busca e item selecionado.
   * @function
   */
  const handleClear = () => {
    setInputValue("");
    setSubmittedValue(null);
    dispatch(clearSelectedItem());
    dispatch(clearData());
  };

  return (
    <section className="w-full pb-0 md:pb-5 relative">
      <input
        type="text"
        value={inputValue}
        className="w-full p-2 pr-10 h-13 md:h-11 border border-neutral-700 rounded-md bg-secondary-200 placeholder:text-gray-500"
        placeholder="Buscar por termos, palavras-chave ou autores"
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <SearchIcon
        width="24px"
        height="24px"
        fill="#5e5e5e"
        className="absolute pointer-events-auto top-2.5 right-2.5 cursor-pointer hover:scale-115 transform transition-all duration-300 ease-in-out hover:fill-primary-100"
        onMouseDown={(e: React.MouseEvent) => {
          e.preventDefault();
          handleSearch();
        }}
      />

      {submittedValue && (
        <div className="py-2">
          <div className="px-2 w-fit border border-neutral-700 bg-primary-300 rounded-full flex items-center gap-2 hover:scale-105 cursor-pointer transform duration-75 ease-in-out">
            <h6 className="text-primary-900 flex items-center">
              {submittedValue}
            </h6>
            <span className="text-white" onClick={handleClear}>
              <CloseIcon className="w-4 h-4" fill="#fff"/>
            </span>
          </div>
        </div>
      )}
    </section>
  );
};

export default SearchInput;
