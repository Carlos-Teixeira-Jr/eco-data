'use client'

import { RootState } from "@/app/redux/store";
import { useRouter } from "next/navigation"
import { useEffect } from "react";
import { useSelector } from "react-redux";

/**
 * Um componente de ordem superior que envolve um componente e garante que o usuário esteja
 * autenticado antes de renderizar o componente. Se o usuário não estiver autenticado, ele
 * redireciona o usuário para a página de login.
 *
 * @param WrappedComponent O componente a ser envolvido e protegido.
 * @returns Um novo componente que é protegido por autenticação.
 */
const WithAuth = <P extends object>(WrappedComponent:  React.ComponentType<P>) => {
  return function ProtectedComponent(props: P) {
    const router = useRouter();
    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

    useEffect(() => {
      if (!isAuthenticated) {
        router.push("/login");
      }
    }, [isAuthenticated, router]);

    if (!isAuthenticated) {
      return null;
    }

    return <WrappedComponent {...props} />;
  };
}

export default WithAuth;