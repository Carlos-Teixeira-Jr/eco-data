/**
 * Valida um nome.
 *
 * Verifica se o nome tem entre 3 e 80 caracteres.
 * Se o nome for válido, retorna um objeto com `isValid`
 * como `true` e `errorMsg` como uma string vazia.
 * Caso contr&aacute;rio, retorna um objeto com `isValid`
 * como `false` e `errorMsg` com uma mensagem de erro.
 *
 * @param {string} name - O nome a ser validado.
 *
 * @returns {Object} - Um objeto com as propriedades `isValid`
 * e `errorMsg`.
 */
export function validateName(name: string): {errorMsg: string, isValid: boolean} {
  const nameValue = name.trim();
  let errorMsg = "";
  if (nameValue.length < 3) {
    errorMsg = "O nome deve ter pelo menos 3 caracteres";
  } else if (nameValue.length > 80) {
    errorMsg = "O nome deve ter no máximo 80 caracteres";
  }

  return {
    errorMsg: errorMsg,
    isValid: errorMsg === "",
  };
}