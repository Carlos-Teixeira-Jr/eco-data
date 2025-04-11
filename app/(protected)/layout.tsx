"use client";

import { useAuthRefresh } from "@/app/hooks/useAuthRefresh";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { clearSelectedItem } from "../redux/slices/fetchParamsSlicer";

export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
  useAuthRefresh();

  const pathname = usePathname();
  const dispatch = useDispatch();

  /**
   * Limpar o item selecionado sempre que o usuário navegar para outra página que não seja a página de busca.
   *
   * Evita que o item selecionado seja persistido quando o usuário
   * navega para outra página que não seja a página de busca.
   */
  useEffect(() => {
    if (pathname !== "/search") dispatch(clearSelectedItem());
  }, [pathname, dispatch]);

  return children;
}