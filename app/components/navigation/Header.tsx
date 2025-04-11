"use client";

import { useState } from "react";
import Image from "next/image";
import SiapesqLogo from "../../assets/logos/siapesqlogo.svg";
import Link from "next/link";
import MenuIcon from "@/app/assets/icons/MenuIcon";
import HeaderList from "./HeaderList";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { persistor, RootState } from "@/app/redux/store";
import { useAppDispatch } from "@/app/redux/hooks/reduxHook";
import ButtonLoader from "../info/loaders/ButtonLoader";
import { logout } from "@/app/redux/slices/authSlice";
import { clearSelectedItem } from "@/app/redux/slices/fetchParamsSlicer";
import CloseIcon from "@/app/assets/icons/CloseIcon";

const Header = () => {
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { push } = useRouter();
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const dispatch = useAppDispatch();
  const navigator = useRouter();

  const handleLogout = async () => {
    try {
      setIsLoading(true);

      await fetch("/api/logout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      dispatch(logout());
      dispatch(clearSelectedItem());

      await persistor.purge();
      localStorage.removeItem("persist:root");

      setTimeout(() => {
        setIsLoading(false);
        navigator.push("/");
      }, 3000);
      setMenuIsOpen(false);
    } catch (error) {
      console.error("Erro ao fazer logout", error);
      setIsLoading(false);
    }
  };

  return (
    <header className="flex items-center justify-between bg-primary-100 py-2 px-5 md:px-10 bg-gradient-to-l from-primary-100 to-primary-500 drop-shadow-xl md:fixed top-0 left-0 right-0 z-50 h-20 max-h-20">
      <Link
        href="/"
        className="flex items-center justify-center hover:scale-none"
      >
        <Image
          width={100}
          height={100}
          src={SiapesqLogo}
          alt="Logo"
          className="cursor-pointer "
        />
      </Link>

      <nav className="hidden md:block">
        <HeaderList menuIsOpen={(menuIsOpen: boolean) => setMenuIsOpen(menuIsOpen)} />
      </nav>

      {isLoading ? (
        <ButtonLoader btnIsDark={true} className="m-0"/>
      ) : (
        <button
          className="m-0 hidden md:block"
          onClick={() => {
            isAuthenticated ? handleLogout() : push("/login");
          }}
        >
          {isAuthenticated ? "Logout" : "Login"}
        </button>
      )}

      <div
        className="md:hidden block cursor-pointer"
        onClick={() => setMenuIsOpen(!menuIsOpen)}
      >
        <MenuIcon fill="#fff" width="45" height="45" />
      </div>

      <div
        className={`absolute top-0 left-0 w-full bg-primary-100 z-40 py-5 flex flex-col items-center justify-center transition-all duration-500 ease-in-out ${
          menuIsOpen
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 -translate-y-full pointer-events-none"
        }`}
      >
        <HeaderList menuIsOpen={(menuIsOpen: boolean) => setMenuIsOpen(menuIsOpen)} />
        <div onClick={() => setMenuIsOpen(false)}>
          {menuIsOpen && (
            <CloseIcon
              className={`absolute top-4.5 right-5 ${
                menuIsOpen ? "opacity-100" : "opacity-0"
              } transition-opacity duration-200 ease-in-out`}
              fill="#fff"
              width="45"
              height="45"
            />
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
