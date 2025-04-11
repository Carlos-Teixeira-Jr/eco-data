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