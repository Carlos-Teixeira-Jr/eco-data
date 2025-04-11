import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

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
 * Middleware que verifica se o token JWT está presente e é válido.
 * Caso contrário, redireciona para a página de login ou de acesso negado.
 * Se o token for válido, permite que a requisição continue.
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
      console.warn("Token inválido ou expirado.");
      
      // Token inválido + rota pública → continua
      if (isPublicRoute) {
        return NextResponse.next();
      }

      // Token inválido + rota privada → bloqueia
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next|static|favicon.ico|.*\\..*).*)"],
};
