import { NextRequest, NextResponse } from "next/server";
import { jwtVerify, SignJWT } from "jose";
import { COOKIES_TOKEN_EXPIRES_IN } from "@/app/config/tokens";

const encoder = new TextEncoder();
const JWT_SECRET = encoder.encode(process.env.JWT_SECRET!);
const REFRESH_SECRET = encoder.encode(process.env.REFRESH_SECRET!);

/**
 * POST /api/refreshToken
 *
 * Renova o token de acesso, caso o refresh token seja válido.
 *
 * @param {NextRequest} req
 * @returns {Promise<NextResponse>}
 */
export async function POST(req: NextRequest) {
  const refreshToken = req.cookies.get("refreshToken")?.value;

  if (!refreshToken) {
    return NextResponse.json(
      { error: "Refresh token não fornecido." },
      { status: 401 }
    );
  }

  try {
    const { payload } = await jwtVerify(refreshToken, REFRESH_SECRET);

    const newAccessToken = await new SignJWT({
      id: payload.id,
      email: payload.email,
      name: payload.name,
    })
      .setProtectedHeader({ alg: "HS256" })
      .setExpirationTime("15m")
      .setIssuedAt()
      .sign(JWT_SECRET);

    const response = NextResponse.json({
      message: "Token renovado com sucesso.",
      token: newAccessToken,
    });

    response.cookies.set("token", newAccessToken, {
      httpOnly: true,
      path: "/",
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: COOKIES_TOKEN_EXPIRES_IN,
    });

    return response;
  } catch (error) {
    console.error("Erro ao validar refresh token:", error);
    return NextResponse.json(
      { error: "refres token ->Refresh token inválido ou expirado." },
      { status: 403 }
    );
  }
}
