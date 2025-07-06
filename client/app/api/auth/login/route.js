import { NextResponse } from "next/server";
import users from "@/app/data/Users.json";

export async function POST(req) {
  try {
    const body = await req.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: "Email dan password wajib diisi." },
        { status: 400 }
      );
    }

    const user = users.find(
      (user) => user.email === email && user.password === password
    );

    if (!user) {
      return NextResponse.json(
        { success: false, message: "Email atau password salah." },
        { status: 401 }
      );
    }

   const token = `token-${user.email}-${Date.now()}`; // ← penting: email-nya dimasukkan ke token


    const response = NextResponse.json({
      success: true,
      message: "Login berhasil.",
      token,
      user: { email },
    });

    response.cookies.set("token", token, {
      httpOnly: true,
      secure: false, // true kalau sudah pakai HTTPS
      sameSite: "lax",
      path: "/",
    });


    return response;
  } catch (err) {
    console.error("LOGIN ERROR:", err);
    return NextResponse.json(
      { success: false, message: "Terjadi kesalahan server." },
      { status: 500 }
    );
  }
}
