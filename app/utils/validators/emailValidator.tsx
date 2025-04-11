/**
 * Valida um endereço de email.
 *
 * Verifica se o endereço de email é válido e se está
 * preenchido. Se o endereço for válido e preenchido,
 * retorna um objeto com `isValid` como `true` e `errorMsg`
 * como uma string vazia. Caso contrário, retorna um objeto
 * com `isValid` como `false` e `errorMsg` com uma mensagem de
 * erro.
 *
 * @param {string} email - O endereço de email a ser validado.
 *
 * @returns {Object} - Um objeto com as propriedades `isValid`
 * e `errorMsg`.
 */
export function validateEmail(email: string): {
  errorMsg: string;
  isValid: boolean;
} {
  let emailValue = email.trim();
  let errorMsg = "";

  if (emailValue.length === 0) {
    errorMsg = "O campo de email deve ser preenchido";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue)) {
    errorMsg = "O email deve ser válido";
  }

  return {
    errorMsg: errorMsg,
    isValid: errorMsg === "",
  };
}