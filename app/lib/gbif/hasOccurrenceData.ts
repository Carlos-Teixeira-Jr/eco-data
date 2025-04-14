/**
 * Verifica se há dados de ocorrência disponíveis para uma chave de taxon específica
 * da API do GBIF. Faz um fetch na tile de mapa de densidade de ocorrência para a
 * chave de taxon específica.
 *
 * @param {number} taxonKey - A chave do taxon para o qual verificar os dados de
 * ocorrência.
 * @returns {Promise<boolean>} Uma promessa que resolve para true se houver dados
 * de ocorrência disponíveis (status HTTP 200), ou false caso contrário.
 * Registra uma mensagem de erro no console se a operação de fetch falhar.
 */
export const hasOccurrenceData = async (taxonKey: number): Promise<boolean> => {
  if (!taxonKey) return false;

  const tileURL = `https://api.gbif.org/v2/map/occurrence/density/2/2/1@1x.png?srs=EPSG:3857&taxonKey=${taxonKey}`;

  try {
    const res = await fetch(tileURL, { method: "GET", cache: "reload" });

    return res.status === 200;
  } catch (error) {
    console.error("Erro ao verificar ocorrência GBIF:", error);
    return false;
  }
};
