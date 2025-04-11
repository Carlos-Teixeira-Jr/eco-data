'use client'

import { useEffect, useState } from "react";
import AuthForm from "../../components/forms/AuthForm";
import Toast from "../../components/info/toasts/Toast";

const LoginPage = () => {
  const [showToast, setShowToast] = useState({
    show: false,
    message: "",
    type: "",
  });

  useEffect(() => {
    const expired = localStorage.getItem("sessionExpired");

    if (expired === "true") {
      setShowToast({
        show: true,
        message: "Sua expirada. Faça login novamente.",
        type: "error",
      });
      localStorage.removeItem("sessionExpired");
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 md:px-0">
      {showToast.show && (
        <Toast
          toastProps={showToast}
          handleRemoveToast={() => setShowToast({ show: false, message: "", type: "" })}
        />
      )}
      <AuthForm />
    </div>
    
  );
}

export default LoginPage