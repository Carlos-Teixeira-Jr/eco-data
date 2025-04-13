import { useState } from "react";
import ButtonLoader from "../info/loaders/ButtonLoader";
import { useAppDispatch } from "@/app/redux/hooks/reduxHook";
import { logout } from "@/app/redux/slices/authSlice";
import { clearSelectedItem } from "@/app/redux/slices/fetchParamsSlicer";
import { persistor, RootState } from "@/app/redux/store";
import { useSelector } from "react-redux";
import { usePathname, useRouter } from "next/navigation";

interface IHeaderList {
  menuIsOpen: (menuIsopen: boolean) => void;
}

const HeaderList = ({ menuIsOpen }: IHeaderList) => {
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(false);
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const dispatch = useAppDispatch();
  const navigator = useRouter();

  const options = [
    { value: "home", label: "Home", link: "/" },
    { value: "search", label: "Buscar", link: "/search" },
    { value: "aboutApp", label: "Sobre o Eco Data", link: "/aboutApp" },
    { value: "aboutMe", label: "Desenvolvedor", link: "/aboutMe" },
  ];

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
    } catch (error) {
      console.error("Erro ao fazer logout", error);
      setIsLoading(false);
    }
  };

  const handleRedirectToLogin = () => {
    navigator.push("/login");
    menuIsOpen(false);
  };

  return (
    <ul className={`ul-responsive`}>
      {options.map((option) => (
        <li key={option.value} className="li-nav">
          <a className="a-light" href={`${option.link}`}>
            {option.label}
          </a>
        </li>
      ))}

      {isLoading ? (
        <ButtonLoader btnIsDark={true} className="m-0 w-full " />
      ) : (
        <button
          className={`m-0 block w-full md:hidden ${
            pathname === "/login"
              ? "hidden"
              : "transition duration-500 ease-in-out"
          }`}
          onClick={() => {
            if (isAuthenticated) {
              handleLogout();
            } else {
              handleRedirectToLogin();
            }
          }}
        >
          {isAuthenticated ? "Logout" : "Login"}
        </button>
      )}
    </ul>
  );
};

export default HeaderList;
