"use client";

import { RefObject, useEffect, useState } from "react";
import ListCard from "../cards/ListCard";
import { Loading } from "../info/loaders/Loading";
import Pagination from "../navigation/Pagination";
import { GbifResult } from "@/app/interfaces/data.interface";
import Toast from "../info/toasts/Toast";
import { useAppDispatch, useAppSelector } from "@/app/redux/hooks/reduxHook";
import { RootState } from "@/app/redux/store";
import { fetchData } from "@/app/redux/thunks/dataThunk";
import SearchInput from "./SearchInput";

const ITEMS_PER_PAGE = 15;

interface IDataList {
  cardsRef: RefObject<HTMLDivElement | null>
}

const DataList = ({cardsRef}: IDataList) => {
  const dispatch = useAppDispatch();
  const { data, loading } = useAppSelector((state: RootState) => state.data);
  const { selectedItem } = useAppSelector(
    (state: RootState) => state.fetchParams
  );

  const totalPages = data?.count ? Math.ceil(data.count / ITEMS_PER_PAGE) : 0;
  const [currentPage, setCurrentPage] = useState(1);
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  const [showToast, setShowToast] = useState({
    show: false,
    message: "",
    type: "",
  });

  /**
   * Verifica se o item selecionado mudou e se sim, inicia uma busca com base
   * na informação do item selecionado.
   */
  useEffect(() => {
    if (!selectedItem) return;
    const q = selectedItem?.vernacularName || selectedItem?.scientificName;
    if (!q) return;

    dispatch(
      fetchData({ q, limit: ITEMS_PER_PAGE, page: currentPage, offset })
    );
  }, [currentPage, selectedItem?.vernacularName, selectedItem?.scientificName]);

  /**
   * Verifica se o item selecionado mudou e se sim, volta para a primeira página.
   */
  useEffect(() => {
    if (!selectedItem) return;
    setCurrentPage(1);
  }, [selectedItem]);

  return (
    <div className="px-4 flex-1 flex flex-col items-center">
      {loading && <Loading />}
      {!loading && (!data || data?.results?.length === 0) && selectedItem && (
        <p className="text-primary-100">Nenhum resultado encontrado.</p>
      )}

      <div className="hidden md:block w-full">
        <SearchInput/>
      </div>

      {!loading && data && data?.results.length > 0 && (
        <>
          {data && data?.results.length > 0 && (
            <Pagination
              endOfRecords={data.endOfRecords}
              currentPage={currentPage}
              onNextPage={(page: number) => setCurrentPage(page)}
              onPreviousPage={(page: number) => setCurrentPage(page)}
            />
          )}
          <p className="p-dark text-left w-full pt-3 md:pt-0">
            Página {currentPage} de {totalPages} • Exibindo os items{" "}
            {offset + 1} à {offset + data?.results.length} de {data.count}.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-3 w-full items-stretch" ref={cardsRef}>
            {data?.results?.map((item: GbifResult, i) => (
              <ListCard data={item} key={i} />
            ))}
          </div>
        </>
      )}

      {data && data?.results.length > 0 && (
        <Pagination
          endOfRecords={data.endOfRecords}
          currentPage={currentPage}
          onNextPage={(page: number) => setCurrentPage(page)}
          onPreviousPage={(page: number) => setCurrentPage(page)}
        />
      )}

      {showToast.show && (
        <Toast toastProps={showToast} handleRemoveToast={setShowToast} />
      )}
    </div>
  );
};

export default DataList;
