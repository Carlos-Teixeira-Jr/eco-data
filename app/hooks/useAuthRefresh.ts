import { useEffect } from "react";
import { logout } from "../lib/auth/logout";

/**
 * Hook para renovar o token de acesso automaticamente a cada 10 minutos.
 * O hook faz uma requisição POST para /api/refreshToken, passando o token
 * atual como um cookie. Se o token for renovado com sucesso, o hook
 * imprime uma mensagem de sucesso no console. Caso contrário, imprime
 * uma mensagem de erro com o detalhe do erro.
 *
 * O hook retorna uma função de limpeza para ser usada no return do
 * useEffect, que cancela o intervalo de refresh.
 */
export function useAuthRefresh() {
  useEffect(() => {
    console.log("hook atyivado")
    const interval = setInterval(async () => {
      try {
        const response = await fetch('/api/refreshToken', {
          method: "POST",
          credentials: "include",
        });

        if (!response.ok) {
          console.error("Falha no refresh, realizando logout automático...");
          await logout();
          return;
        }

        const data = await response.json();

        if (data.token) {
          console.log("Token renovado com sucesso.");
        } else {
          console.error("Token não retornado. Logout automático...");
          await logout();
        }
      } catch (error) {
        console.error("Erro no refresh automático:", error);
        await logout();
      }
    }, 1000 * 60 * 10); // 10 minutos

    return () => clearInterval(interval);
  }, []);
}