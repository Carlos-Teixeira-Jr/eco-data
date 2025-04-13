import { NextRequest, NextResponse } from "next/server";
import { jwtVerify, SignJWT } from "jose";
import { COOKIES_ACCESS_TOKEN_EXPIRES_IN } from "./app/config/tokens";

const encoder = new TextEncoder();
const JWT_SECRET = encoder.encode(process.env.JWT_SECRET!);

const PUBLIC_ROUTES = [
  "/",
  "/login",
  "/signup",
  "/aboutMe",
  "/aboutApp",
  "/forbiddenPage",
];


/**
 * Middleware para autenticar rotas.
 *
 * Verifica se a rota atual é pública ou se o token de acesso
 * está presente e é válido. Se a rota for pública ou o token for
 * válido, o middleware permite que a requisição continue. Se o
 * token for inválido ou expirado, o middleware tenta renová-lo
 * usando o token de refresh. Se o token de refresh for inválido
 * ou expirado, o middleware redireciona o usuário para a página de
 * login.
 * 
 * 
 * Esse middleware roda do lado do servidor a nível de edge, antes de
 * qualquer instância do navegador e do client. Isso significa que ele
 * pode restringir o acesso a rotas antes mesmo de qualquer código
 * ser executado no client.
 * 
 * Com esse middleware, temos o benefício de:
 * - Proteger rotas privadas de forma segura, sem precisar
 *   implementar lógica de autenticação em cada rota.
 * - Reduzir o tráfego de requisições para o servidor, pois
 *   requisições para rotas privadas sem token de acesso válido
 *   são bloqueadas antes de chegar ao servidor.
 * - Melhorar a experiência do usuário, pois o redirecionamento
 *   para a página de login é feito de forma mais rápida e eficiente.
 *
 * @param {NextRequest} req
 * @returns {Promise<NextResponse>}
 */
export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const isAuthPage = pathname === "/login" || pathname === "/signup";
  const isPublicRoute = PUBLIC_ROUTES.includes(pathname);
  const token = req.cookies.get("token")?.value;

  if (!token && !isPublicRoute) {
    return NextResponse.redirect(new URL("/forbiddenPage", req.url));
  }

  if (token) {
    try {
      await jwtVerify(token, JWT_SECRET);

      if (isAuthPage) {
        return NextResponse.redirect(new URL("/", req.url));
      }

      return NextResponse.next();
    } catch (error) {
      console.warn("middleware -> Token inválido ou expirado.");

      const refreshToken = req.cookies.get("refreshToken")?.value;

      if (!refreshToken) {
        return NextResponse.redirect(new URL("/login", req.url));
      }

      try {
        const { payload } = await jwtVerify(refreshToken, JWT_SECRET);

        const newAccessToken = await new SignJWT({
          id: payload.id,
          email: payload.email,
          name: payload.name,
        })
          .setProtectedHeader({ alg: "HS256" })
          .setExpirationTime("15m")
          .setIssuedAt()
          .sign(JWT_SECRET);

        const response = NextResponse.next();

        response.cookies.set("token", newAccessToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
          maxAge: COOKIES_ACCESS_TOKEN_EXPIRES_IN,
          path: "/",
        });

        return response;
      } catch (error) {
        console.error("Middleware -> Erro ao renovar token expirado usando o refresh token:", error);
        return NextResponse.redirect(new URL("/login", req.url));
      }
    }
  }
}

export const config = {
  matcher: ["/((?!api|_next|static|favicon.ico|.*\\..*).*)"],
};
