import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import users from "@/app/data/Users.json";

export async function GET() {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get("token");

    if (!token) {
      return NextResponse.json(
        { isLoggedIn: false, user: null },
        { status: 401 }
      );
    }

    // Parse email dari token, contoh: token-anjayani@gmail.com-123456
    const tokenParts = token.value.split("-");
    const email = tokenParts[1]; // ambil email-nya

    const user = users.find((u) => u.email === email);

    if (!user) {
      return NextResponse.json(
        { isLoggedIn: false, user: null },
        { status: 401 }
      );
    }

    return NextResponse.json({
      isLoggedIn: true,
      user: {
        email: user.email,
        username: user.username, // ← ini yang kamu pakai di UI
      },
    });
  } catch (error) {
    console.error("ME ENDPOINT ERROR:", error);
    return NextResponse.json(
      { isLoggedIn: false, user: null },
      { status: 500 }
    );
  }
}
