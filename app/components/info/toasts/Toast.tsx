'use client';

import { useEffect, useState } from "react";

interface IToast {
  toastProps: {
    message: string;
    type: string;
    show: boolean;
  };
  handleRemoveToast: (toastProps: any) => void;
}

/**
 * Componente de toast que exibe uma mensagem de notificação temporária.
 * 
 * Este componente aceita propriedades de toast e uma função de callback para lidar
 * com a remoção do toast. Quando o toast está visível, ele inicia um timer
 * para diminuir gradativamente a barra de progresso e remove-lo depois de um tempo especificado.
 * 
 * @param {Object} props - As propriedades do componente toast.
 * @param {Object} props.toastProps - As propriedades do estado do toast.
 * @param {string} props.toastProps.message - A mensagem exibida no toast.
 * @param {string} props.toastProps.type - O tipo do toast ("success" ou "error").
 * @param {boolean} props.toastProps.show - Se o toast está visível ou não.
 * @param {Function} props.handleRemoveToast - Função de Callback para remover o toast.
 */
const Toast = ({
  toastProps: { message, type, show },
  handleRemoveToast,
}: IToast) => {
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(100);

  /**
   * Quando o toast estiver visível, ele inicia um timer para ir apagando o toast gradativamente.
   * Quando o timer terminar, ele chama a função `handleRemoveToast`
   * para remove-lo do estado.
   */
  useEffect(() => {
    if (show) {
      setVisible(true);
      setProgress(100);

      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev <= 0) {
            clearInterval(interval);
            return 0;
          }
          return prev - 2;
        });
      }, 100);

      const timeout = setTimeout(() => {
        setVisible(false);

        setTimeout(() => {
          handleRemoveToast({ show: false, message: "", type: "" });
        }, 300);
      }, 5000);

      return () => {
        clearTimeout(timeout);
        clearInterval(interval);
      };
    }
  }, [show, handleRemoveToast]);

  if (!show) return null;

  return (
    <div
      className={`fixed top-0 right-0 px-6 py-2 pr-10 rounded-full text-white shadow-lg transition-all duration-300 ease-in-out transform overflow-hidden
        ${visible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"}
        ${type === "success" ? "bg-green-500" : "bg-red-500"}
      `}
      style={{ minWidth: "300px", position: "relative" }}
    >
      <div
        className="absolute top-0 left-0 h-full bg-white/30 transition-all duration-100 ease-linear"
        style={{ width: `${progress}%` }}
      />
      <span className="relative z-10 text-white">{message}</span>
    </div>
  );
};

export default Toast;
