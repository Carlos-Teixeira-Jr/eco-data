enum EcologicalLevel {
  DOMAIN = 0,
  KINGDOM = 1,
  PHYLUM = 2,
  CLASS = 3,
  ORDER = 4,
  FAMILY = 5,
  GENUS = 6,
  SPECIES = 7,
}

export const getDataByRank = async (
  filter: string | null,
  depth: number,
  page: number
) => {
  try {
    const params = new URLSearchParams({
      q: filter ?? "",
      rank: EcologicalLevel[depth].toString(),
      page: page.toString(),
    });

    const response = await fetch(`/api/data/search?${params.toString()}`);

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`API response not OK. Status: ${response.status}. Body: ${errorText}`);
    };

    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      const html = await response.text();
      throw new Error(`API response not JSON. Content-Type: ${contentType}. Body: ${html}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Erro na busca por espécies:", error);
    throw error;
  }
};