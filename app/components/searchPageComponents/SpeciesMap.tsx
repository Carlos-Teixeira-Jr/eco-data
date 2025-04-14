"use client";

import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import ForceMapResize from "@/app/utils/changers/ForceMapResize";
import { hasOccurrenceData } from "@/app/lib/gbif/hasOccurrenceData";
import { useEffect, useState } from "react";

interface SpeciesMapProps {
  taxonKey: number;
}

/**
 * Um componente que renderiza um mapa de ocorrência de espécies para a chave de taxon
 * usando a API GBIF.
 * @param {SpeciesMapProps} props
 * @prop {number} taxonKey - O taxonKey para o qual mostrar a distribuição.
 * @returns {JSX.Element} Um componente que renderiza um mapa LeafLet para a chave de taxon.
 */
const SpeciesMap = ({ taxonKey }: SpeciesMapProps) => {
  const [showMap, setShowMap] = useState(false);

  const occurrenceTileURL = `https://api.gbif.org/v2/map/occurrence/density/{z}/{x}/{y}@1x.png?srs=EPSG:3857&taxonKey=${taxonKey}&bin=hex&hexPerTile=51&style=green-noborder.poly`;

  const baseMapURL =
    "https://tile.gbif.org/3857/omt/{z}/{x}/{y}@1x.png?style=gbif-classic";

  useEffect(() => {
    const showMap = async () => {
      const hasData = await hasOccurrenceData(taxonKey);
      setShowMap(hasData);
    };
    showMap();
  }, [taxonKey]);

  return (
    <>
      {showMap ? (
        <div className="h-[500px] w-full border-2 border-secondary-400 rounded-xl overflow-hidden z-20">
          <MapContainer
            center={[0, 0]}
            zoom={2}
            scrollWheelZoom={true}
            style={{ height: "100%", width: "100%" }}
          >
            <ForceMapResize />

            <TileLayer
              url={baseMapURL}
              attribution='&copy; <a href="https://www.gbif.org/">GBIF</a> Base Map'
            />

            <TileLayer
              url={occurrenceTileURL}
              attribution='&copy; <a href="https://www.gbif.org/">GBIF</a> Occurrence Tiles'
            />
          </MapContainer>
        </div>
      ) : (
        <div>
          <h4>Esta espécie ainda não possui dados de ocorrência</h4>
        </div>
      )}
    </>
  );
};

export default SpeciesMap;
