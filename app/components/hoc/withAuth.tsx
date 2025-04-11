

'use client'

import { RootState } from "@/app/redux/store";
import { useRouter } from "next/navigation"
import { useEffect } from "react";
import { useSelector } from "react-redux";

const WithAuth = (WrappedComponent: React.ComponentType) => {
  return function ProtectedComponent(props: any) {
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