import { SignupFormData } from "@/app/interfaces/auth/auth";
import { supabase } from "@/app/lib/db/supabase";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { COOKIES_REFRESH_TOKEN_EXPIRES_IN, JWT_EXPIRES_IN } from "@/app/config/tokens";

const JWT_SECRET = process.env.JWT_SECRET!;
const REFRESH_SECRET = process.env.REFRESH_SECRET!;

/**
 * POST /api/signup
 *
 * Cadastra um novo usuário com email e senha.
 * Verifica se o email já  existe no banco de dados.
 * Se sim, retorna um erro 409.
 * Caso contrário, cadastra o usuário e retorna
 * um token de acesso e um token de refresh.
 *
 * @param {NextRequest} req
 * @returns {Promise<NextResponse>}
 */
export async function POST(req: NextRequest) {
  try {
    const body: SignupFormData = await req.json();
    const { name, email, password } = body;

    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "Todos os campos são obrigatórios." },
        { status: 400 }
      );
    }

    const { data: existingUser } = await supabase
      .from("users")
      .select("id")
      .eq("email", email)
      .single();

    if (existingUser) {
      return NextResponse.json(
        { error: "Email já cadastrado." },
        { status: 409 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const { data: newUser, error } = await supabase
      .from("users")
      .insert([{ name, email, password: hashedPassword }])
      .select()
      .single();

    if (error) {
      return NextResponse.json(
        { error: "Erro ao cadastrar o usuário.", details: error.message },
        { status: 500 }
      );
    }

    const accessToken = jwt.sign({ id: newUser.id, name: newUser.name }, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
    });

    const refreshToken = jwt.sign({ id: newUser.id }, REFRESH_SECRET, {
      expiresIn: COOKIES_REFRESH_TOKEN_EXPIRES_IN,
    });

    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
    const userAgent = req.headers.get("user-agent") || "unknown";

    const expiresAt = new Date(Date.now() + COOKIES_REFRESH_TOKEN_EXPIRES_IN * 1000);

    await supabase.from("tokens").insert([
      {
        user_id: newUser.id,
        refresh_token: refreshToken,
        user_agent: userAgent,
        ip_address: ip,
        expires_at: expiresAt,
      },
    ]);

    const response = NextResponse.json({
      message: "Usuário cadastrado com sucesso.",
      user: { id: newUser.id, name: newUser.name, email: newUser.email },
      token: accessToken,
      refreshToken,
    });

    response.cookies.set("token", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: COOKIES_REFRESH_TOKEN_EXPIRES_IN,
    });

    response.cookies.set("refreshToken", refreshToken, {
      httpOnly: true,
      sameSite: "strict",
      path: "/",
      maxAge: COOKIES_REFRESH_TOKEN_EXPIRES_IN,
    });

    return response;
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Erro interno no servidor." },
      { status: 500 }
    );
  }
}
