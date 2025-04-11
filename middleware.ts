import { NextRequest, NextResponse } from "next/server";
import { jwtVerify, SignJWT } from "jose";

const encoder = new TextEncoder();
const JWT_SECRET = encoder.encode(process.env.JWT_SECRET!);
const REFRESH_SECRET = encoder.encode(process.env.REFRESH_SECRET!);

const PUBLIC_ROUTES = ["/", "/login", "/signup", "/aboutMe", "/aboutApp", "/forbiddenPage"];

export async function middleware(req: NextRequest) {
  
  const { pathname } = req.nextUrl;
  const isAuthPage = pathname === "/login" || pathname === "/signup";
  const isPublicRoute = PUBLIC_ROUTES.includes(pathname);
  const token = req.cookies.get("token")?.value;
  const refreshToken = req.cookies.get("refreshToken")?.value;

  // Usuário tenta acessar uma rota privada sem estar logado >>> redireciona para a tela de login
  if (!token && !isPublicRoute) {
    return NextResponse.redirect(new URL("/forbiddenPage", req.url));
  }

  // Usuário está logado e possui token salvo nos cookies >>> verifica se o token ainda é valido
  if (token) {
    try {
      await jwtVerify(token, JWT_SECRET);

      // Usuário está logado com token válido e tenta acessar págians de autenticação >>> redireciona para a home
      if (isAuthPage) {
        return NextResponse.redirect(new URL("/", req.url));
      }

      // Usuário está logado com token válido e tenta acessar qualquer rota da aplicação >>> acesso permitido
      return NextResponse.next();
    } catch (error) {
      // Usuário possui token, porém está expirado ou inválido
      console.error("Token inválido ou expirado:", error);

      // Usuário tenta acessar uma rota publica sem token válido >>> acesso permitido
      if (isPublicRoute) {
        return NextResponse.next();
      }

      // TODO: tem que verificar se tem refresh para gerar novo token
      if (refreshToken) {
        try {
          const decoded = await jwtVerify(refreshToken, REFRESH_SECRET);

          // Usuário tem refresh válido >>> Geramos e setamos umnovo token nos cookies
          const newAccessToken = await new SignJWT({ id: decoded.payload.id, email: decoded.payload.email, name: decoded.payload.name });

          const res = NextResponse.next();

          res.cookies.set("token", newAccessToken.toString(), { 
            httpOnly: true, 
            path: "/",
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 60 * 60 * 24 * 30 // 30 days
          });

          return NextResponse.next();
        } catch (error) {
          console.error("Refresh token inválido ou expirado:", error);

          // Usuário tem refresh inválido ou exirado >>> redireciona para a tela de login
          return NextResponse.redirect(new URL("/login", req.url));
        }
      }
    }
  } else {
    // Usuário não tem token >>> Verificamos se tem refresh
    console.log("SEM TOKEN NENHUM")

    if (refreshToken) {
      try {
        const decoded = await jwtVerify(refreshToken, REFRESH_SECRET);

        console.log("USER TEM REFRESH VÁLIDO")

        // Usuário tem refresh válido >>> Geramos e setamos um novo token nos cookies
        const newAccessToken = await new SignJWT({
          id: decoded.payload.id,
          email: decoded.payload.email,
          name: decoded.payload.name,
        })
          .setProtectedHeader({ alg: "HS256" })
          .setExpirationTime("15s")
          .setIssuedAt()
          .sign(JWT_SECRET);

        const res = NextResponse.next();

        res.cookies.set("token", newAccessToken, { 
          httpOnly: true, 
          path: "/",
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
          maxAge: 60 * 60 * 24 * 30
        });

        return res;
      } catch (error) {
        console.error("Refresh token inválido ou expirado:", error);

        console.log("USER COM REFRESH PORÉM INVÁLIDO")

        // Usuário tem refresh inválido ou exirado >>> redireciona para a tela de login
        return NextResponse.redirect(new URL("/login", req.url));
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next|static|favicon.ico|.*\\..*).*)"],
};
