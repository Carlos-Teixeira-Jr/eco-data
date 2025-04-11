import { supabase } from "@/app/lib/db/supabase";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const refreshToken = req.cookies.get("refreshToken")?.value;

    if (!refreshToken) {
      return NextResponse.json(
        { error: "Refresh token ausente." },
        { status: 400 }
      );
    }

    await supabase.from("tokens").delete().eq("refresh_token", refreshToken);

    const response = NextResponse.json(
      { message: "Logout realizado com sucesso." },
      { status: 200 }
    );

    response.cookies.set("token", "", { maxAge: 0, path: "/" });
    response.cookies.set("refreshToken", "", { maxAge: 0, path: "/" });

    return response;
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao realizar logout." },
      { status: 500 }
    );
  }
}
