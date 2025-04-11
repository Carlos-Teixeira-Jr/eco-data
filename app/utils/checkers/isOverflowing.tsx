const isOverflowing = (element: HTMLElement | null) => {
  if (!element) return false;
  return element.scrollHeight > element.clientHeight;;
}