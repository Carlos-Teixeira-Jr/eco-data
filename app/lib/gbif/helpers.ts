export function isValidJSONResponse(res: Response) {
  const contentType = res.headers.get("content-type");
  return res.ok && contentType && contentType.includes("application/json");
}

/**
 * Fução auxiliar para obter o conteúdo JSON de uma resposta, lidando com erros com boas práticas.
 * @param {PromiseSettledResult<Response>} res O objeto de resposta.
 * @returns {Promise<any>} O conteúdo JSON da resposta, ou nulo se a solicitação falhar.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getJSON = async (
  res: PromiseSettledResult<Response>
): Promise<any> =>
  res.status === "fulfilled" && isValidJSONResponse(res.value)
    ? await res.value.json()
    : null;
