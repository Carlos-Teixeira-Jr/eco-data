import { useEffect } from "react";
import { useMap } from "react-leaflet"

/**
 * Um componente React que força o mapa a redimensionar corretamente
 * invalidando seu tamanho após um curto atraso.
 * Utiliza o hook `useMap` do `react-leaflet` para acessar a instância do mapa.
 * O efeitoé executado apenas uma vez quando o componenteé montado e garante
 * que o mapa seja exibido corretamente, especialmente após redimensionamento do container.
*/
const ForceMapResise = () => {
  const map = useMap();

  useEffect(() => {
    setTimeout(() => {
      map.invalidateSize();
    }, 200)
  },[map]);

  return null;
}

export default ForceMapResise