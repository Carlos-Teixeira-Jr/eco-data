/**
 * Verifica se o elemento fornecido está transbordando.
 * @param {HTMLElement | null} element o elemento a ser verificado.
 * @returns {boolean} true se o elemento estiver transbordando, false caso contrário.
 */
const isOverflowing = (element: HTMLElement | null) => {
  if (!element) return false;
  return element.scrollHeight > element.clientHeight;;
}