import { SigninFormData } from "@/app/interfaces/auth/auth";
import { supabase } from "@/app/lib/db/supabase";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { COOKIES_TOKEN_EXPIRES_IN, JWT_EXPIRES_IN, REFRESH_EXPIRES_IN } from "@/app/config/tokens";

const JWT_SECRET = process.env.JWT_SECRET!;
const REFRESH_SECRET = process.env.REFRESH_SECRET!;

/**
 * POST /api/login
 *
 * Realiza o login de um usuário com email e senha.
 * Verifica se o email e a senha informados são válidos.
 * Se sim, retorna um token de acesso e um token de refresh.
 *
 * @param {NextRequest} req
 * @returns {Promise<NextResponse>}
 */
export async function POST(req: NextRequest) {
  try {
    const body: SigninFormData = await req.json();
    const { password, email } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: "Todos os campos são obrigatórios." },
        { status: 400 }
      );
    }

    const { data: user, error } = await supabase
      .from("users")
      .select("id, email, password")
      .eq("email", email)
      .single();

    if (error || !user) {
      return NextResponse.json(
        { error: "Email ou senha incorretos." },
        { status: 401 }
      );
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return NextResponse.json(
        { error: "Email ou senha incorretos." },
        { status: 401 }
      );
    }

    const token = jwt.sign({ id: user.id }, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
    });

    const refreshToken = jwt.sign({ id: user.id }, REFRESH_SECRET, {
      expiresIn: REFRESH_EXPIRES_IN,
    });

    await supabase.from("tokens").insert([
      {
        user_id: user.id,
        refresh_token: refreshToken,
        user_agent: req.headers.get("user-agent") || "unknown",
        ip_address:
          req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
          "unknown",
        expires_at: new Date(Date.now() + COOKIES_TOKEN_EXPIRES_IN), // 30 dias
      },
    ]);

    const response = NextResponse.json({
      message: "Login realizado com sucesso.",
      token,
      user: { id: user.id, email: user.email },
    });

    response.cookies.set("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: COOKIES_TOKEN_EXPIRES_IN,
    });

    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: COOKIES_TOKEN_EXPIRES_IN,
    });

    return response;
  } catch (error) {
    console.error("Erro ao buscar o usuário:", error);
    return NextResponse.json(
      { error: "Erro ao buscar o usuário." },
      { status: 500 }
    );
  }
}
