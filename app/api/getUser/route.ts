import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import jwt from 'jsonwebtoken'


const JWT_SECRET = process.env.JWT_SECRET!

export async function GET() {
  const cookieStore = await cookies();

  const token = cookieStore.get('token')?.value

  if (!token) {
    return NextResponse.json({ user: null }, { status: 401 })
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { id: string, email: string, name: string };

    return NextResponse.json({ user: decoded.name }, { status: 200 })
  } catch (error) {
    console.error('Token inválido:', error);
    return NextResponse.json({ user: null }, { status: 401 })
  }
}