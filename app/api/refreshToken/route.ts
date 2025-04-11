import { NextRequest, NextResponse } from "next/server";
import { jwtVerify, SignJWT } from "jose";

const encoder = new TextEncoder();
const JWT_SECRET = encoder.encode(process.env.JWT_SECRET!);
const REFRESH_SECRET = encoder.encode(process.env.REFRESH_SECRET!);

const PUBLIC_ROUTES = [
  "/",
  "/login",
  "/signup",
  "/aboutMe",
  "/aboutApp",
  "/forbiddenPage",
];

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const isAuthPage = pathname === "/login" || pathname === "/signup";
  const isPublicRoute = PUBLIC_ROUTES.includes(pathname);
  const token = req.cookies.get("token")?.value;
  const refreshToken = req.cookies.get("refreshToken")?.value;

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
      console.warn("Token expirado. Tentando renovar com refreshToken...");
    }
  }

  if (refreshToken) {
    try {
      const { payload } = await jwtVerify(refreshToken, REFRESH_SECRET);

      const newAccessToken = await new SignJWT({
        id: payload.id,
        email: payload.email,
        name: payload.name,
      })
        .setProtectedHeader({ alg: "HS256" })
        .setExpirationTime("15s")
        .setIssuedAt()
        .sign(JWT_SECRET);

      const response = NextResponse.next();

      response.cookies.set("token", newAccessToken.toString(), {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
        maxAge: 60 * 60 * 24 * 30,
      });

      if (isAuthPage) {
        return NextResponse.redirect(new URL("/dashboard", req.url));
      }

      return response;
    } catch (refreshError) {
      console.error("Refresh token inválido:", refreshError);
      return isPublicRoute
        ? NextResponse.next()
        : NextResponse.redirect(new URL("/login", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next|static|favicon.ico|.*\\..*).*)"],
};
