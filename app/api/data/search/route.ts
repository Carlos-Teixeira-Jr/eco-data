import { NextRequest, NextResponse } from "next/server";

/**
 * Busca espécies na API do GBIF com base no rank e na página informados.
 *
 * @param {NextRequest} req
 * @return {NextResponse}
 */
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const rank = searchParams.get('rank');
  const page = Number(searchParams.get('page'));

  try {
    const formattedString = rank?.toUpperCase();
    const offset = (page - 1) * 15;

    const response = await fetch(`https://api.gbif.org/v1/species/search?q=${formattedString}&rank=${rank}&status=ACCEPTED&limit=15&offset=${offset}`);

    if (!response.ok) {
      const text = await response.text();
      console.error("Erro no GBIF:", text);
      return NextResponse.json({ error: 'Erro ao buscar os dados.' }, { status: 500 });
    }

    const data = await response.json();

    return NextResponse.json(data);
  } catch (error) {
    console.error('Erro na busca por espécies:', error);
    return NextResponse.json({ error: 'Erro na busca por espiecies.' }, { status: 500 });
  }
}

    