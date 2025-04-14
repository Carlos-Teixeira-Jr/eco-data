"use client";

import { useAppDispatch } from "@/app/redux/hooks/reduxHook";
import WithAuth from "../../components/hoc/withAuth";
import DataList from "../../components/searchPageComponents/DataList";
import NestedAccordion from "../../components/searchPageComponents/NestedAccordionMenu";
import { useEffect, useRef, useState } from "react";
import { clearSelectedItem } from "@/app/redux/slices/fetchParamsSlicer";
import { Taxon } from "@/app/interfaces/taxon.interface";
import { Loading } from "@/app/components/info/loaders/Loading";
import SearchInput from "@/app/components/searchPageComponents/SearchInput";

const SearchPage = () => {
  const dispatch = useAppDispatch();
  const hasScrolled = useRef(false);

  const [rootData, setRootData] = useState<Taxon[]>([]);

  const cardsRef = useRef<HTMLDivElement>(null)

  const scrollToCards = () => {
    if (cardsRef.current) {
      cardsRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  useEffect(() => {
    fetch(
      "https://api.gbif.org/v1/species/root/d7dddbf4-2cf0-4f39-9b2a-bb099caae36c"
    )
      .then((response) => response.json())
      .then((data) => setRootData(data.results || []));
  }, []);

  useEffect(() => {
    if (!hasScrolled.current) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      hasScrolled.current = true;
    }
  }, []);

  useEffect(() => {
    return () => {
      dispatch(clearSelectedItem());
    };
  }, []);

  return (
    <>
      {rootData.length === 0 ? (
        <div className="min-h-screen flex justify-center items-center">
          <Loading />
        </div>
      ) : (
        <div className="px-5 md:px-22 pt-8 flex flex-col md:flex-row gap-5 w-full justify-between min-h-screen">
          <div className="block md:hidden w-full">
            <SearchInput onSearch={scrollToCards}/>
          </div>
          <NestedAccordion rootData={rootData} />
          <DataList cardsRef={cardsRef}/>
        </div>
      )}
    </>
  );
};

export default WithAuth(SearchPage);
