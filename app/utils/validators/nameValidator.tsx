export function validateName(name: string): {errorMsg: string, isValid: boolean} {
  let nameValue = name.trim();
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