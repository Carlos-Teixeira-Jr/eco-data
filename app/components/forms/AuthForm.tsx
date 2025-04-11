"use client";

import { validateEmail } from "@/app/utils/validators/emailValidator";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";
import PasswordVisibilityToggle from "../info/toggles/PasswordVisibilityToggle";
import Toast from "../info/toasts/Toast";
import { validateName } from "@/app/utils/validators/nameValidator";
import ButtonLoader from "../info/loaders/ButtonLoader";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/app/redux/store";
import { loginSuccess, signupSuccess } from "@/app/redux/slices/authSlice";

const AuthForm = () => {
  const pathname = usePathname();
  const navigator = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const [disclaimer, setDisclaimer] = useState("");
  const [passwordIsVisible, setPasswordIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const isSignup = pathname === "/signup";
  const isSignin = pathname === "/login";
  const [showToast, setShowToast] = useState({
    show: false,
    message: "",
    type: "",
  });

  const [signinFormData, setSigninFormData] = useState({
    email: "",
    password: "",
  });

  const [signupFormData, setSignupFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [signinErrors, setSigninErrors] = useState({ email: "", password: "" });
  const [signupErrors, setSignupErrors] = useState({
    name: "",
    email: "",
    password: "",
  });

  /**
   * Lida com o disclaimer baseado na rota.
   * Se a rota for /signup, define o conteúdo do disclaimer.
   * Se a rota for /login, define o disclaimer como uma string vazia.
   */
  useEffect(() => {
    if (isSignup) {
      setDisclaimer(
        "Ao criar a conta, você aceita os termos de uso e privacidade."
      );
    } else {
      setDisclaimer("");
    }
  }, [isSignup]);

  /**
   * Gera um array de inputs baseado na rota atual.
   * Se a rota for /signup, inclui um input para o nome do usuário.
   * Se a rota for /login, inclui apenas um input para o email do usuário e senha.
   * @constant
   * @type {Array<{key: string, label: string, type: string, value: string, error: string}>}
   */
  const inputs = useMemo(() => {
    const baseInputs = [
      {
        key: "email",
        label: "Email",
        type: "text",
        value: isSignup ? signupFormData.email : signinFormData.email,
        error: isSignup ? signupErrors.email : signinErrors.email,
        required: true,
      },
      {
        key: "password",
        label: "Senha",
        type: passwordIsVisible ? "text" : "password",
        value: isSignup ? signupFormData.password : signinFormData.password,
        error: isSignup ? signupErrors.password : signinErrors.password,
      },
    ];

    if (isSignup) {
      baseInputs.unshift({
        key: "name",
        label: "Nome",
        type: "text",
        value: signupFormData.name,
        error: signupErrors.name,
      });
    }

    return baseInputs;
  }, [
    isSignup,
    signupFormData,
    signinFormData,
    passwordIsVisible,
    signupErrors,
    signinErrors,
  ]);

  /**
   * Lida com a troca de um campo de entrada e atualiza o estado correspondente.
   * @param {React.ChangeEvent<HTMLInputElement>} e - O evento de alteração.
   * @param {string} key - A chave do campo de entrada.
   */
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    key: string
  ) => {
    const value = e.target.value;
    if (isSignup) {
      setSignupFormData((prev) => ({ ...prev, [key]: value }));
    } else {
      setSigninFormData((prev) => ({ ...prev, [key]: value }));
    }
  };

  /**
   * Lida com a submissão do formulário de login.
   * Verifica se os campos de entrada são válidos e tenta fazer o login com as credenciais informadas.
   * Se o login for realizado com sucesso, redireciona o usuário para a home da aplicação.
   * Caso contrário, exibe um erro de rede ou de credenciais.
   * @param {React.FormEvent} e - O evento de submissão do formulário.
   */
  const handleLogin = async (e: React.FormEvent) => {
    setIsLoading(true);
    e.preventDefault();

    setSigninErrors({
      email: "",
      password: "",
    });

    let signinFormDataErrors = {
      email: "",
      password: "",
    };

    if (validateEmail(signinFormData.email).isValid === false) {
      signinFormDataErrors.email = validateEmail(signinFormData.email).errorMsg;
    }

    if (signinFormData.password === "") {
      signinFormDataErrors.password = "Senha obrigatorio";
    }

    setSigninErrors(signinFormDataErrors);

    const hasErrors = Object.values(signinFormDataErrors).some(
      (error) => error !== ""
    );

    if (!hasErrors) {
      try {
        const response = await fetch("/api/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(signinFormData),
          credentials: "include",
        });

        if (!response.ok) {
          const errorData = await response.json();
          setShowToast({
            show: true,
            message: errorData.error,
            type: "error",
          });
          setIsLoading(false);
        } else {
          const successData = await response.json();

          dispatch(
            loginSuccess({
              user: successData.user,
              message: successData.message,
              isAuthenticated: true,
            })
          );

          setShowToast({
            show: true,
            message: successData.message,
            type: "success",
          });

          setTimeout(() => {
            navigator.push("/");
          }, 5000);
        }
      } catch (error) {
        console.error(error);
        setShowToast({
          show: true,
          message: "Erro de rede. Tente novamente.",
          type: "error",
        });
        setIsLoading(false);
      }
    }
  };

  /**
   * Função que lida com a submissão do formulário de cadastro de usuário.
   * Valida os campos de entrada e envia uma solicitação de cadastro
   * para a API. Se a resposta for bem sucedida, redireciona o usuário
   * para a home da aplicação.
   *
   * @param {React.FormEvent} e - O evento de submissão do formulário.
   */
  const handleSignup = async (e: React.FormEvent) => {
    setIsLoading(true);
    e.preventDefault();

    setSignupErrors({
      email: "",
      password: "",
      name: "",
    });

    let signupFormDataErrors = {
      email: "",
      password: "",
      name: "",
    };

    if (validateName(signupFormData.name).isValid === false) {
      signupFormDataErrors.name = validateName(signupFormData.name).errorMsg;
    }

    if (validateEmail(signupFormData.email).isValid === false) {
      signupFormDataErrors.email = validateEmail(signupFormData.email).errorMsg;
    }

    if (signupFormData.password === "") {
      signupFormDataErrors.password = "Senha obrigatorio";
    }

    setSignupErrors(signupFormDataErrors);

    const hasErrors = Object.values(signupFormDataErrors).some(
      (error) => error !== ""
    );

    if (!hasErrors) {
      try {
        const response = await fetch("/api/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(signupFormData),
          credentials: "include",
        });

        if (!response.ok) {
          const errorData = await response.json();
          setShowToast({
            show: true,
            message: errorData.error,
            type: "error",
          });
          setIsLoading(false);
        } else {
          const successData = await response.json();

          dispatch(
            signupSuccess({
              user: successData.user,
              message: successData.message,
              isAuthenticated: true,
            })
          );

          setShowToast({
            show: true,
            message: successData.message,
            type: "success",
          });

          setTimeout(() => {
            navigator.push("/");
          }, 5000);
        }
      } catch (error) {
        console.log(error);
        setShowToast({
          show: true,
          message: "Erro de rede. Tente novamente.",
          type: "error",
        });
        setIsLoading(false);
      }
    }
  };

  return (
    <form
      onSubmit={(e) => {
        if (isSignin) {
          handleLogin(e);
        } else {
          handleSignup(e);
        }
      }}
    >
      {inputs.map((input, idx) => (
        <div key={idx}>
          <div key={input.key} className={`flex flex-col w-full`}>
            <label>{input.label}</label>
            <div className="w-full relative">
              <input
                type={passwordIsVisible ? "text" : input.type}
                value={input.value}
                disabled={isLoading}
                onChange={(e) => handleInputChange(e, input.key)}
              />
              {input.key === "password" && (
                <span
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer"
                  onClick={() => setPasswordIsVisible(!passwordIsVisible)}
                >
                  <PasswordVisibilityToggle isVisible={passwordIsVisible} />
                </span>
              )}
            </div>
            {input.error && <p className="text-danger-900">{input.error}</p>}
          </div>
        </div>
      ))}
      {showToast.show && (
        <Toast toastProps={showToast} handleRemoveToast={setShowToast} />
      )}
      <div className="flex flex-col items-center">
        {disclaimer && <p className="p-dark text-xs">{disclaimer}</p>}

        {isLoading ? (
          <ButtonLoader btnIsDark={false} />
        ) : (
          <button className="btn-dark" disabled={isLoading}>
            {pathname === "/signup" ? "Criar conta" : "Entrar"}
          </button>
        )}

        <div className="flex gap-3 items-center">
          <p className="p-dark">
            {pathname === "/signup"
              ? "Ja possui uma conta?"
              : "Nao possui uma conta?"}
          </p>{" "}
          <Link href={pathname === "/signup" ? "/login" : "/signup"}>
            {pathname === "/signup" ? "Entrar" : "Criar conta"}
          </Link>
        </div>
      </div>
    </form>
  );
};

export default AuthForm;
